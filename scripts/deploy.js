// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
 

  const Election = await hre.ethers.getContractFactory("Election"); // passing contract name.
  const createElection = await Election.deploy();
  
  await createElection.deployed();

  console.log("Lock with 1 ETH deployed to:", createElection.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.trace("bad");
  console.error(error);
  process.exitCode = 1;
});
