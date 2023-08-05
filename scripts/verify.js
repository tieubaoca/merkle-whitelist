// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, upgrades } = require("hardhat");
const { utils } = require("ethers");

async function main() {
  const Wl = await ethers.getContractFactory("MerkleWhitelist");
  const wl = Wl.attach(process.env.WL_ADDRESS);

  const result = await wl.verify("0x5080247618F70A372b167B46DC41deD5238030fe", [
    "0x2e3f8f7a4d1ad6f25f342002f0acd5be83e663db602d2e8f24f78dc3d2b0c7f7",
    "0x0ce68373b7b5e68df7bee7c1968d622f84432fa49c9a23d0fe30247a7b418da4",
  ]);
  console.log("result", result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
