import { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { sepolia } from "@reown/appkit/networks";
import { ErrorDecoder } from "ethers-decode-error";
import abi from '../constants/abi.json'

const useCreateNft = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const errorDecoder = ErrorDecoder.create([abi]);

  return useCallback(
    async (nftName, nftSymbol, imageUrl, ownerAddress) => {
      if (!nftName || !nftSymbol || !ownerAddress || !imageUrl) {
        toast.error("Invalid input!");
        return;
      }

      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!contract) {
        toast.error("Contract not found");
        return;
      }

      if (Number(chainId) !== Number(sepolia.id)) {
        toast.error("You're not connected to Sepolia");
        return;
      }

      try {
       

        const tx = await contract.createAnonNFT(nftName, nftSymbol, imageUrl, ownerAddress);
        console.log(tx)
        const receipt = await tx.wait();
        console.log(receipt)

        if (receipt.status === 1) {
          toast.success("NFT Creation Successful");
          return;
        }

        toast.error("Failed to Create NFT");
        return;
      } catch (err) {
        const decodedError = await errorDecoder.decode(err);
        toast.error(`Failed to Create NFT - ${decodedError.reason}`, {
          position: "top-center",
        });
      }
    },
    [contract, address, chainId]
  );
};

export default useCreateNft;