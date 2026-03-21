// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GamifiedFinances
 * @dev Manages player progression and coin rewards on Avalanche.
 */
contract GamifiedFinances is Ownable {
    struct Player {
        string nickname;
        uint256 level;
        uint256 coins;
        bool exists;
    }

    // Mapping from wallet address to Player data
    mapping(address => Player) public players;
    
    // Mapping from level number to IPFS CID
    mapping(uint256 => string) public levelCIDs;

    // List of all registered player addresses
    address[] public playerAddresses;

    // Events
    event PlayerRegistered(address indexed player, string nickname);
    event LevelCompleted(address indexed player, uint256 newLevel, uint256 coinsEarned);
    event LevelCIDUpdated(uint256 indexed level, string cid);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Sets the IPFS CID for a specific level.
     * Only the owner can call this.
     */
    function setLevelCID(uint256 _level, string memory _cid) public onlyOwner {
        levelCIDs[_level] = _cid;
        emit LevelCIDUpdated(_level, _cid);
    }

    /**
     * @dev Registers a new player with a nickname.
     */
    function register(string memory _nickname) public {
        require(!players[msg.sender].exists, "Player already registered");
        require(bytes(_nickname).length > 0, "Nickname cannot be empty");

        players[msg.sender] = Player({
            nickname: _nickname,
            level: 1,
            coins: 0,
            exists: true
        });

        playerAddresses.push(msg.sender);
        emit PlayerRegistered(msg.sender, _nickname);
    }

    /**
     * @dev Updates player level and awards coins.
     */
    function completeLevel(uint256 _nextLevel, uint256 _reward) public {
        require(players[msg.sender].exists, "Player not registered");
        require(_nextLevel > players[msg.sender].level, "New level must be higher than current");
        
        players[msg.sender].level = _nextLevel;
        players[msg.sender].coins += _reward;

        emit LevelCompleted(msg.sender, _nextLevel, _reward);
    }

    function getPlayerCount() public view returns (uint256) {
        return playerAddresses.length;
    }

    function getAllPlayers() public view returns (Player[] memory) {
        uint256 count = playerAddresses.length;
        Player[] memory allPlayers = new Player[](count);
        for (uint256 i = 0; i < count; i++) {
            allPlayers[i] = players[playerAddresses[i]];
        }
        return allPlayers;
    }
}
