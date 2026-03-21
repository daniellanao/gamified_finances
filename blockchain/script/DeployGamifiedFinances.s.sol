// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/GamifiedFinances.sol";

contract DeployGamifiedFinances is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        GamifiedFinances gamifiedFinances = new GamifiedFinances();

        vm.stopBroadcast();

        console.log("GamifiedFinances deployed to:", address(gamifiedFinances));
    }
}
