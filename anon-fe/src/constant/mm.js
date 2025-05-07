import { MerkleTree } from "merkletreejs";
import { ethers, keccak256 } from "ethers";
import {
  hashLeaf,
  getProofForUser,
  signMessageAndGetPubkey,
  signer,signer2,
  verifyProof,
} from "./merkleTree.js";
import { UltraHonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";
import clipboard from "clipboardy";
import nftgate from "../zk/target/nftgate.json" with { type: "json" };
import fs from 'fs';
import path from 'path';
import abi from "./abi.json"  with { type: "json" };
import { config } from "dotenv";
config();
//   get signer
const contractAddress = "0x41167b14C9Cc671dEeC3f2c2FA802445B7763Ab8"

// proof wonership
const { signature, owner_pubkey_x, owner_pubkey_y, messageBytes } =
  await signMessageAndGetPubkey(
    signer,
    "lets gooo " // or whatever message
  );
//  fake user
  const { signature:signature2, owner_pubkey_x:owner_pubkey_x2, owner_pubkey_y:owner_pubkey_y2,messageBytes: messageBytes2 } =
  await signMessageAndGetPubkey(
    signer2,
    "Prove ownership" // or whatever message
  );
  console.log("signers",signer.address, signer2.address);

// console.log({ signature, owner_pubkey_x, owner_pubkey_y, messageBytes });

const { siblings, path: paths, root } = getProofForUser(signer.address, 1);
// fake user
// const { siblings2, path: paths2, root:root2 } = getProofForUser(signer2.address, 1);

console.log("proof", { siblings, paths, root });

const isValid = verifyProof({
  address: signer.address,
  tokenId: 1,
  siblings: siblings,
  path: paths,
  root: root,
});

console.log("Is proof valid?", isValid);

//   bb write_vk -b ./target/<noir_artifact_name>.json -o ./target --oracle_hash keccak

// # Generate the Solidity verifier from the vkey
// bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol

// Prepare publicInputs
const publicInputs = {
  owner_pubkey_x: Array.from(owner_pubkey_x),  // 32 bytes
  owner_pubkey_y:  Array.from(owner_pubkey_y),  // 32 bytes
  message:  Array.from(messageBytes),           // 32 bytes
  signature: Array.from(signature),            // 64 bytes
}

// uin


// console.log("publicInputs",[ publicInputs])

// async function deployVerifier() {
//   // Read the verifier contract
// //   const verifierPath = path.join(path.dirname(process.cwd()), 'zk', 'target', 'Verifier.sol');
// //   const verifierSource = fs.readFileSync(verifierPath, 'utf8');
  
//   // Connect to local network
//   const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");
//   const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
//   // Compile and deploy
  

//   const contract = new ethers.Contract(contractAddress, abi, signer);

  
// //   console.log("Deploying verifier...");
// //   const verifier = await factory.deploy();
// //   await verifier.waitForDeployment();
  
// //   const verifierAddress = await verifier.getAddress();
// //   console.log("Verifier deployed at:", verifierAddress);
  
//   return contract;
// }

async function generateProof() {
  const noir = new Noir(nftgate);
  const backend = new UltraHonkBackend(nftgate.bytecode);
  console.log("logs", "Generating witness... ⏳");
  const { witness } = await noir.execute({ input: publicInputs });
  console.log("logs", "Generated witness... ✅");
  console.log("logs", "Generating proof... ⏳");
  const proof = await backend.generateProof(witness);
  console.log("logs", "Generated proof... ✅",);
  console.log('logs', 'Verifying proof... ⌛');
const isValid = await backend.verifyProof(proof);
console.log("logs", `Proof is ${isValid ? "valid" : "invalid"}... ✅`);
  // Deploy verifier and verify proof
//   const verifier = await deployVerifier();
//   const publicInputsBytes32 = [
//     ethers.hexlify(owner_pubkey_x),
//     ethers.hexlify(owner_pubkey_y),
//     ethers.hexlify(messageBytes),
//     ethers.hexlify(signature.slice(0, 32)),
//     ethers.hexlify(signature.slice(32, 64))
//   ];
//   const publicInputsBytes32 = [publicInputs].map(input => ethers.keccak256(new Uint8Array(input)));
  
//   console.log("Verifying proof...",proof.proof.length);
//   const isValid = await verifier.verify(proof.proof, publicInputsBytes32);
//   console.log("Proof verified:", isValid);
  
  return { proof, isValid };
}

generateProof();
const isFakeUser = verifyProof({
    address: signer2.address,
    tokenId: 3,
    siblings: siblings,
    path: paths,
    root: root,
  });
  console.log("fake user proof valid?", isFakeUser);
// const result = await verifierContract.verify(proof, publicInputs);
// console.log("Verified:", result);


//the dapp is that people with the same nft has a general chatroom and remain anonymous....
// user comes to the page and verifies wallet ..
