// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IMerkleWhitelist {
    function verify(
        address account,
        bytes32[] calldata merkleProof
    ) external view returns (bool);
}
