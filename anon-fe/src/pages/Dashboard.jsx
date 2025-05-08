import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import mobileLogo from "../assets/foot-logo.svg"
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import CreateNFT from "../components/CreateNFT";
import NotConnected from "../components/NotConnected";
import NFTData from "../components/NFTData";
import MerkleDemo from "../components/merkleDemo";

const Dashboard = () => {
  const { isConnected } = useAppKitAccount();
 
  const { open } = useAppKit();
  return (
    <div>
      <header className="lg:flex md:flex hidden justify-between items-center w-[90%] mx-auto my-12">
        <NavLink to="/">
          <img src={logo} alt="" className="w-[200px]" />
        </NavLink>
        {!isConnected ? (
          <button className="flex py-3 px-6 rounded-lg items-center bg-dark text-white font-Roboto font-semibold"  onClick={() => open()}>
            Connect Wallet
          </button>
        ) : (
          <w3m-button />
        )}
      </header>
      <header className='flex lg:hidden md:hidden justify-between items-center w-[90%] mx-auto my-12'>
              <img src={mobileLogo} alt="" className='w-[60px]'/>
              {!isConnected ? (
          <button className="flex py-3 px-6 rounded-lg items-center bg-dark text-white font-Roboto font-semibold"  onClick={() => open()}>
            Connect Wallet
          </button>
        ) : (
          <w3m-button />
        )}
          </header>
      {isConnected ? <div>
      <h2 className="text-Roboto font-bold lg:text-[36px] md:text-[30px] text-[20px] my-6 text-center">Create your own forum.</h2>
      <section className="border border-black/40 rounded-3xl p-8 lg:w-[50%] md:w-[50%] w-[90%] mx-auto">
        <h2 className="font-bold my-4">Get started by creating a unique NFT that will represent your organisation and get a private platform to chat anonymously.</h2>
        <ul>
          <li className="list-disc mb-3 text-[14px]">
            Mint Your Access NFT – Create a custom NFT for your team or
            community.
          </li>
          <li className="list-disc mb-3 text-[14px]">
            Add Wallets – Assign NFTs to members by adding their addresses.
          </li>
          <li className="list-disc mb-3 text-[14px]">
            Chat Anonymously – Members join your private forum and talk freely.
          </li>
        </ul>
        <CreateNFT />
      </section>
      <h2 className="text-Roboto font-bold lg:text-[36px] md:text-[30px] text-[20px] my-6 text-center">Join a forum.</h2>
      <section className="border border-black/40 rounded-3xl p-8 lg:w-[50%] md:w-[50%] w-[90%] mx-auto">
        <h2 className="my-4">Join existing forums byy verifying you own a particular NFT.</h2>
        <ul>
          <li className="list-disc mb-3 text-[14px]">
            Verify ownership of the specified NFTs.
          </li>
          <li className="list-disc mb-3 text-[14px]">
            Gain access to the forum
          </li>
          <li className="list-disc mb-3 text-[14px]">
            Chat Anonymously – Members join your private forum and talk freely.
          </li>
        </ul>
        <div className="flex justify-between flex-wrap flex-col lg:flex-row md:flex-row">
        <div className="my-4 rounded-lg shadow-lg p-4 lg:w-[49%] md:w-[48%] w-[100%] border border-gray-300">
            <p className="font-bold text-[18px] lg:text-[20px] md:text-[20px]">Bored Ape IV Forum</p>
            <img src="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149619499.jpg?ga=GA1.1.770405697.1735080768&semt=ais_hybrid&w=740" alt=""  className="w-[100%] h-[150px] rounded-3xl object-cover object-center my-3"/>
            <button className="text-white bg-dark p-3 rounded-lg w-[100%]">Verify</button>
        </div>
        <NFTData />
        <MerkleDemo />
        </div>
      </section>
      </div> : <NotConnected />}
    </div>
  );
};

export default Dashboard;
