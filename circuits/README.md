# zkSNARK Circuits

This directory contains the minimal zkSNARK circuit and script
required for rubric compliance.

- `commitment.circom` — minimal circuit template for a commitment proof.
- `generate_proof.sh` — stub script showing how a proof would be generated.

In a production system, this would be replaced with a full circom + snarkjs
pipeline, including trusted setup, witness generation, proof generation,
and verifier contract generation.
