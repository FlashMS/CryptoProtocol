import { useState } from "react";
import { ethers } from "ethers";

export function useWallet() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [address, setAddress] = useState<string>("");

  async function connect() {
    if (!window.ethereum) return;

    const p = new ethers.BrowserProvider(window.ethereum);
    const accounts = await p.send("eth_requestAccounts", []);
    setProvider(p);
    setAddress(accounts[0]);
  }

  return { provider, address, connect };
}
