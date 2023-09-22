import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import "../transitions.css";
const AboutPage = () => {
  const [animate, isAnimate] = useState(false);
  useEffect(() => {
    isAnimate(true);
  }, []);
  return (

    <CSSTransition in={animate} timeout={500} classNames="fade" unmountOnExit>

    <div className="bg-white px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About</h1>
        <p className="text-lg text-gray-700">
          Welcome to my blog! This blog is dedicated to sharing insights and knowledge on various topics. Here, you'll find articles, tutorials, and opinions on subjects such as technology, lifestyle, travel, and more.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          Our mission is to provide valuable and engaging content to our readers. We believe in the power of knowledge and aim to inspire, educate, and entertain through our blog posts.
        </p>
        <h2 className="text-2xl font-bold mt-8">Meet the Team</h2>
        <div className="mt-4">
          <div className="flex items-center mb-4">
            <div>
              <h3 className="text-lg font-medium"> Pradhumn Agrawal</h3>
              <p className="text-gray-700">Founder & Writer</p>
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-700 mt-8">
          
          We're passionate about delivering high-quality content and ensuring a great reading experience for our audience. If you have any suggestions, feedback, or collaboration opportunities, feel free to reach out to us through the contact information provided below.
        </p>
        <h2 className="text-2xl font-bold mt-8">Contact Us</h2>
        <div className="flex items-center mt-4">
          <svg className="w-6 h-6 text-gray-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <p className="text-lg text-gray-700">
            Email: contact@example.com
          </p>
        </div>
        <div className="flex items-center mt-2">
          <svg className="w-6 h-6 text-gray-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
          </svg>
          <p className="text-lg text-gray-700">
            Phone: 123-456-7890
          </p>
        </div>
      </div>
    </div>
    </CSSTransition>
  );
};

export default AboutPage;
