// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IndexTokenNew.sol";

contract PumpkinFactory {

    mapping(address => mapping(uint => address)) public addressToTokens;
    mapping(address => uint) tokenCount;

    //STATE CHANGES

    function createToken(address[] memory _tokens, uint[] memory  _percentages, string memory _name, string memory _symbol) public {

        //create new index token
        IndexTokenNew newToken = new IndexTokenNew(msg.sender, _tokens, _percentages, _name, _symbol);
        tokenCount[msg.sender]++;
        //map msg.sender's tokenCounter to new token to msg.sender
        addressToTokens[msg.sender][tokenCount[msg.sender]] = address(newToken);   
    }

    /// @notice mint/issue tokens in existing Index Token
    /// @param _tokenAddress = address of Index Token
    /// @param amount = amount of tokens to issue
    function issueToken(address _tokenAddress, uint amount) public {

    }

    /// @notice redeem token, burn index token, receive underlying assets
    /// @param _tokenAddress = address of Index Token
    /// @param amount = amount of Index Token to burn
    function redeemToken(address _tokenAddress, uint amount) public {

    }

    /// @notice rebalance, maybe give index of underlying asset to sell,receieve, and amount of token sold
    /// @param _tokenAddress = address of index token
    /// @param _underlyingSell = index of index token's underlying assets array to sell
    /// @param _underlyingBuy = index of index token's underlying assets array to buy
    /// @param _amtToSell = amount of underlying token to sell
    function rebalance(address _tokenAddress, uint _underlyingSell, uint _underlyingBuy, uint _amtToSell) public {

    }

    //GETTERS

    /// @notice returns the amount of index tokens a user has created
    /// @param _creator = address of user
    function getAmountOfIndexTokens(address _creator) public view returns (uint) {
        
    }

    /// @notice return array of tokens per address
    /// @param _creator = address of user
    function getAllTokenAddresses(address _creator) public view returns (address[] memory) {

    }

    /// @notice Same as above, but returns address of a single index token by entering owner address, and index of the token
    /// @param  _creator = address of user
    /// @param  index = index of user's created Index token
    function getSingleTokenAddress(address _creator, uint index) public view returns (address) {

    }

    /// @notice get array of all underlying assets of an index token
    /// @param _indexAddress = address of index token
    function getAllUnderlying(address _indexAddress) public view returns (uint[] memory) {
        
    }

    /// @notice Same as above, but returns address of a single underlying token of a index token
    /// @param _indexAddress = address of index token
    /// @param underlyingIndex = index of Index token's array of underlying assets
    function getSingleUnderlying(address _indexAddress, uint underlyingIndex) public view returns (address) {

    }

    /// @notice get array of all percentages for a token
    /// @param _indexAddress = address of index token
    function getAllPercentages(address _indexAddress) public view returns (uint[] memory) {
        
    }

    /// @notice same as above, but get percentage for a specific underlying asset
    /// @param _indexAddress = address of index token
    /// @param underlyingIndex = index of index token's underlying assets array
    function getSinglePercentage(address _indexAddress, uint underlyingIndex) public view returns (uint) {
        
    }

    /// @notice return array of all token balances in an index
    /// @param _indexAddress = address of index token
    function getAllAmounts(address _indexAddress) public view returns (uint[] memory) {

    }

    /// @notice get balance of a single token balance in an index
    /// @param _indexAddress = address of index token
    /// @param underlyingIndex = index of Index token's underlying assets array
    function getSingleAmount(address _indexAddress, uint underlyingIndex) public view returns (uint) {

    }
    
}
