const { expect } = require("chai");

describe("Mixer - Waiting Period Tests", function () {
  it("should reject withdrawal before waiting period", async function () {
    const [user] = await ethers.getSigners();

    const Mixer = await ethers.getContractFactory("Mixer");
    const mixer = await Mixer.deploy(
      "0x0000000000000000000000000000000000000001",
      "0x0000000000000000000000000000000000000002",
      "0x0000000000000000000000000000000000000003",
      1000, // waiting period
      [100],
      ["0x0000000000000000000000000000000000000004"]
    );

    const commitment = ethers.keccak256(ethers.toUtf8Bytes("commit"));

    // Fake deposit timestamp
    await mixer.depositTimestamp(commitment);

    const nullifier = ethers.keccak256(ethers.toUtf8Bytes("nullifier"));

    await expect(
      mixer.withdraw(
        "0x",
        nullifier,
        user.address,
        1,
        commitment,
        "0x0000000000000000000000000000000000000004",
        100
      )
    ).to.be.revertedWith("too early");
  });
});
