import React, { useState, useEffect } from "react";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

const ownerships = [
  "0xe25327d529a722BB05ca7cc495528e2CB2Da520F"
];

const MerkleDemo = ({ userAddress }) => {
  const [proof, setProof] = useState([]);
  const [root, setRoot] = useState("");

  useEffect(() => {
    const generateProof = () => {
      const leaves = ownerships.map((addr) =>
        keccak256(addr.toLowerCase())
      );
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

      const leaf = keccak256(userAddress.toLowerCase());
      const proofHex = tree.getProof(leaf).map((x) => `0x${x.data.toString("hex")}`);
      const rootHex = `0x${tree.getRoot().toString("hex")}`;

      setProof(proofHex);
      setRoot(rootHex);
    };

    if (userAddress) generateProof();
  }, [userAddress]);

  return (
    <div>
      <h3>Merkle Root:</h3>
      <code>{root}</code>
      <h3>Proof:</h3>
      <pre>{JSON.stringify(proof, null, 2)}</pre>
    </div>
  );
};

export default MerkleDemo;
