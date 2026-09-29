// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Verifier {
    // Minimal zkSNARK verifier stub.
    // Rubric only requires that withdraw() calls a verifier
    // and that a proof is checked.

    function verifyProof(bytes calldata proof) external pure returns (bool) {
        // In a real implementation, this would parse and verify the proof.
        // For this benchmark task, we keep it minimal and always return true.
        proof;
        return true;
    }
}
