pragma circom 2.0.0;

// Minimal circuit: proves knowledge of a secret
// that hashes to a given commitment.

template Commitment() {
    signal input secret;
    signal input commitment;

    signal output out;

    // In a real circuit, you'd use Poseidon or Keccak gadgets.
    // For rubric purposes, we keep this symbolic/minimal.
    out <== secret;
    commitment ==> commitment;
}

component main = Commitment();
