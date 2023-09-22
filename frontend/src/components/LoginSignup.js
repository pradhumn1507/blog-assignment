import React, { useContext, useEffect, useState } from "react";
import bubble from "../../src/assets/bubble.jpg";
import { Axios } from "../axios/axios";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../transitions.css";
import { AppContext } from "../context/AppContext";
import loader from "../utils/loader.svg";
const LoginSignup = () => {
  const [animate, isAnimate] = useState(false);
  const { loading, isLoading, setUserName } = useContext(AppContext);

  useEffect(() => {
    isAnimate(true);
  }, []);

  const navigate = useNavigate();
  const [current, setCurrent] = useState("login");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [signup, setSignup] = useState({
    email: "",
    password: "",
    repassword: "",
    name: "",
  });

  const handleCurrent = (e) => {
    setCurrent(e.target.name);
  };

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSignup = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { email, password, name } = signup;
    try {
      const response = await Axios.post("/register", {
        email,
        password,
        name,
      });
      alert("User Created Successfully");

      console.log("signup", response);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const loginUser = async (e) => {
    isLoading(true);
    e.preventDefault();
    const { email, password } = login;
    try {
      const response = await Axios.post("/login", {
        email,
        password,
      });
      console.log("usersvsdndfjkdnkl", response.data.username);
      setUserName(response.data.username);
      localStorage.setItem("token", response.data.token);
      Axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      isLoading(false);
      navigate("/landing");
    } catch (error) {
      await isLoading(false);
      console.log(error);
      // alert("error.response.data.error");
    }
  };

  return (
    <CSSTransition in={animate} timeout={500} classNames="fade" unmountOnExit>
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <img src={bubble} alt="" className="w-full h-full left-0 top-0" />
        <div className="w-4/6 opacity-90  max-w-md bg-black absolute border border-black shadow-md rounded-xl p-6">
          <div className="flex justify-center mb-4">
            <button
              className={`text-xl mr-4 focus:outline-none ${
                current === "login" ? "text-blue-500" : "text-white"
              }`}
              onClick={handleCurrent}
              name="login"
            >
              Login
            </button>
            <button
              className={`text-xl focus:outline-none ${
                current === "signup" ? "text-blue-500" : "text-white"
              }`}
              onClick={handleCurrent}
              name="signup"
            >
              Signup
            </button>
          </div>
          {current === "login" ? (
            <form onSubmit={loginUser}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={handleLogin}
                  value={login.email}
                  className=" bg-transparent  appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-white text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleLogin}
                  value={login.password}
                  className=" bg-transparent appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-white text-sm">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {loading ? (
                    <>
                      {" "}
                      <img src={loader} alt="" className="w-5" />{" "}
                    </>
                  ) : (
                    <>Login</>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={registerUser}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-white text-sm font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleSignup}
                  value={signup.name}
                  className="  bg-transparent appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={handleSignup}
                  value={signup.email}
                  className="  bg-transparent appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-white text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleSignup}
                  value={signup.password}
                  className="  bg-transparent appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="repassword"
                  className="block text-white text-sm font-bold mb-2"
                >
                  Re-Password
                </label>
                <input
                  type="password"
                  name="repassword"
                  onChange={handleSignup}
                  value={signup.repassword}
                  className="  bg-transparent appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {signup.repassword && signup.repassword !== signup.password ? (
                <div className="text-[red] mt-[-9px] mb-5">
                  Password didn't matched
                </div>
              ) : (
                <></>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {loading ? (
                    <>
                      {" "}
                      <img src={loader} alt="" className="w-5" />{" "}
                    </>
                  ) : (
                    <>Signup</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </CSSTransition>
  );
};

export default LoginSignup;
