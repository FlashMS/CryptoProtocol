const { expect } = require("chai");

describe("Mixer - Happy Path", function () {
  it("should allow a valid withdrawal", async function () {
    const [user] = await ethers.getSigners();

    const Mixer = await ethers.getContractFactory("Mixer");
    const mixer = await Mixer.deploy(
      "0x0000000000000000000000000000000000000001",
      "0x0000000000000000000000000000000000000002",
      "0x0000000000000000000000000000000000000003",
      0,
      [100],
      ["0x0000000000000000000000000000000000000004"]
    );

    const commitment = ethers.keccak256(ethers.toUtf8Bytes("commit"));
    const nullifier = ethers.keccak256(ethers.toUtf8Bytes("nullifier"));

    await mixer.depositTimestamp(commitment);

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
    ).to.emit(mixer, "Withdrawal");
  });
});
