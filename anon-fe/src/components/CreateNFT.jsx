import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import usePinataUpload from "../hooks/usePinataUpload";
import useCreateNft from "../hooks/useCreateNft";
import { useAppKitAccount } from "@reown/appkit/react";

const CreateNFT = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { address } = useAppKitAccount()
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");
  const [error, setError] = useState("");

  const { uploadToPinata, isUploading } = usePinataUpload();
  const handleCreate = useCreateNft();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleNftCreation = async () => {
    await handleCreate(nftName, nftSymbol, imageUrl, address);
    setNftName("");
    setNftSymbol("");
    setImageUrl("");
    close()
  };

  const changeHandler = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        setError("File size exceeds 1MB. Please choose a smaller file.");
        setSelectedFile(null);
      } else {
        setError("");
        setSelectedFile(file);
        try {
          const uploadedUrl = await uploadToPinata(file);
          setImageUrl(uploadedUrl);
        } catch (error) {
          console.error("File upload failed:", error);
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Button
        onClick={open}
        className="text-white bg-dark p-3 rounded-lg w-[100%] lg:w-[50%] md:w-[50%] focus:not-data-focus:outline-none cursor-pointer  data-hover:text-lightgray"
      >
        Create NFT
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
                className="text-base/7 font-medium text-white text-[24px] text-center my-6"
              >
                Create an NFT
              </DialogTitle>
           
              <p className="mb-2">Image URL (Below 1mb)</p>
              {imageUrl ? (
                <input
                  type="text"
                  value={imageUrl}
                  placeholder="Organization Image"
                  className="border mb-4 border-white/20 w-[100%] rounded-md hover:outline-0 p-3"
                  readOnly
                />
              ) : (
                <div className="relative mb-4 w-[100%]">
                  <input
                    type="file"
                    required
                    onChange={changeHandler}
                    className={`border mb-4 bg-transparent border-white/20 bg-transparent w-[100%] rounded-md hover:outline-0 p-3 ${
                      isUploading ? "cursor-not-allowed" : ""
                    }`}
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                      <div className="loader"></div>
                    </div>
                  )}
                </div>
              )}
                 <p className="mb-2">NFT name</p>
              <input
                type="text"
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
                placeholder="Enter NFT name"
                className="border mb-4 border-white/20 w-[100%] rounded-md hover:outline-0 p-3"
              />
              <p className="mb-2">NFT symbol</p>
              <input
                type="text"
                value={nftSymbol}
                onChange={(e) => setNftSymbol(e.target.value)}
                placeholder="Enter NFTsymbol Eg. APE"
                className="border mb-4 border-white/20 w-[100%] rounded-md hover:outline-0 p-3"
              />
              <input
                type="text"
                value={address}
                readOnly
                placeholder="Enter walletaddress of owner"
                className="border mb-4 border-white/20 w-[100%] rounded-md hover:outline-0 p-3 hidden"
              />

              <div className="mt-4">
                <Button
                  className="border py-4 px-8 rounded-full font-[500] w-[100%]"
                  onClick={handleNftCreation}
                >
                  Create NFT
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateNFT;
