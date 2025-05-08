import React from "react";
import logo from "../assets/foot-logo.svg";
import { FaSquareFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-between w-[90%] flex-col lg:flex-row md:flex-row mx-auto">
      <img src={logo} alt="" className="w-[60px] my-3"/>
      <p className="text-center my-3">&copy; All Rights Reserved - Anon {currentYear} </p>
      <div className="flex items-center text-3xl mb-4 text-dark">
        <FaSquareFacebook className="mr-4" />
        <RiInstagramFill className="mr-4"/>
        <IoLogoYoutube className="mr-4" />
        <FaSquareXTwitter />
      </div>
    </footer>
  );
};

export default Footer;