import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import mobileLogo from "../assets/foot-logo.svg";
import ForumChat from "../components/ForumChat";
import { useAppKitAccount } from "@reown/appkit/react";

const Forum = () => {
    const { isConnected } = useAppKitAccount()

  return isConnected && (
    <main>
      <header className="flex justify-between items-center w-[90%] mx-auto my-12">
        <NavLink to="/dashboard">
          <img
            src={logo}
            alt=""
            className="w-[200px] hidden lg:block md:block"
          />
          <img
            src={mobileLogo}
            alt=""
            className="w-[60px] block lg:hidden md:hidden"
          />
        </NavLink>
        {!isConnected ? (
          <button
            className="flex py-3 px-6 rounded-lg items-center bg-dark text-white font-Roboto font-semibold"
            onClick={() => open()}
          >
            Connect Wallet
          </button>
        ) : (
          <w3m-button />
        )}
      </header>
      <section className="">
        <ForumChat />
      </section>
    </main>
  );
};

export default Forum;
