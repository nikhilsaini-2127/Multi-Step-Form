import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewData = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDeleting,setIsDeleting]=useState(false);
  const navigate=useNavigate();

  const handleDelete=async()=>{
    try{
      const response=await fetch(`http://localhost:5000/api/formData/${id}`,{
        method:"delete"
      })
      const res=await response.json();
      console.log(res);
      setIsDeleting(false);
        if(res.success===true)toast.success("Data deleted sucessfully!")
        else toast.error("Couldn't delete the data");
      setTimeout(()=>{
        navigate("/home");
      },1000)
    }catch(e){
      console.error(e);
      toast.error("Couldn't delete the data");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/formData/${id}`,
          {
            method: "get",
          },
        );
        const res = await response.json();
        console.log(res);
        setData(res.data);
        if(res.success===true)toast.success("Data fetched sucessfully!")
        else toast.error("Couldn't fetch the data");
        setLoading(false);
      } catch (e) {
        toast.error("Couldn't fetch the data");
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {
        isDeleting &&
        (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred background */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          {/* Card */}
          <div className="relative z-10 flex flex-col   items-center justify-center w-1/3 h-[8rem] gap-6 bg-[#ddd6fe]  rounded-sm">
            <span className="font-bold text-[#8B5CF6]">
              Do you want to delete the response?
            </span>
            <span>
            <button onClick={handleDelete} className="bg-red-500 text-[#EEF4FF] px-2 p-1 rounded-sm ">🗑️Delete</button>&nbsp;
            <button onClick={()=>setIsDeleting(false)} className="bg-[#EEF4FF] text-[#8B5CF6] px-2 p-1 rounded-sm ">Cancel</button>
            </span>
          </div>
        </div>
        )
      }
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1 className="text-2xl p-2 font-bold text-[#8B5CF6]">
        View Submission Details
      </h1>
      <div className="flex flex-col border-[#ddd6fe]-2  p-2 gap-2">
        {loading && <p>Loading...</p>}
        {data && Object.entries(data).map(([key, values]) => {
          if (typeof values !== "object" || values === null) return null;
          return (
            <div
              key={key}
              className="flex flex-col border-[#ddd6fe]-1  rounded-xl"
            >
              <span className="text-xl text-[#8B5CF6] border-b-1 bg-[#ddd6fe] rounded-t-xl px-1 ">
                {key.toLocaleUpperCase()} INFO
              </span>
              <div className="grid grid-cols-2 gap-4 p-2">
                {Object.entries(values).map(([subkey, subvalue]) => {
                  if (subkey === "submission_id") return null;
                  return (
                    <span
                      key={subkey}
                      className="border-1 border-[#ddd6fe] p-2 rounded-xl "
                    >
                      <strong>{subkey}</strong>: {subvalue}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 p-2">
        <button onClick={()=>navigate(`/edit/${id}`)} className="flex gap-1 items-center bg-[#8B5CF6] text-[#EEF4FF] px-2 p-1 rounded-sm border-[#6366F1]-1">
            <FaPencilAlt />
            Edit
          
        </button>
        <button onClick={()=>setIsDeleting(true)} className="flex items-center gap-1 bg-red-500 text-[#EEF4FF] px-2 p-1 rounded-sm border-1 border-red-800">
            <MdDelete />
            Delete
        </button>
      </div>
    </div>
  );
};

export default ViewData;
