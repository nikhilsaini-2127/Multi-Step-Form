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
    submissionsByDate: [],
    recentSubmissions: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
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
          totalSubmissions: totalSubmissionsData.totalSubmissions ?? 0,
          avgExperience: avgExperienceData.averageExperience ?? 0,
          submissionsByDate:submissionsByDateData.submissionsByDate,
          recentSubmissions: recentSubmissionsData.recentSubmissions,
        });
      } catch (error) {
        console.error("Error fetching all data:", error);
      }
    };

    fetchAll();
  }, []);

  const recentSubmissionList = Array.isArray(data.recentSubmissions)
    ? data.recentSubmissions
    : Object.values(data.recentSubmissions || {});

  return (
    <div className="flex justify-between w-full h-[100vh] p-2">
      <section className="border border-[#ddd6fe] w-full rounded-sm">
        <section className="p-2 mt-4">
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
          <h1 className="text-5xl text-[#8B5CF6] font-bold p-2 mt-4">
            Analytics
          </h1>
          <div className="flex justify-between px-2 mt-4">
            <span>
              <BarChart
                width={300}
                height={300}
                data={data.submissionsByDate}
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
          {recentSubmissionList.length === 0 ? (
            <p className="text-gray-500">No recent submissions available.</p>
          ) : (
            recentSubmissionList.map((submission, index) => (
              <div
                key={submission?.id ?? index}
                className="mb-3 rounded-2xl border border-[#ddd6fe] bg-white p-4 shadow-sm"
              >
                <div className="mb-3 grid gap-2 md:grid-cols-2">
                  {Object.entries(submission || {}).map(([key, value]) => {
                    if (key === "submission_id" || key === "created_at" || key === "updated_at") {
                      return null;
                    }

                    if (value && typeof value === "object") {
                      return (
                        <div
                          key={key}
                          className="rounded-xl border border-[#f3e8ff] bg-[#faf5ff] p-3"
                        >
                          <p className="text-xs font-medium uppercase tracking-wide text-[#7c3aed]">
                            {key}
                          </p>
                          <div className="mt-2 space-y-2">
                            {Object.entries(value).map(([nestedKey, nestedValue]) => {
                              if (nestedKey === "submission_id") return null;

                              return (
                                <div key={nestedKey} className="text-sm text-gray-700">
                                  <span className="font-medium text-gray-900">{nestedKey}:</span>{" "}
                                  {nestedValue == null ? "-" : String(nestedValue)}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={key}
                        className="rounded-xl border border-[#f3e8ff] bg-[#faf5ff] p-3"
                      >
                        <p className="text-xs font-medium uppercase tracking-wide text-[#7c3aed]">
                          {key}
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                          {value == null ? "-" : String(value)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
