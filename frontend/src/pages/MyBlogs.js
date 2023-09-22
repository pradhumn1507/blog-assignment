import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Axios } from "../axios/axios";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineDislike, AiOutlineLike,AiOutlineClose } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [animate,isAnimate] = useState(false)
  const { blogs} = useContext(AppContext);
  

  useEffect(() => {
    isAnimate(true)
    getMyBlogs();
  }, [blogs]);

  const getMyBlogs = async () => {
    try {
      Axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const resp = await Axios.get("/myblogs");
      console.log(resp.data);
      setMyBlogs(resp.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteBlog=(id)=>{
    try {
      Axios.delete(`/delete?id=${id}`)
      .then(()=>getMyBlogs())
      .catch((error)=>{
        alert(error.message)
      })
    } catch (error) {
      
    }
    
}

  return (
    <>
     <CSSTransition
     in={animate}
     timeout={2000}
     classNames="fade"
     unmountOnExit>

        <div className="flex-col p-10 w-screen h-auto items-center justify-center">
          <p className="text-2xl font-semibold mb-10">
            You have contributed in {myBlogs.length} blogs
          </p>
          <div className="flex gap-10 w-full overflow-x-scroll p-5 flex-wrap">
            {myBlogs?.map((item) => (
              <div className="relative">
              <div
                key={item._id}
                className="border-2 w-96 rounded-2xl shadow-2xl h-min-[600px] mb"
              >
                <img
                  src={`https://blogmernreactbackend.onrender.com/images/${item.file.name}`}
                  alt="hello"
                  className="rounded-lg shadow-lg w-auto h-[280px]"
                />
                <div className="flex justify-around mt-3">
                  <div className="bg-orange-200 text-xs rounded p-1 opacity-60">
                    {item.keywords}
                  </div>
                </div>
                <div className="p-3 font-semibold text-xl text-slate-700">
                  {item.title}
                </div>
                <div className="py-0 px-3 h-24 overflow-hidden">
                  {item.description}
                </div>
                <div className="p-3 flex flex-row items-center justify-around font-semibold mt-2">
                  <div className="flex items-center justify-center gap-1">
                    <span>{item.likes.length}</span>
                    <AiOutlineLike size={25} />
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span>{item.dislikes.length}</span>
                    <AiOutlineDislike size={25} />
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span>{item.comments.length}</span>
                    <FaRegComment size={25} />
                  </div>
                </div>
              </div>
              <div className="absolute top-2 opacity-70 right-2">
                    <AiOutlineClose size={20} onClick={()=>deleteBlog(item._id)} className="hover:cursor-pointer"/>
              </div>
              </div>
              
            ))}
          </div>
        </div>
     </CSSTransition>

    </>
  );
};

export default MyBlogs;
