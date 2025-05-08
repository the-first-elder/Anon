import React from "react";
import heroImg from "../assets/hero.svg";
import { GoDotFill } from "react-icons/go";
import { FaWallet } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import { MdVerifiedUser } from "react-icons/md";
import { PiAddressBookFill } from "react-icons/pi";
import { SiTheconversation } from "react-icons/si";
import { LiaCommentDots } from "react-icons/lia";
import bgImg from "../assets/bg-foot.svg";
import { ImCheckmark } from "react-icons/im";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import { IoLogoWechat } from "react-icons/io5";
import { GiConversation } from "react-icons/gi";


const Home = () => {
  return (
    <main>
      <Header />
      <MobileHeader />
      <section className="flex items-center justify-between flex-col lg:flex-row md:flex-row w-[90%] mx-auto">
        <div className="lg:w-[45%] md:w-[48%] w-[100%] flex flex-col items-start mb-4">
          <p className="py-4 px-12 border rounded-full font-bold border-skyblue text-skyblue lg:text-[18px] md:text-[18px] text-[14px]">
          Where access meets anonymity.
          </p>
          <h1 className="text-Roboto font-bold lg:text-[52px] md:text-[48px] text-[32px] lg:text-left md:text-left text-center">
          Access granted. Discussions unlocked. Empowered by anonymity.
          </h1>
        </div>
        <div className="lg:w-[50%] md:w-[48%] w-[100%] mb-4">
          <img src={heroImg} alt="" />
        </div>
      </section>
      <section className="my-12 bg-[#F7F9FA] py-20">
        <div className="w-[90%] mx-auto">
          <div className="text-center flex flex-col items-center">
            <p className="py-4 px-12 border rounded-full font-bold border-skyblue text-skyblue lg:text-[18px] md:text-[18px] text-[14px]">
              How it Works.
            </p>
            <h2 className="text-Roboto font-bold lg:text-[45px] md:text-[40px] text-[24px]">
              Getting Started is Easy.
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row md:flex-row justify-between">
            <div className="lg:w-[32%] md:w-[32%] w-[100%] mb-4">
              <h2 className="lg:text-[100px] md:text-[80px] text-[50px] text-center font-black text-skyblue">
                01
              </h2>
              <div className="flex text-4xl my-4">
                <GoDotFill className="mr-2 text-[#D23D3D]" />
                <GoDotFill className="mr-2 text-[#B7B701]" />
                <GoDotFill className="text-[#30AF02]" />
              </div>
              <div className="bg-white p-4  shadow-3xl rounded-lg lg:h-[340px] md:h-[450px] h-auto">
                <div className="p-4 bg-light text-dark rounded-lg my-4">
                  <div className="flex items-center">
                    <div className="bg-dark py-3 px-4 rounded-lg mr-4">
                      <FaWallet className="bg-dark text-white text-2xl" />
                    </div>
                    <p className="lg:text-[20px] md:text-[20px] text-[18px] font-semibold">
                      {" "}
                      Connect Wallet.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-light text-dark rounded-lg my-4">
                  <div className="flex items-center">
                    <div className="bg-dark py-3 px-4 rounded-lg mr-4">
                      <MdForum className="bg-dark text-white text-2xl" />
                    </div>
                    <p className="lg:text-[20px] md:text-[20px] text-[18px] font-semibold">
                      {" "}
                      Pick a Forum.
                    </p>
                  </div>
                </div>
              </div>
              <h2 className="lg:text-[24px] md:text-[24px] text-[20px] my-6 font-semibold">
              Authentication.
              </h2>
              <p className="text-[#6E6C6C]">
              Start by connecting your EVM wallet to Sepolia metwork, then explore the forum options to verify token ownership and full access to the platform.
              </p>
            </div>
            <div className="lg:w-[32%] md:w-[32%] w-[100%] mb-4">
              <h2 className="lg:text-[100px] md:text-[80px] text-[50px] text-center font-black text-skyblue">
                02
              </h2>
              <div className="flex text-4xl my-4">
                <GoDotFill className="mr-2 text-[#D23D3D]" />
                <GoDotFill className="mr-2 text-[#B7B701]" />
                <GoDotFill className="text-[#30AF02]" />
              </div>
              <div className="bg-white p-4  shadow-3xl rounded-lg lg:h-[340px] md:h-[450px] h-auto">
                <div className="p-4 bg-light text-dark rounded-lg my-4">
                  <div className="flex items-center">
                    <div className="bg-dark py-3 px-4 rounded-lg mr-4">
                      <MdVerifiedUser className="bg-dark text-white text-2xl" />
                    </div>
                    <p className="font-semibold lg:text-[20px] md:text-[20px] text-[18px]">
                    Verify NFT Ownership. 
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-light text-dark rounded-lg my-4">
                  <div className="flex items-center">
                    <div className="bg-dark py-3 px-4 rounded-lg mr-4">
                      <PiAddressBookFill className="bg-dark text-white text-2xl" />
                    </div>
                    <p className="lg:text-[20px] md:text-[20px] text-[18px] font-semibold">
                      {" "}
                      Get Anonymous Address.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-light text-dark rounded-lg my-4">
                  <div className="flex items-center">
                    <div className="bg-dark py-3 px-4 rounded-lg mr-4">
                      <IoLogoWechat className="bg-dark text-white text-2xl" />
                    </div>
                    <p className="lg:text-[20px] md:text-[20px] text-[18px] font-semibold">
                      {" "}
                      Start Chatting.
                    </p>
                  </div>
                </div>
              </div>
              <h2 className="lg:text-[24px] md:text-[24px] text-[20px] my-4 font-semibold">
                Forum Spaces.
              </h2>
              <p className="text-[#6E6C6C]">
              Get access to exclusive discussion areas for verified NFT holders. Be a part of private, meaningful conversations with fellow holders.
              </p>
            </div>
            <div className="lg:w-[32%] md:w-[32%] w-[100%] mb-4">
              <h2 className="lg:text-[100px] md:text-[80px] text-[50px] text-center font-black text-skyblue">
                03
              </h2>
              <div className="flex text-4xl my-4">
                <GoDotFill className="mr-2 text-[#D23D3D]" />
                <GoDotFill className="mr-2 text-[#B7B701]" />
                <GoDotFill className="text-[#30AF02]" />
              </div>
              <div className="bg-white p-4  shadow-3xl rounded-lg lg:h-[340px] md:h-[450px] h-auto">
                <div className="p-4 bg-light text-dark rounded-lg my-4">
                  <div className="flex items-center">
                    <div className="bg-dark py-3 px-4 rounded-lg mr-4">
                      <GiConversation className="bg-dark text-white text-2xl" />
                    </div>
                    <p className="lg:text-[20px] md:text-[20px] text-[18px] font-semibold">
                    Join existing conversation.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-light text-dark rounded-lg my-4">
                  <div className="flex items-center">
                    <div className="bg-dark py-3 px-4 rounded-lg mr-4">
                      <SiTheconversation className="bg-dark text-white text-2xl" />
                    </div>
                    <p className="lg:text-[20px] md:text-[20px] text-[18px] font-semibold">
                      {" "}
                      Start your conversation.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-light text-dark rounded-lg my-4">
                  <div className="flex items-center">
                    <div className="bg-dark py-3 px-4 rounded-lg mr-4">
                      <LiaCommentDots className="bg-dark text-white text-2xl" />
                    </div>
                    <p className="lg:text-[20px] md:text-[20px] text-[18px] font-semibold">
                      {" "}
                      Comment and replies.
                    </p>
                  </div>
                </div>
              </div>
              <h2 className="lg:text-[24px] md:text-[24px] text-[20px] my-4 font-semibold">
              Join a Conversation
              </h2>
              <p className="text-[#6E6C6C]">
              Start sharing ideas, insights, and updates with fellow NFT holders—no noise, just real talk.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex lg:flex-row md:flex-row flex-col bg-dark rounded-lg lg:px-12 md:px-8 px-4 justify-between items-center my-16 w-[90%] mx-auto">
        <div className="lg:w-[40%] md:w-[45%] w-[100%] py-6">
          <div className="my-4">
            <div className="flex items-center">
              <div className="bg-white py-3 px-4 rounded-lg mr-4">
                <ImCheckmark className=" text-dark lg:text-2xl md:text-2xl text-lg" />
              </div>
              <p className="text-[20px] font-semibold text-white">
              Token-Gated Access
              </p>
            </div>
          </div>
          <div className="my-4">
            <div className="flex items-center">
              <div className="bg-white py-3 px-4 rounded-lg mr-4">
                <ImCheckmark className=" text-dark lg:text-2xl md:text-2xl text-lg" />
              </div>
              <p className="text-[20px] text-white font-semibold">
              Anonymous & Secure.
              </p>
            </div>
          </div>
          <div className="my-4">
            <div className="flex items-center">
              <div className="bg-white py-3 px-4 rounded-lg mr-4">
                <ImCheckmark className=" text-dark lg:text-2xl md:text-2xl text-lg" />
              </div>
              <p className="text-[20px] text-white font-semibold">
              Community-Driven Forums.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-[55%] md:w-[52%] w-[100%] py-6">
          <img src={bgImg} alt="" className="w-[100%] " />
        </div>
      </section>
    </main>
  );
};

export default Home;