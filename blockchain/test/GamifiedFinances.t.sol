// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/GamifiedFinances.sol";

contract GamifiedFinancesTest is Test {
    GamifiedFinances public gamifiedFinances;
    address public player1 = address(0x123);
    address public player2 = address(0x456);

    function setUp() public {
        gamifiedFinances = new GamifiedFinances();
    }

    function testRegister() public {
        vm.prank(player1);
        gamifiedFinances.register("ITZIMI");

        (string memory nickname, uint256 level, uint256 coins, bool exists) = gamifiedFinances.players(player1);
        
        assertEq(nickname, "ITZIMI");
        assertEq(level, 1);
        assertEq(coins, 0);
        assertTrue(exists);
        assertEq(gamifiedFinances.getPlayerCount(), 1);
    }

    function testCompleteLevel() public {
        vm.prank(player1);
        gamifiedFinances.register("ITZIMI");

        vm.prank(player1);
        gamifiedFinances.completeLevel(2, 50);

        (, uint256 level, uint256 coins, ) = gamifiedFinances.players(player1);
        assertEq(level, 2);
        assertEq(coins, 50);
    }

    function test_RevertWhen_RegisteringTwice() public {
        vm.prank(player1);
        gamifiedFinances.register("ITZIMI");

        vm.expectRevert("Player already registered");
        vm.prank(player1);
        gamifiedFinances.register("ITZIMI_RETRY");
    }

    function test_GetAllPlayers() public {
        vm.prank(player1);
        gamifiedFinances.register("P1");

        vm.prank(player2);
        gamifiedFinances.register("P2");

        GamifiedFinances.Player[] memory all = gamifiedFinances.getAllPlayers();
        assertEq(all.length, 2);
        assertEq(all[0].nickname, "P1");
        assertEq(all[1].nickname, "P2");
    }
}
