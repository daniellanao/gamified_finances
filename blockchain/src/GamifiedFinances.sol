// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title GamifiedFinances
 * @dev Manages player progression and coin rewards on Avalanche.
 */
contract GamifiedFinances {
    struct Player {
        string nickname;
        uint256 level;
        uint256 coins;
        bool exists;
    }

    // Mapping from wallet address to Player data
    mapping(address => Player) public players;
    
    // List of all registered player addresses (to help with leaderboard fetching)
    address[] public playerAddresses;

    // Events for frontend tracking
    event PlayerRegistered(address indexed player, string nickname);
    event LevelCompleted(address indexed player, uint256 newLevel, uint256 coinsEarned);

    /**
     * @dev Registers a new player with a nickname.
     * Starts them at Level 1 with 0 coins.
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
     * In a production app, you might want to sign these rewards with a backend key 
     * to prevent users from cheating and calling this directly with max values.
     */
    function completeLevel(uint256 _nextLevel, uint256 _reward) public {
        require(players[msg.sender].exists, "Player not registered");
        require(_nextLevel > players[msg.sender].level, "New level must be higher than current");
        
        players[msg.sender].level = _nextLevel;
        players[msg.sender].coins += _reward;

        emit LevelCompleted(msg.sender, _nextLevel, _reward);
    }

    /**
     * @dev Simple helper to get total number of players.
     */
    function getPlayerCount() public view returns (uint256) {
        return playerAddresses.length;
    }

    /**
     * @dev Returns all player data for a simple leaderboard.
     * Note: For many players, an off-chain indexer (like The Graph or Envio) is better.
     */
    function getAllPlayers() public view returns (Player[] memory) {
        uint256 count = playerAddresses.length;
        Player[] memory allPlayers = new Player[](count);
        
        for (uint256 i = 0; i < count; i++) {
            allPlayers[i] = players[playerAddresses[i]];
        }
        
        return allPlayers;
    }
}
