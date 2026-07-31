import React from "react";
import { FaHome, FaChartPie, FaPlus } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { GoFileSubmodule } from "react-icons/go";
import Searchbar from "../components/ui/Searchbar";
import Card from "../components/ui/Card";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Pie, PieChart, Tooltip } from "recharts";

const data = [
  { date: "Jan", submissions: 4 },
  { date: "Feb", submissions: 2 },
  { date: "Mar", submissions: 6 },
  { date: "Apr", submissions: 5 },
];

const renderCustomBarLabel = ({ x, y, width, value }) => {
  return (
    <text x={x + width / 2} y={y} fill="#6b7280" textAnchor="middle" dy={-6}>
      {value}
    </text>
  );
};

const Dashboard = () => {
  return (
    <div className="flex justify-between w-full h-[100vh]  border p-2  ">
      <nav className="flex flex-col  border w-[20%] border-[#ddd6fe] rounded-sm">
        <div className="border-b border-b-[#ddd6fe] p-2 hover:opacity-80 rounded-sm text-right">
          ❌
        </div>
        <div className="border-b border-b-[#ddd6fe] p-2 hover:opacity-80 rounded-sm flex items-center gap-1 text-l">
          <FaHome />
          Home
        </div>
        <div className="border-b border-b-[#ddd6fe] p-2 hover:opacity-80 rounded-sm flex items-center gap-1 text-l">
          <GoFileSubmodule />
          Submissions
        </div>
        <div className="border-b border-b-[#ddd6fe] p-2 hover:opacity-80 rounded-sm flex items-center gap-1 text-l">
          <FaChartPie />
          Analytics
        </div>
        <div className="border-b border-b-[#ddd6fe] p-2 hover:opacity-80 rounded-sm flex items-center gap-1 text-l">
          <IoSettings />
          Settings
        </div>
      </nav>
      <section className="border border-[#ddd6fe] w-[79%] rounded-sm overflow-scroll">
        <header className="flex justify-between p-2">
          <div className=" w-[30%]">
            <img src="./logo.svg" className="" alt="" />
          </div>
          <div className="w-[50%]">
            <Searchbar />
          </div>
          <button className="bg-[#8B5CF6] text-[#EEF4FF] rounded-sm px-1 flex gap-1 items-center">
            <FaPlus /> New Submission
          </button>
        </header>
        <section className="p-2 mt-4 ]">
          <h1 className="text-5xl text-[#8B5CF6] font-bold">
            Submission Panel
          </h1>
          <div className="flex gap-2 justify-between p-1 mt-4">
            <Card title={"Total submissions"} data={"4"} />
            <Card title={"Today’s New Entries"} data={"1"} />
            <Card title={"Active Companies"} data={"3"} />
            <Card title={"Average Experience"} data={"1.5"} />
          </div>
        </section>
        <section>
          <h1 className="text-5xl text-[#8B5CF6] font-bold p-2 mt-4 ">
            Analytics
          </h1>
          <div className="flex justify-between px-2 mt-4">
            <span>
              <BarChart
                width={300}
                height={300}
                data={data}
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
        <section>Submission</section>
      </section>
    </div>
  );
};

export default Dashboard;
