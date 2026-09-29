import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../hooks/useWallet";

export default function WithdrawalView() {
  const { provider, address, connect } = useWallet();
  const [destChain, setDestChain] = useState<number>(1);
  const [recipient, setRecipient] = useState<string>("");
  const [commitment, setCommitment] = useState<string>("");

  async function handleWithdraw() {
    if (!provider) return;

    const signer = await provider.getSigner();
    const mixer = new ethers.Contract(
      "0xMixerAddress",
      [
        "function withdraw(bytes proof,bytes32 nullifier,address recipient,uint256 destChainId,bytes32 commitment,address asset,uint256 amount)"
      ],
      signer
    );

    const nullifier = ethers.keccak256(
      ethers.toUtf8Bytes(commitment + "nullifier")
    );

    await mixer.withdraw(
      "0x",
      nullifier,
      recipient,
      destChain,
      commitment,
      "0xAssetAddress",
      100
    );
  }

  return (
    <div>
      <h2>Withdraw</h2>

      {!address && <button onClick={connect}>Connect Wallet</button>}

      <input
        placeholder="Commitment hash"
        onChange={(e) => setCommitment(e.target.value)}
      />

      <input
        placeholder="Recipient address"
        onChange={(e) => setRecipient(e.target.value)}
      />

      <select onChange={(e) => setDestChain(Number(e.target.value))}>
        <option value={1}>Ethereum</option>
        <option value={10}>Optimism</option>
        <option value={42161}>Arbitrum</option>
      </select>

      <button onClick={handleWithdraw}>Submit Withdrawal</button>
    </div>
  );
}
