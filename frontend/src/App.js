import React from "react";
import User from "./pages/User";
import Landing from "./pages/Landing";
import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Upload from "./pages/Upload";
import { Axios } from "./axios/axios";
import { AppContextProvider } from "./context/AppContext";
import MyBlogs from "./pages/MyBlogs";
import AboutPage from "./pages/AboutPage";

const App = () => {
  const navigate = useNavigate()
  Axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  

  return (
   
      <AppContextProvider>
      <Routes>
        
          <Route path="/user" element={<User />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/landing" element={<Landing />} />
            <Route path="/create" element={<Upload />} />
            <Route path="/myblogs" element={<MyBlogs />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        
    </Routes>
      </AppContextProvider>
    
  );
};

export default App;
