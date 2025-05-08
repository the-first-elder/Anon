import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useState, useCallback, useEffect } from "react";
import useContractInstance from "./useContractInstance";

const useGetNfts  = () => {
  const contract = useContractInstance(true);
  const [allNft, setAllNft] = useState([]);
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  const getAllDeployed = useCallback(async () => {
    if (!isConnected) return;
    if (!walletProvider) return;

    try {
      const data = await contract.getAllDeployedNFTs();
      const converted = [...data]
      setAllNft(converted);
    } catch (error) {
      console.log("Error fetching all user NFTs", error);
    }
  }, [isConnected, walletProvider, contract]);

  useEffect(() => {
    getAllDeployed();
  }, [getAllDeployed]);

  return {
    allNft,
  };
};

export default useGetNfts