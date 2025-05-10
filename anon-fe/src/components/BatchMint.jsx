import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useCallback } from "react";
import useSignerOrProvider from "../hooks/useSignerOrProvider";
import { useAppKitProvider } from "@reown/appkit/react";
import { useAppKitAccount } from "@reown/appkit/react";
import nftAbi from "../constants/nftAbi.json";
import { toast } from "react-toastify";
import { sepolia } from "@reown/appkit/networks";
import { ErrorDecoder } from "ethers-decode-error";
import { useAppKitNetwork } from "@reown/appkit/react";
import abi from "../constants/nftAbi.json";
import { Contract } from "ethers";

const BatchMint = ({ address }) => {
  let [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider();
  const [recipients, setRecipients] = useState("");
  const { signer } = useSignerOrProvider();
  const { chainId } = useAppKitNetwork();
  const errorDecoder = ErrorDecoder.create([abi]);

  function open() {
    setIsOpen(true);
    console.log(address);
  }

  function close() {
    setIsOpen(false);
  }

  const handleBatchMint = useCallback(
    async () => {
    //   if (!recipients) {
    //     toast.error("Invalid input!");
    //     return;
    //   }

      if (Number(chainId) !== Number(sepolia.id)) {
        toast.error("You're not connected to Sepolia");
        return;
      }

      const nftContract = new Contract(address, nftAbi, signer);

      try {
        const parsedRecipients = recipients
          .split(",")
          .map((addr) => addr.trim())
          .filter((addr) => addr.length > 0);

        const tx = await nftContract.batchMint(parsedRecipients);
        console.log(tx);
        const receipt = await tx.wait();
        console.log(receipt);

        if (receipt.status === 1) {
          toast.success("Mint Successful");
          return;
        }
        toast.error("Failed to Create NFT");
        return;
      } catch (err) {
        const decodedError = await errorDecoder.decode(err);
        toast.error(`Failed to Mint - ${decodedError.reason}`, {
          position: "top-center",
        });
        console.log(err);
        setRecipients("")
      } finally {
        setRecipients("")
        close()
      }
    },
    [isConnected, chainId]
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <Button
        onClick={open}
        className="text-white bg-dark p-3 rounded-lg w-[100%] focus:not-data-focus:outline-none cursor-pointer  data-hover:text-lightgray"
      >
        Batch Mint
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/70">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-dark p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] text-white "
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white text-[20px] text-center my-6"
              >
                Mint to addresses you want to give access
              </DialogTitle>

              <p className="mb-2">Add Wallet Addresses</p>
              <textarea
                name=""
                id=""
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder="Add address with a comma"
                className="border border-white/60 rounded-lg p-6 w-[100%]"
              />

              <div className="mt-4">
                <Button
                  className="border py-4 px-8 rounded-full font-[500] w-[100%]"
                  onClick={handleBatchMint}
                >
                  Mint
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BatchMint;
