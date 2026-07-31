import React, { useEffect, useState } from "react";
import { FaEye,FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/formData", {
          method: "get",
        });
        const res = await response.json();
        console.log(res);
        setData(res.data);
        toast.success("Data Fetched successfully!");
        setLoading(false);
      } catch (e) {
        console.log(`Error while fetching data ${e}`);
        toast.error(`Error while fetching data ${e}`);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return(
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="p-4 mx-auto ">
      <ToastContainer position="top-right" autoClose={3000} />
    <div className="overflow-x-auto rounded-xl border border-violet-200 shadow-sm">
  <table className="min-w-full divide-y divide-violet-200">
    <thead className="bg-violet-100">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-violet-700">
          Name
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-violet-700">
          Company
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-violet-700">
          Position
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-violet-700">
          Email
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-violet-700">
          Action
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-violet-100 bg-white">
      {data.map((item, index) => (
        <tr
          key={index}
          className="hover:bg-violet-50 transition-colors even:bg-violet-50/30"
        >
          <td className="px-6 py-4 font-medium text-gray-900">
            {item.personal.first_name} {item.personal.last_name}
          </td>

          <td className="px-6 py-4 text-gray-600">
            {item.professional.company}
          </td>

          <td className="px-6 py-4 text-gray-600">
            {item.professional.position}
          </td>

          <td className="px-6 py-4 text-violet-600">
            {item.personal.email}
          </td>

          <td className="px-6 py-4 flex gap-1">
            <button onClick={()=>navigate(`/${item.submission_id}`)} className="rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700 transition flex gap-0.5 items-center ">
              <FaEye/>View
            </button>
            <button onClick={()=>navigate(`/edit/${item.submission_id}`)} className="rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700 transition flex gap-0.5 items-center">
              <FaPencilAlt />Edit
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<button className="text-white bg-[#8B5CF6] px-2 p-1 rounded-sm mt-4" onClick={()=>navigate("/form")}>
  Go to form
</button>
    </div>
  );
};

export default Home;
