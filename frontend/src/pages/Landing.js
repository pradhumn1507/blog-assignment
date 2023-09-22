import React, { useContext, useEffect, useState } from "react";
import Hero from "../components/Hero";
import { AppContext } from "../context/AppContext";
import loader from "../utils/loader.svg";
import { CSSTransition } from "react-transition-group";
import "../transitions.css";

const Landing = () => {
  const [animate, isAnimate] = useState(false);
  useEffect(() => {
    isAnimate(true);
  }, []);

  return (
    <>
      <CSSTransition in={animate} timeout={500} classNames="fade" unmountOnExit>
        <div className="relative">
          <Hero />
        </div>
      </CSSTransition>
    </>
  );
};

export default Landing;
