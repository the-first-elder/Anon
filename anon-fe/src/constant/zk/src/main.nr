use dep::std::{ ecdsa_secp256k1::verify_signature};


// Custom Merkle Proof struct
// struct MerkleProof {
//     siblings: str<64>,
//     path: bool,
//     root: Field,
// }

// Input struct
struct VERIFY_USER {
    owner_pubkey_x: [u8; 32],
    owner_pubkey_y: [u8; 32],
    // token_id: Field,
    message: [u8; 32], // Fixed size message
    signature: [u8; 64], // [r, s]
    // proof: MerkleProof,
}

fn main(input: VERIFY_USER) -> pub bool {
    // 1. Verify signature
    let is_valid = verify_signature(
        input.owner_pubkey_x,
        input.owner_pubkey_y,
        input.signature,
        input.message,
    );
    assert(is_valid);
    is_valid
}
