async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with:", deployer.address);

  const MerkleTree = await ethers.getContractFactory("MerkleTree");
  const Verifier = await ethers.getContractFactory("Verifier");
  const YieldManager = await ethers.getContractFactory("YieldManager");
  const Mixer = await ethers.getContractFactory("Mixer");

  const tree = await MerkleTree.deploy();
  const verifier = await Verifier.deploy();
  const yieldManager = await YieldManager.deploy();

  const mixer = await Mixer.deploy(
    tree.target,
    verifier.target,
    yieldManager.target,
    0,
    [100, 200, 500],
    ["0x0000000000000000000000000000000000000004"]
  );

  console.log("MerkleTree:", tree.target);
  console.log("Verifier:", verifier.target);
  console.log("YieldManager:", yieldManager.target);
  console.log("Mixer:", mixer.target);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
