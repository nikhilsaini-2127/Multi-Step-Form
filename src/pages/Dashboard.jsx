import { useState, useEffect } from "react";
import { FaHome, FaChartPie, FaPlus } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { GoFileSubmodule } from "react-icons/go";
import Searchbar from "../components/ui/Searchbar";
import Card from "../components/ui/Card";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Pie, PieChart, Tooltip } from "recharts";
import { Link, useNavigate } from "react-router-dom";

const renderCustomBarLabel = ({ x, y, width, value }) => {
  return (
    <text x={x + width / 2} y={y} fill="#6b7280" textAnchor="middle" dy={-6}>
      {value}
    </text>
  );
};

const Dashboard = () => {
  const [data, setData] = useState({
    totalSubmissions: 0,
    avgExperience: 0,
    submissionsByDate: {},
    recentSubmissions: {},
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/dashboard/submissions-by-date",
        );
        // const res=await Promise.all(
        //   fetch("http://localhost:5000/api/dashboard/total-submissions"),
        //   fetch("http://localhost:5000/api/dashboard/avg-experience"),
        //   fetch("http://localhost:5000/api/dashboard/submissions-by-date")
        // )

        const result = await response.json();

        if (!result.success) {
          console.error("Error fetching data:", result.message);
          return;
        }

        const rawData = result.submissionsByDate;
        const formattedData = Array.isArray(rawData)
          ? rawData
          : Object.entries(rawData || {}).map(([date, submissions]) => ({
              date,
              submissions,
            }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchAll = async () => {
      try {
        const [
          totalSubmissionsResponse,
          avgExperienceResponse,
          submissionsByDateResponse,
          recentSubmissionsResponse,
        ] = await Promise.all([
          fetch("http://localhost:5000/api/dashboard/total-submissions"),
          fetch("http://localhost:5000/api/dashboard/avg-experience"),
          fetch("http://localhost:5000/api/dashboard/submissions-by-date"),
          fetch("http://localhost:5000/api/dashboard/recent-submissions"),
        ]);
        const totalSubmissionsData = await totalSubmissionsResponse.json();
        const avgExperienceData = await avgExperienceResponse.json();
        const submissionsByDateData = await submissionsByDateResponse.json();
        const recentSubmissionsData = await recentSubmissionsResponse.json();

        setData({
          totalSubmissions: totalSubmissionsData.totalSubmissions,
          avgExperience: avgExperienceData.avgExperience,
          submissionsByDate: submissionsByDateData.submissionsByDate,
          recentSubmissions: recentSubmissionsData.recentSubmissions,
        });
        console.log(data.recentSubmissions);
      } catch (error) {
        console.error("Error fetching all data:", error);
      }
    };

    fetchAll();
  }, []);

  const formattedData = Object.entries(data.submissionsByDate || {}).map(
    ([date, submissions]) => ({ date, submissions }),
  );
  return (
    <div className="flex justify-between w-full h-[100vh]   p-2  ">
      <section className="border border-[#ddd6fe] w-full rounded-sm ">
        <section className="p-2 mt-4 ">
          <h1 className="text-5xl text-[#8B5CF6] font-bold">
            Submission Panel
          </h1>
          <div className="flex gap-2 justify-between p-1 mt-4">
            <Card title={"Total submissions"} data={data.totalSubmissions} />
            <Card title={"Today’s New Entries"} data={data.totalSubmissions} />
            <Card title={"Active Companies"} data={data.totalSubmissions} />
            <Card title={"Average Experience"} data={data.avgExperience} />
          </div>
        </section>
        <section id="analytics">
          <h1 className="text-5xl text-[#8B5CF6] font-bold p-2 mt-4 ">
            Analytics
          </h1>
          <div className="flex justify-between px-2 mt-4">
            <span>
              <BarChart
                width={300}
                height={300}
                data={formattedData}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
              >
                <XAxis
                  dataKey="date"
                  label={{
                    position: "insideBottomRight",
                    value: "Date",
                    offset: -10,
                  }}
                />
                <YAxis
                  label={{
                    position: "insideTopLeft",
                    value: "Submissions",
                    angle: -90,
                    dy: 60,
                  }}
                />
                <Bar
                  dataKey="submissions"
                  fill="#8884d8"
                  label={renderCustomBarLabel}
                />
                <Tooltip defaultIndex={2} />
              </BarChart>
              <h1 className="mt-2 text text-center text-[#8B5CF6] font-bold">
                Industry distribution
              </h1>
            </span>
            <span>
              <PieChart width={300} height={300}>
                <Pie
                  activeShape={{
                    fill: "#8B5CF6",
                  }}
                  data={[
                    { Company: "Truminds", responses: 590 },
                    { Company: "Microsoft", responses: 590 },
                    { Company: "Amazon", responses: 868 },
                  ]}
                  dataKey="responses"
                  //isAnimationActive={isAnimationActive}
                />
                <Tooltip defaultIndex={2} />
              </PieChart>
              <h1 className="mt-2 text text-center text-[#8B5CF6] font-bold">
                Submissions over time
              </h1>
            </span>
          </div>
        </section>
        <section className="p-2 mt-4">
          <h2 className="text-2xl text-[#8B5CF6] font-semibold mb-3">
            Recent Submissions
          </h2>
          {Object.entries(data?.recentSubmissions["0"] || {}).map(([key, value], index) => {
            if (typeof value === "object" && value !== null) {
              return (
                <div
                  key={index}
                  className="mb-3 rounded-2xl border border-[#ddd6fe] bg-white p-4 shadow-sm"
                >
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#8B5CF6]">
                    {key}
                  </h3>
                  <div className="grid gap-2 md:grid-cols-2">
                    {Object.entries(value).map(([subKey, subValue], subIndex) => {
                      if(subKey === "submission_id") return null;
                      return(
                        <div
                        key={subIndex}
                        className="rounded-xl border border-[#f3e8ff] bg-[#faf5ff] p-3"
                        >
                        <p className="text-xs font-medium uppercase tracking-wide text-[#7c3aed]">
                          {subKey}
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                          {String(subValue)}
                        </p>
                      </div>
                      )
            })}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
