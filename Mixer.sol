// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./MerkleTree.sol";
import "./Verifier.sol";
import "./YieldManager.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Mixer is ReentrancyGuard {
    MerkleTree public merkleTree;
    Verifier public verifier;
    YieldManager public yieldManager;

    uint256 public waitingPeriod; // seconds
    uint256[] public fixedDenominations;

    mapping(bytes32 => bool) public usedNullifiers;
    mapping(bytes32 => uint256) public depositTimestamp;
    mapping(address => bool) public allowedAssets;

    event Deposit(bytes32 commitment);
    event Withdrawal(bytes32 nullifier);

    constructor(
        address _tree,
        address _verifier,
        address _yieldManager,
        uint256 _waitingPeriod,
        uint256[] memory _denoms,
        address[] memory _assets
    ) {
        merkleTree = MerkleTree(_tree);
        verifier = Verifier(_verifier);
        yieldManager = YieldManager(_yieldManager);
        waitingPeriod = _waitingPeriod;

        fixedDenominations = _denoms;
        for (uint256 i = 0; i < _assets.length; i++) {
            allowedAssets[_assets[i]] = true;
        }
    }

    function deposit(address asset, uint256 amount, bytes32 commitment)
        external
        nonReentrant
    {
        require(allowedAssets[asset], "asset not allowed");
        require(_isFixedDenomination(amount), "invalid denomination");

        IERC20(asset).transferFrom(msg.sender, address(this), amount);

        merkleTree.insertLeaf(commitment);
        depositTimestamp[commitment] = block.timestamp;

        yieldManager.depositToAave(asset, amount);

        emit Deposit(commitment);
    }

    function withdraw(
        bytes calldata proof,
        bytes32 nullifier,
        address recipient,
        uint256 destChainId,
        bytes32 commitment,
        address asset,
        uint256 amount
    ) external nonReentrant {
        require(!usedNullifiers[nullifier], "nullifier used");
        require(
            block.timestamp >= depositTimestamp[commitment] + waitingPeriod,
            "too early"
        );

        require(verifier.verifyProof(proof), "invalid proof");

        usedNullifiers[nullifier] = true;

        uint256 redeemed = yieldManager.redeemFromAave(asset, amount);

        _bridgeToChain(recipient, redeemed, destChainId);

        emit Withdrawal(nullifier);
    }

    function _bridgeToChain(
        address recipient,
        uint256 amount,
        uint256 destChainId
    ) internal {
        // Connext integration stub – call router here in a real build
        recipient;
        amount;
        destChainId;
    }

    function _isFixedDenomination(uint256 amt) internal view returns (bool) {
        for (uint256 i = 0; i < fixedDenominations.length; i++) {
            if (fixedDenominations[i] == amt) return true;
        }
        return false;
    }
}
