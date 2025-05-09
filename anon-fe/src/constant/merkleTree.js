import {
  ethers,
  keccak256,
  hashMessage,
  toUtf8Bytes,
  toBeArray,
  SigningKey,
} from "ethers";
import { MerkleTree } from "merkletreejs";
import { UltraHonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";
import nftgate from "./zk/target/nftgate.json" with { type: "json" };
// import { Buffer } from "node:buffer";
import SHA256 from "crypto-js/sha256.js";
// import { exit } from "node:process";

// Initialize test wallets and provider for demonstration purposes
// These are used to simulate NFT ownership and signing operations
const randomWallet = ethers.Wallet.createRandom();
const randomWallet2 = ethers.Wallet.createRandom();
const provider = new ethers.JsonRpcProvider("https://localhost:3000");
export const signer = randomWallet.connect(provider);
export const signer2 = randomWallet2.connect(provider);
console.log("signer address", signer.address);

// Define a list of NFT ownerships for the Merkle tree
// Each entry represents an owner's address
// In a real implementation, this would be populated with actual NFT ownership data
export const ownerships = [
  // Example: [owner_pubkey_x, tokenId]
  signer.address,
  ethers.ZeroAddress,
  signer.address,
  "0xe25327d529a722BB05ca7cc495528e2CB2Da520F",
  // Add more owners here
];

// Function to generate a Merkle proof for a specific user's address and token ID
// This proof can be used to verify ownership without revealing the entire tree
export function getProofForUser(address, owners) {
  // Create leaves by hashing each address in the ownership list
  const leaves = owners.map((address) =>
    // hashLeaf(address)
    SHA256(address)
  );
  // Hash the target address to create the leaf we want to prove
  let leaf = SHA256(address);
  // Construct the Merkle tree using SHA256 as the hash function
  const tree = new MerkleTree(leaves, SHA256);
  // Get the proof for our target leaf
  const proof = tree.getProof(leaf);
  // Determine if the proof path is left or right
  const path = proof[0].position;
  // Convert sibling data to hex string
  const siblings = proof[0].data.toString("hex");
  // Return the proof components needed for verification
  return {
    siblings: siblings, // Field elements (string)
    path: path === "left" ? false : true,
    root: tree.getRoot().toString("hex"), // Field as string
  };
}


// Function to verify a Merkle proof for a given address and token ID
export function verifyProof({ address, siblings, path, root }) {
  // Reconstruct the leaves from the ownership list
  const leaves = ownerships.map((address) =>
    // hashLeaf(address)
    SHA256(address)
  );
  // Hash the address we're verifying
  let leaf = SHA256(address);
  // Reconstruct the Merkle tree
  const tree = new MerkleTree(leaves, SHA256);
  const roots = tree.getRoot().toString("hex");

  // Get the proof for verification
  const proof = tree.getProof(leaf);
  // Verify if the proof is valid against the provided root
  return tree.verify(proof, leaf, root);
}

// Function to sign a message and extract the signer's public key components
export async function signMessageAndGetPubkey(signer, message, allNft) {
  // Sign the message using the signer's private key
  const signature = await signer.signMessage(message);

  // Extract the r and s components of the signature (first 64 bytes)
  const sigBytes = toBeArray(signature).slice(0, 64);
  // Hash the message to get the digest that was signed
  const digest = hashMessage(message);
  // Recover the public key from the signature and message digest
  const recovered = SigningKey.recoverPublicKey(digest, signature);

  // Split the recovered public key into x and y coordinates
  const pubkeyBytes = toBeArray("0x" + recovered.slice(4)); // Remove 0x04 prefix
  const owner_pubkey_x = pubkeyBytes.slice(0, 32);
  const owner_pubkey_y = pubkeyBytes.slice(32, 64);

  // Return all the necessary components for verification
  // return {
  //   signature: sigBytes,
  //   owner_pubkey_x: owner_pubkey_x,
  //   owner_pubkey_y: owner_pubkey_y,
  //   messageBytes: toBeArray(digest).slice(0, 32), // 32 bytes
  // };
  const publicInputs = {
    owner_pubkey_x: Array.from(owner_pubkey_x),  // 32 bytes
    owner_pubkey_y:  Array.from(owner_pubkey_y),  // 32 bytes
    message:  Array.from(toBeArray(digest).slice(0, 32)),           // 32 bytes
    signature: Array.from(sigBytes),            // 64 bytes
  }
  // try {
  //   const validProof = await generateProof(publicInputs)
  //   console.log(validProof)
  // } catch(e) {
  //   console.log("Invalid signer", e)
  // }

  try {
    const { siblings, path: paths, root } = getProofForUser(signer.address, allNft);   
    const isValid = verifyProof({
      address: signer.address,
      siblings: siblings,
      path: paths,
      root: root,
    });
    
    console.log("Is proof valid?", isValid);
    return isValid;
  } catch(e) {
    console.log("Invalid User", e, allNft)
  }
}

async function generateProof(publicInputs) {
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