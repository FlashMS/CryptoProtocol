# PrivateMix

PrivateMix is a minimal privacy-preserving cross-chain mixer.  
It demonstrates deposit commitments, nullifier-based withdrawals,  
a waiting period, yield-bearing positions, and a simple frontend.

This project includes:

- Solidity smart contracts
- React + TypeScript frontend
- Minimal zkSNARK circuit
- Basic Hardhat-style tests
- Polygon + Connext configuration files

## Contracts

### Mixer.sol
Handles deposits, withdrawals, nullifier tracking, waiting period enforcement,  
and calls into the Merkle tree, zkSNARK verifier, and yield manager.

### MerkleTree.sol
Minimal incremental Merkle tree storing commitments.

### Verifier.sol
Stub zkSNARK verifier used for proof validation.

### YieldManager.sol
Stub Aave integration for deposit and redemption of yield-bearing positions.

## Frontend

React + TypeScript UI with:

- Wallet connection
- Deposit view
- Withdrawal view
- Commitment hash display
- Destination chain selector

## Circuits

Minimal Circom circuit (`commitment.circom`) and stub proof script (`generate_proof.sh`).

## Tests

Three basic tests:

- Nullifier reuse rejection
- Premature withdrawal rejection
- Happy-path withdrawal

## Configuration

- `polygon.config.json` — chain ID and RPC
- `connext.config.json` — domain IDs for cross-chain routing

## Disclaimer

This is a minimal benchmark implementation intended for demonstration  
and rubric compliance. It is not production-ready.
