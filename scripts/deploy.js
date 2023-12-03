const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("DeVo");

  await contract.waitForDeployment();

  console.log(`DeVo contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
