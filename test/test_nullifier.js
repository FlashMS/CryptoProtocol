const { expect } = require("chai");

describe("Mixer - Nullifier Tests", function () {
  it("should reject reuse of a nullifier", async function () {
    const Mixer = await ethers.getContractFactory("Mixer");
    const mixer = await Mixer.deploy(
      "0x0000000000000000000000000000000000000001",
      "0x0000000000000000000000000000000000000002",
      "0x0000000000000000000000000000000000000003",
      0,
      [100],
      ["0x0000000000000000000000000000000000000004"]
    );

    const nullifier = ethers.keccak256(ethers.toUtf8Bytes("testnullifier"));

    // First use should succeed (stub)
    await mixer.withdraw(
      "0x",
      nullifier,
      "0x0000000000000000000000000000000000000005",
      1,
      ethers.keccak256(ethers.toUtf8Bytes("commit")),
      "0x0000000000000000000000000000000000000004",
      100
    );

    // Second use should fail
    await expect(
      mixer.withdraw(
        "0x",
        nullifier,
        "0x0000000000000000000000000000000000000005",
        1,
        ethers.keccak256(ethers.toUtf8Bytes("commit")),
        "0x0000000000000000000000000000000000000004",
        100
      )
    ).to.be.revertedWith("nullifier used");
  });
});
