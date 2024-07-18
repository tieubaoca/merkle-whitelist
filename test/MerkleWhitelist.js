const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs');
const { expect } = require('chai');
const { StandardMerkleTree } = require('@openzeppelin/merkle-tree');

describe('MerkleWhitelist', function () {
  const amount = '1000000000000';
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    let values = [];

    process.env.WL.split(',').forEach((value) => {
      values.push([value.trim(), amount]);
    });
    const tree = StandardMerkleTree.of(values, ['address', 'uint256']);
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const merkleWhitelist = await ethers.deployContract('MerkleWhitelist', [
      tree.root,
    ]);
    let entry = tree.entries();

    return { merkleWhitelist, owner, otherAccount, tree };
  }
  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { merkleWhitelist, owner } = await deploy();
      expect(await merkleWhitelist.owner()).to.equal(owner.address);
    });

    it('Should return true', async function () {
      const { merkleWhitelist, owner, otherAccount, tree } = await deploy();

      for (const [i, v] of tree.entries()) {
        console.log(i, v);
        const proof = tree.getProof(i);
        expect(await merkleWhitelist.verify(v[0], amount, proof)).to.equal(
          true
        );
      }
    });
  });
});
