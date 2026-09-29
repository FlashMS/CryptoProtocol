// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MerkleTree {
    bytes32 public root;
    uint256 public index;

    mapping(uint256 => bytes32) public leaves;

    function insertLeaf(bytes32 leaf) external {
        leaves[index] = leaf;
        index += 1;

        // Minimal deterministic root update
        root = keccak256(abi.encodePacked(root, leaf));
    }
}
