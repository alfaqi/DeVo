const { expect } = require("chai");

describe("DeVo", function () {
  let DeVo;
  let deVo;
  let owner;
  let voter1;
  let voter2;

  beforeEach(async function () {
    // Deploy the DeVo contract
    DeVo = await ethers.getContractFactory("DeVo");
    [owner, voter1, voter2] = await ethers.getSigners();
    deVo = await DeVo.deploy();
    // await deVo.deployed();
  });

  it("Should allow the owner to register a voter", async function () {
    // Register voter1
    await deVo.connect(owner).registerVoter(voter1.address);

    // Check if voter1 is registered
    const isRegistered = await deVo.getVoter(voter1.address);
    expect(isRegistered).to.equal(true);
  });

  it("Should not allow non-owner to register a voter", async function () {
    // Try to register voter1 from a non-owner account
    await expect(
      deVo.connect(voter1).registerVoter(voter1.address)
    ).to.be.revertedWith("Only the contract owner can register voters.");
  });

  it("Should allow a registered voter to cast a vote", async function () {
    // Register voter1
    await deVo.connect(owner).registerVoter(voter1.address);

    // Voter1 casts a vote
    await deVo.connect(voter1).vote();

    // Check the vote count
    const voteCount = await deVo.getVoteCount();
    expect(voteCount).to.equal(1);
  });

  it("Should not allow an unregistered voter to cast a vote", async function () {
    // Try to vote from an unregistered account
    await expect(deVo.connect(voter1).vote()).to.be.revertedWith(
      "Only registered voters can interact with this contract."
    );
  });
});
