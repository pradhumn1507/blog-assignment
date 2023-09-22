import React, { useContext } from 'react'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { Axios } from '../axios/axios'
import { AppContext } from '../context/AppContext'
export const BlogCard = ({item}) => {
    const {blogs,setBlogs} = useContext(AppContext)



    const handleLike =async (e,id)=>{
        try {
            
           const resp = await Axios.put(`/blogs/${id}/like`)
           const updatedBlogs = await Axios.get("/getblogs");
          setBlogs(updatedBlogs.data)
        } catch (error) {
            alert("Error occured")
        }
    }
    
    const handleDislike =async (e,id)=>{
        try {
            
            const resp = await Axios.put(`/blogs/${id}/dislikes`)
            const updatedBlogs = await Axios.get("/getblogs");
            setBlogs(updatedBlogs.data)
         } catch (error) {
             alert("Error occured")
         }
    }
  return (
    <div className="border-2 w-full  rounded-2xl shadow-2xl h-min-[600px] mb-0">
                <img
                  src={(`https://blogmernreactbackend.onrender.com/images/${item.file.name}`)}
                  
                  alt="hello"
                  className="rounded-lg shadow-lg w-full h-[280px]"
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
                    <AiOutlineLike size={25} onClick={(e)=>handleLike(e,item._id)}/>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span>{item.dislikes.length}</span>
                    <AiOutlineDislike size={25} onClick={(e)=>handleDislike(e,item._id)}/>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span>{item.comments.length}</span>
                    <FaRegComment size={25} />
                  </div>
                </div>
              </div>
  )
}
