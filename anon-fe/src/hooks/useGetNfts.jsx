import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useState, useCallback, useEffect } from "react";
import useContractInstance from "./useContractInstance";

const useGetNfts = () => {
  const contract = useContractInstance(true);
  const [allNft, setAllNft] = useState([]);
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  const getAllDeployed = useCallback(async () => {
    if (!isConnected || !walletProvider || !contract) return;

    try {
      const data = await contract.getAllDeployedNFTs();

      // Ensure the data is always an array
      const converted = Array.isArray(data) ? data : [];
      setAllNft(converted);
    } catch (error) {
      console.log("Error fetching all user NFTs", error);
      setAllNft([]); // fallback to empty array on error
    }
  }, [isConnected, walletProvider, contract]);

  useEffect(() => {
    getAllDeployed();
  }, [getAllDeployed]);

  return {
    allNft,
  };
};

export default useGetNfts;