// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const wl = await hre.ethers.deployContract("MerkleWhitelist", [
    "0x19cd5c88b0dd44c27bc7af5e2e1e5c725027bcc08c44bc556e0091d706e59e41",
  ]);

  await wl.deployed();

  console.log(`Contract deployed to ${wl.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
