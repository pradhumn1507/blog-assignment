import React, { useContext, useEffect, useState } from "react";
import CreateBlog from "../components/CreateBlog";
import loader from "../utils/loader.svg";
import { AppContext } from "../context/AppContext";
import { CSSTransition } from "react-transition-group";
import '../transitions.css'
const Upload = () => {
  const [animate, isAnimate] = useState(false)
  useEffect(() => {
    isAnimate(true)
  }, []);
  return (
    <>
      <CSSTransition
        in={animate}
        timeout={500}
        classNames="fade"
        unmountOnExit>
        <CreateBlog />
      </CSSTransition>
    </>
  );
};

export default Upload;
