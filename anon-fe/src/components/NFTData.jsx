import React, { useState, useEffect, useCallback } from "react";
import useGetNfts from "../hooks/useGetNfts";
import { Contract } from "ethers";
import nftAbi from "../constants/nftAbi.json";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitProvider } from "@reown/appkit/react";
import { readOnlyProvider } from "../constants/readOnlyProvider";
import BatchMint from "./BatchMint";
import { NavLink } from "react-router-dom";

const NFTData = () => {
  const { allNft } = useGetNfts();
  const [nft, setNft] = useState([]);
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [holders, setHolders] = useState([]);

  const fetchAllNftData = useCallback(async () => {
    if (!isConnected || !walletProvider || !Array.isArray(allNft)) return;

    try {
      const results = await Promise.all(
        allNft.map(async (address) => {
          const nftContract = new Contract(address, nftAbi, readOnlyProvider);
          const data = await nftContract.getTokenInfo();
          return {
            address,
            name: data.name || data[0],
            image: data.tokenURI || data[1],
          };
        })
      );
      setNft(results);
    } catch (error) {
      console.log("Error fetching all user NFTs", error);
    }
  }, [allNft, isConnected, walletProvider]);

  const fetchRecipients = useCallback(async () => {
    if (!isConnected || !walletProvider || !Array.isArray(allNft)) return;

    try {
      const results = await Promise.all(
        allNft.map(async (address) => {
          try {
            const nftContract = new Contract(address, nftAbi, readOnlyProvider);
            const result = await nftContract.getAllRecipients();
            const recipients = Array.from(result);

            return {
              address,
              recipients,
            };
          } catch (err) {
            console.warn(
              `Contract at ${address} doesn't support getAllRecipients`
            );
            return {
              address,
              recipients: [],
            };
          }
        })
      );
      setHolders(results);
    } catch (error) {
      console.log("Error fetching recipients from all user NFTs", error);
    }
  }, [allNft, isConnected, walletProvider]);

  useEffect(() => {
    if (allNft.length > 0) {
      fetchAllNftData();
      fetchRecipients();
    }
  }, [fetchAllNftData]);

  const convertIpfsUrl = (url) => {
    if (url && url.startsWith("ipfs://")) {
      return url.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    return url || "";
  };

  //   console.log("Help", holders)

  return (
    <div className="relative">
      <h2 className="text-Roboto font-bold lg:text-[28px] md:text-[24px] text-[20px] my-6 text-center">
        Join Organization Based Forums.
      </h2>
      <section className="border border-black/40 rounded-3xl p-8 lg:w-[50%] md:w-[50%] w-[90%] mx-auto">
        <h2 className="my-4">
          Join existing organization forums by getting whitelisted by the Admin.
        </h2>
        <ul>
          <li className="list-disc mb-3 text-[14px]">
            Verify you own the platform's NFT.
          </li>
          <li className="list-disc mb-3 text-[14px]">
            Gain access to the forum
          </li>
          <li className="list-disc mb-3 text-[14px]">
            Chat Anonymously – Members join your private forum and talk freely.
          </li>
        </ul>
        <div className="flex justify-between flex-wrap flex-col lg:flex-row md:flex-row">
          {nft.map((info, index) => (
            <div
              key={info.address}
              className="my-4 rounded-lg shadow-lg p-4 lg:w-[49%] md:w-[48%] w-[100%] border border-gray-300"
            >
              <p className="font-bold text-[18px] lg:text-[20px] md:text-[20px]">
                {info.name ?? "Unnamed NFT"} Forum
              </p>
              <img
                src={convertIpfsUrl(info.image)}
                alt={info.name}
                className="w-full h-[150px] rounded-3xl object-cover object-center my-3"
              />
              <BatchMint address={info.address} />
              <button className="text-white bg-dark p-3 rounded-lg w-[100%] mt-3">
                Verify
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NFTData;
