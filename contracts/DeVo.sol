// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title DeVo
 * @dev A smart contract for a simple voting system.
 */
contract DeVo {
    // State variables
    address private owner;
    uint256 private voteCount;

    // Mapping to track registered voters
    mapping(address => bool) private voters;

    /**
     * @dev Contract constructor.
     * Sets the contract owner and initializes vote count to 0.
     */
    constructor() {
        owner = msg.sender;
        voteCount = 0;
    }

    /**
     * @dev Registers a new voter.
     * @param _voter The address of the voter to be registered.
     * @notice Only the contract owner can register voters.
     */
    function registerVoter(address _voter) public {
        require(
            msg.sender == owner,
            "Only the contract owner can register voters."
        );
        voters[_voter] = true;
    }

    /**
     * @dev Modifier to check that only registered voters can interact with the contract.
     */
    modifier onlyVoter() {
        require(
            voters[msg.sender] == true,
            "Only registered voters can interact with this contract."
        );
        _;
    }

    /**
     * @dev Allows registered voters to cast their votes.
     * @notice This function represents the voting action.
     */
    function vote() public onlyVoter {
        // Add your voting logic here
        voteCount++;
    }

    /**
     * @dev Retrieves the current vote count.
     * @return The current vote count.
     */
    function getVoteCount() public view returns (uint256) {
        return voteCount;
    }

    function getVoter(address _voter) public view returns (bool) {
        return voters[_voter];
    }
}
