import React from 'react';
import "./header.css";
import { FaGithub } from "react-icons/fa";
const Header = () => {
  return (
    <>
      <div className="header main">
        <div className="container">
          
        <span className='logo'>
            To Do List
        </span>
        <a href="https://github.com/priyanshu8851" target="_blank"><FaGithub /></a>
        </div>
      </div>
    </>
  )
}

export default Header;
