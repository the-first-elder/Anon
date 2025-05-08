import React, { useState, useEffect, useCallback } from "react";
import useGetNfts from "../hooks/useGetNfts";
import { Contract } from "ethers";
import nftAbi from "../constants/nftAbi.json";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitProvider } from "@reown/appkit/react";
import { readOnlyProvider } from "../constants/readOnlyProvider";

const NFTData = () => {
  const { allNft} = useGetNfts();
  const [nft, setNft] = useState([])
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

    useEffect(() => {
        const fetchAllNftData = async () => {
          if (!isConnected || !walletProvider) return;
      
          try {
            const results = await Promise.all(
              allNft.map(async (address) => {
                const nftContract = new Contract(address, nftAbi, readOnlyProvider);
                const name = await nftContract.name();
                const image = await nftContract.tokenURI(0);
                return {
                  address,
                  name,
                  image
                };
              })
            );
      
            setNft(results); 
          } catch (error) {
            console.log("Error fetching all user NFTs", error);
          }
        };
      
        if (allNft.length > 0) {
          fetchAllNftData();
        }
      }, [allNft, isConnected, walletProvider]);

      const convertIpfsUrl = (url) => {
        if (url && url.startsWith("ipfs://")) {
          return url.replace("ipfs://", "https://ipfs.io/ipfs/");
        }
        return url || "";
      };
      
  console.log(nft);
  return (
    <div>
     {nft.map((info) => ( <div className="my-4 rounded-lg shadow-lg p-4 lg:w-[49%] md:w-[48%] w-[100%] border border-gray-300">
        <p className="font-bold text-[18px] lg:text-[20px] md:text-[20px]">
          {info.name} Forum
        </p>
        <img
          src={convertIpfsUrl(info.image)}
          alt=""
          className="w-[100%] h-[150px] rounded-3xl object-cover object-center my-3"
        />
        <button className="text-white bg-dark p-3 rounded-lg w-[100%]">
          BatchMint
        </button>
      </div>))}
    </div>
  );
};

export default NFTData;
