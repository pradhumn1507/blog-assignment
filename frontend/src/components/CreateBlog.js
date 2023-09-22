import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uploadBG from '../assets/uploadBG.jpg'
import {Axios} from '../axios/axios.js'
import loader from '../utils/loader.svg'
import { AppContext } from "../context/AppContext";

const CreateBlog = () => {
  const {loading,isLoading} = useContext(AppContext)
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleKeywordsChange = (e) => {
    const keywordsArray = e.target.value
      .split(",")
      .map((keyword) => keyword.trim());
    setKeywords(keywordsArray.slice(0, 6));
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit =async (e) => {

    e.preventDefault();
    isLoading(true)
    // Submit the form or perform any other actions here
    const formData = new FormData();
// 
    formData.append("title", title);
    formData.append("file", file);
    formData.append("keywords", keywords);
    formData.append("description", content.replace(/<[^>]*>/g, ''));
    try {
       const response = await Axios.post('/create',formData)
       isLoading(false)
       alert("File Uploaded successfully")
    } catch (error) {
      isLoading(false)
        alert(error.response.data)
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"]
    ]
  };

  return (
    <div className="w-screen h-auto relative flex justify-center overflow-x-hidden items-center">
      <img src={uploadBG} alt="" className="cover w-full h-[750px] grow brightness-50" />
      <div className="w-4/5 md:max-w-xl text-xs md:text-lg  mx-auto py-8 border-2 absolute top-20 p-5 mt-4 rounded-lg bg-slate-200 shadow-2xl ">
        <h2 className="text-2xl font-bold mb-4">Upload Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="keywords" className="block text-gray-700 font-medium">
              Keywords (max 6):
            </label>
            <input
              type="text"
              id="keywords"
              value={keywords.join(", ")}
              onChange={handleKeywordsChange}
              required
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-gray-700 font-medium">
              Content:
            </label>
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              modules={quillModules}
              className="border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="file" className="block text-gray-700 font-medium">
              Upload File:
            </label>
            <input type="file" id="file" name="file" onChange={handleFileChange} className="w-full" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          {loading ? (<> <img src={loader} alt="" className="w-5"/> </>):(<>Login</>)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
