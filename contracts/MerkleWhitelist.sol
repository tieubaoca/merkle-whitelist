// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IMerkleWhitelist.sol";

contract MerkleWhitelist is IMerkleWhitelist, Ownable {
    bytes32 private merkleRoot;

    constructor(bytes32 _merkleRoot) {
        merkleRoot = _merkleRoot;
    }

    function verify(
        address account,
        bytes32[] calldata merkleProof
    ) external view override returns (bool) {
        return _verify(account, merkleProof);
    }

    function _verify(
        address account,
        bytes32[] calldata merkleProof
    ) internal view returns (bool) {
        bytes32 node = keccak256(bytes.concat(keccak256(abi.encode(account))));
        return MerkleProof.verify(merkleProof, merkleRoot, node);
    }

    function updateMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }
}
