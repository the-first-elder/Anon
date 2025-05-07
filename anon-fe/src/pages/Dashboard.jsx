import React from "react";
import logo from '../assets/logo.png'
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <header className="lg:flex md:flex hidden justify-between items-center w-[90%] mx-auto my-12">
        <NavLink to='/'><img src={logo} alt="" className="w-[200px]" /></NavLink>
        <button
          className="flex py-3 px-6 rounded-lg items-center bg-dark text-white font-Roboto font-semibold"
        >
          Connect Wallet
        </button>
      </header>
      <section>

      </section>
    </div>
  );
};

export default Dashboard;
