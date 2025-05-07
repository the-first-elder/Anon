import React from "react";
import logo from "../assets/logo.png";
import { IoIosRocket } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <header className="lg:flex md:flex hidden justify-between items-center w-[90%] mx-auto my-12">
      <img src={logo} alt="" className="w-[200px]" />
      <NavLink to='/dashboard' className="flex py-3 px-6 rounded-lg items-center bg-dark text-white font-Roboto font-semibold">Connect Wallet</NavLink>
    </header>
  );
};

export default Nav;