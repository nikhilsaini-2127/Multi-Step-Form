import React, { useEffect, useState, useCallback } from "react";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterForm from "../components/FilterForm";
import Header from "../components/ui/Header";
import { FaFilter } from "react-icons/fa";
import debounce from "../utils/debounce";
import SearchBar from "../components/ui/Searchbar";
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const pageRef = React.useRef(0);
  const navigate = useNavigate();

  const fetchData = async (page = pageRef.current) => {
    try {
      setLoading(true);
      const offset = page * 10;
      const response = await fetch(
        `http://localhost:5000/api/formData?limit=10&offset=${offset}`,
        {
          method: "get",
        },
      );
      const res = await response.json();
      console.log(res);
      setData((prevData) =>
        page === 0 ? res.data : [...prevData, ...res.data],
      );
      // toast.success("Data Fetched successfully!");
      setLoading(false);
    } catch (e) {
      console.log(`Error while fetching data ${e}`);
      toast.error(`Error while fetching data ${e}`);
      setLoading(false);
    }
  };

  const handleFilterSubmit = useCallback(async (filter) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filter).toString();
      console.log(queryParams);
      const response = await fetch(
        `http://localhost:5000/api/formData/filter?${queryParams}`,
        {
          method: "get",
        },
      );
      const res = await response.json();
      console.log(res);
      setData(res.data);
      // toast.success("Data Fetched successfully!");
      setLoading(false);
      setShowDrawer(false);
    } catch (e) {
      console.log(`Error while fetching data ${e}`);
      toast.error(`Error while fetching data ${e}`);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = async () => {
      // console.log("Scroll event detected");
      // console.log(`Scroll position: ${document.documentElement.scrollTop}, Window height: ${window.innerHeight}, Document height: ${document.documentElement.scrollHeight}`);
      if (
        document.documentElement.scrollTop + window.innerHeight + 10 >=
        document.documentElement.scrollHeight
      ) {
        try {
          const nextPage = pageRef.current;
          console.log("Scrolled to bottom, fetching next page:", nextPage);
          pageRef.current += 1;
          await fetchData();
        } catch (e) {
          console.log(`Error while fetching data ${e}`);
          toast.error(`Error while fetching data ${e}`);
          setLoading(false);
        }
      }
    };

    const debouncedScrollHandler = debounce(handleScroll, 300);
    window.addEventListener("scroll", debouncedScrollHandler);

    return () => {
      window.removeEventListener("scroll", debouncedScrollHandler);
    };
  }, []);

  useEffect(() => {
    console.log("Fetching initial data");
    fetchData();
  }, []);

  return (
    <div className="p-4 mx-auto ">
      <ToastContainer position="top-right" autoClose={3000} />
      <header
        onClick={() => setShowDrawer(!showDrawer)}
        className="flex items-baseline gap-2 -mt-8"
      >
        <div className="w-3/4 ">
          <SearchBar />
        </div>
          <button
            onClick={() => setShowDrawer(true)}
            className=" text-white bg-[#8B5CF6] px-2 p-1 rounded-sm mt-4 flex gap-1 items-center hover:bg-[#7C3AED] transition"
            type="button"
          >
            <FaFilter /> Filter
          </button>
        
      </header>

      {/* Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDrawer(false)}
          />

          {/* Drawer Panel */}
          <div
            className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#EEF4FF] shadow-xl transform transition-transform duration-300 ease-in-out ${
              showDrawer ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold text-[#8B5CF6]">Filters</h2>

              <button
                type="button"
                onClick={() => setShowDrawer(false)}
                className="rounded-lg p-2 text-[#8B5CF6] hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close drawer"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="h-[calc(100%-73px)] overflow-y-auto p-6">
              <FilterForm onFilterSubmit={handleFilterSubmit} />
            </div>
          </div>
        </div>
      )}

      <div className=" mt-2 overflow-x-auto rounded-xl border border-violet-200 shadow-sm">
        {/* Table */}

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
              <th className="px-6 py-3 text-left text-sm font-semibold text-violet-700 flex items-center justify-between">
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
                  <button
                    onClick={() => navigate(`/${item.submission_id}`)}
                    className="rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700 transition flex gap-0.5 items-center "
                  >
                    <FaEye />
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${item.submission_id}`)}
                    className="rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700 transition flex gap-0.5 items-center"
                  >
                    <FaPencilAlt />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
