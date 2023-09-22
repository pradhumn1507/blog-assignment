import React, { useContext, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { AiFillCaretDown } from 'react-icons/ai';
import clock from '../assets/clock.gif';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import LoginSignup from './LoginSignup';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate()
    const {userName} =useContext(AppContext)
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/user');
  };

  return (
    <div className='w-screen h-auto px-10 py-3 bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-600 border-black shadow-md fixed top-0 z-10 flex flex-row justify-between items-center'>
      <div className='hidden md:flex gap-10 text-md font-semibold text-gray-700'>
        <div className='flex flex-row gap-2'>
          <Link to='/landing'>Explore</Link>
        </div>
        <div>
          <Link to='/create'>Upload</Link>
        </div>
        <div>
          <Link to='/myblogs'>My Blogs</Link>
        </div>
        <div>
        <Link to='/about'>About</Link>
        </div>
      </div>
      <div></div>
      <div className='relative'>
        <div
          className='flex items-center gap-3 border-gray-200 hover:cursor-pointer bg-gray-200 rounded-md p-1'
          onClick={handleDropdownToggle}
        >
          <FiUser size={20} />
          
          <span>{userName}</span>
          <AiFillCaretDown />
        </div>
        {showDropdown && (
          <div className='absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md'>
            <button className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
