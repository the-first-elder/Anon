// ignore
// import { MerkleTree } from "merkletreejs";
// import { ethers, keccak256 } from "ethers";
// import {
//   hashLeaf,
//   getProofForUser,
//   signMessageAndGetPubkey,
//   signer,signer2,
//   verifyProof,
// } from "./merkleTree.js";
// import { UltraHonkBackend } from "@aztec/bb.js";
// import { Noir } from "@noir-lang/noir_js";
// import clipboard from "clipboardy";
// import nftgate from "../zk/target/nftgate.json" with { type: "json" };
// //   get signer
// // proof wonership
// const { signature, owner_pubkey_x, owner_pubkey_y, messageBytes } =
//   await signMessageAndGetPubkey(
//     signer,
//     "Prove ownership" // or whatever message
//   );

//   const { signature2, owner_pubkey_x2, owner_pubkey_y2, messageBytes2 } =
//   await signMessageAndGetPubkey(
//     signer2,
//     "Prove ownership" // or whatever message
//   );

// console.log({ signature, owner_pubkey_x, owner_pubkey_y, messageBytes });

// const { siblings, path, root } = getProofForUser(signer.address, 1);

// console.log("proof", { siblings, path, root });

// const isValid = verifyProof({
//   owner_pubkey_x: owner_pubkey_x,
//   tokenId: 1,
//   siblings: siblings,
//   path: path,
//   root: root,
// });

// console.log("Is proof valid?", isValid);

// //   bb write_vk -b ./target/<noir_artifact_name>.json -o ./target --oracle_hash keccak

// // # Generate the Solidity verifier from the vkey
// // bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol

// // Prepare publicInputs
// const publicInputs = {
//   owner_pubkey_x: Array.from(owner_pubkey_x),  // 32 bytes
//   owner_pubkey_y:  Array.from(owner_pubkey_y),  // 32 bytes
//   message:  Array.from(messageBytes),           // 32 bytes
//   signature: Array.from(signature),            // 64 bytes
// }
// // uin

// const fakepublicInputs ={
//   owner_pubkey_x: Array.from(owner_pubkey_x2),  // 32 bytes
//   owner_pubkey_y:  Array.from(owner_pubkey_y2),  // 32 bytes
//   message:  Array.from(messageBytes2),           // 32 bytes
//   signature: Array.from(signature2), 
// }


// console.log("publicInputs",[publicInputs])

// async function generateProof() {
//   const noir =new Noir(nftgate);
//   const backend = new UltraHonkBackend(nftgate.bytecode);
//   console.log("logs", "Generating witness... ⏳");
//   const { witness } = await noir.execute( {input:publicInputs} );
//   console.log("logs", "Generated witness... ✅");
//   console.log("logs", "Generating proof... ⏳");
//   const proof = await backend.generateProof(witness);
//   console.log("logs", "Generated proof... ✅");
//   console.log("results", proof.proof);
//   const proofBytes =  ethers.hexlify(proof.proof);
//   const publicInputsBytes32 = [publicInputs].map(input => ethers.keccak256(new Uint8Array(input)));
//   clipboard.writeSync(JSON.stringify(proofBytes));
//   console.log("Proof copied to clipboard!", publicInputsBytes32 );
  
//   // Also save to a file for backup
// }

// generateProof();

// // const result = await verifierContract.verify(proof, publicInputs);
// // console.log("Verified:", result);


// //the dapp is that people with the same nft has a general chatroom and remain anonymous....
// // user comes to the page and verifies wallet ..
