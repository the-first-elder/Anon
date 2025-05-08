import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { sepolia } from "@reown/appkit/networks";

const projectId = import.meta.env.VITE_PROJECTID;

const networks = [sepolia];

const metadata = {
  name: "Anon",
  description: "My Website description",
  url: "http://localhost:5173/", 
  icons: ["https://avatars.mywebsite.com/"],
};


createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true, 
  },
});