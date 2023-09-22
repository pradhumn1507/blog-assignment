import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bubble from "../assets/bubble.jpg";
import loader from "../utils/loader.svg";
import { Axios } from "../axios/axios";
import { AppContext } from "../context/AppContext";
import { BlogCard } from "../utils/BlogCard";
import { FaLessThanEqual } from "react-icons/fa";
const Hero = () => {
  const { blogs, setBlogs } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [loading, isLoading] = useState(false);

  const pageSize = 4;

  const allBlogs = async () => {
    isLoading(true);
    try {
      const resp = await Axios.get(
        `/getblogs?page=${page}&pagesize=${pageSize}`
      );
      // let newBlogs = [...blogs,resp.data]
      setBlogs([...blogs,...resp.data]);
      console.log("After rest operator",blogs)
      setPage(page + 1);
      isLoading(false);
      return resp.data;
    } catch (error) {
      console.log(error)
      isLoading(false);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    const data = async () => {
      const resp = await Axios.get(
        `/getblogs?page=${page}&pagesize=${pageSize}`
      );

      console.log(resp.data);
      setPage(page + 1);
      setBlogs(resp.data);
    };
    data();
  }, []);

  return (
    <div className="w-4/5 h-auto flex flex-col justify-center m-auto p-5 mt-5">
      <div className="w-full m-auto shadow-lg">
        <h2 className="text-xs md:text-xl mb-4 font-semibold bg-orange-300 w-16 md:w-24  rounded-md opacity-75">
          #Trending{" "}
        </h2>
        <Carousel className="flex flex-col w-5/6 md:1/5 m-auto justify-center items-center">
          <div>
            <img src={bubble} alt="" className="" />
            <p className="legend">Legend 1</p>
          </div>

          <div>
            <img src={bubble} alt="" />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src={bubble} alt="" />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </div>
      <div className="">
        <div className="flex justify-center mt-5 mb-5 text-4xl font-semibold sticky top-16 bg-slate-300 rounded-md p-2 z-20 ">
          Explore Worldwide
        </div>
        {blogs?.length > 0 ? (
          <div className="w-full md:w-3/5 m-auto flex flex-col gap-20 md:flex-row py-5 px-10 justify-center  h-[600px] mt-5 flex-wrap overflow-y-auto">
            {blogs?.map((item) => {
              return <BlogCard key={item._id} item={item} />;
            })}
            <div className="-mt-10">
              {loading ? (
                <>
                  {" "}
                  <img src={loader} alt="" srcset="" width={"35px"} />{" "}
                </>
              ) : (
                <p
                  className="hover:cursor-pointer text-blue-500 underline"
                  onClick={()=>allBlogs}
                >
                  Load More
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <img src={loader} alt="" srcset="" width={"35px"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
