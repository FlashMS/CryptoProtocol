import { useState } from "react";
import { ethers } from "ethers";
import { FIXED_DENOMS } from "../utils/fixedDenominations";
import { useWallet } from "../hooks/useWallet";

export default function DepositView() {
  const { provider, address, connect } = useWallet();
  const [amount, setAmount] = useState<number>(FIXED_DENOMS[0]);
  const [commitment, setCommitment] = useState<string>("");

  async function handleDeposit() {
    if (!provider) return;

    const signer = await provider.getSigner();
    const mixer = new ethers.Contract(
      "0xMixerAddress",
      ["function deposit(address asset,uint256 amount,bytes32 commitment)"],
      signer
    );

    const commitmentHash = ethers.keccak256(
      ethers.toUtf8Bytes(Date.now().toString() + address)
    );

    setCommitment(commitmentHash);

    await mixer.deposit("0xAssetAddress", amount, commitmentHash);
  }

  return (
    <div>
      <h2>Deposit</h2>

      {!address && <button onClick={connect}>Connect Wallet</button>}

      <select onChange={(e) => setAmount(Number(e.target.value))}>
        {FIXED_DENOMS.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <button onClick={handleDeposit}>Confirm Deposit</button>

      {commitment && <p>Commitment: {commitment}</p>}
    </div>
  );
}
