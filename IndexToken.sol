// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";

contract IndexToken is IERC20 {

    uint public totalSupply;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    string public name;
    string public symbol;
    uint8 public decimals = 18;

    //Index token constants
    address immutable owner;
    address[] public holders;
    address[] public tokens;
    uint[] public percentages;


    constructor(address _owner, address[] memory _tokens, uint[] memory  _percentages, string memory _name, string memory _symbol) {
        owner = _owner;
        tokens = _tokens;
        percentages = _percentages;
        name = _name;
        symbol = _symbol;


        //check percentages
        uint numOfTokens = _percentages.length;
        uint percentageCounter;
        for(uint i; i < numOfTokens; i++) {
            percentageCounter += _percentages[i];
        }
        require(percentageCounter <= 100, "percentages do not add up to 100");
    }

    //Index token mint
    function mint(uint amount) public {
        //get number of tokens using length
        uint numOfTokens = tokens.length;
    
        //loop through all tokens
        for(uint i; i < numOfTokens; i++){
            address _token = tokens[i];
            uint _percentage = percentages[i];
            uint transferAmount = (amount * _percentage) / 100;
            bool success = IERC20(_token).transferFrom(msg.sender,address(this), transferAmount);
            require(success, "transfer failed");
        }
        //add to holders array
        holders.push(msg.sender);

        _mint(amount);
    }

    function redeem(uint amount) public {
        //get number of tokens using length
        require(amount <= balanceOf[msg.sender] );
        
        uint numOfTokens = tokens.length;
        address[] memory _tokens = tokens;
        uint[] memory _percentages = percentages;

        //loop through all tokens
        for (uint i; i < numOfTokens; i++) {
            address _token = _tokens[i];
            uint _percentage = _percentages[i];

            uint transferAmount = (amount * _percentage ) / 100;
            IERC20(_token).approve(msg.sender, transferAmount);
            bool success = IERC20(_token).transfer(msg.sender, transferAmount);
            require(success, "transfer failed");
        }

        burn(msg.sender,amount); 
    }


    //owner withdraw streaming fee
    function streamingFee() public  {
        require(msg.sender == owner, "Not owner!");

        address[] memory _holders = holders;

        uint feeCounter;
     


    // REMOVE DUPLICATE HOLDERS IN ARRAY
    // use nested for loop to find the duplicate elements in array 
    uint x;
    uint y;
    uint z;
    uint size = holders.length;
    for ( x = 0; x < size; x ++)  
    {  
        for ( y = x + 1; y < size; y++)  
        {  
            // use if statement to check duplicate element  
            if ( _holders[x] == _holders[y])  
            {  
                // delete the current position of the duplicate element  
                for ( z = y; z < size - 1; z++)  
                {  
                    _holders[z] = _holders[z + 1];  
                }  
                // decrease the size of array after removing duplicate element  
                size--;  
                  
            // if the position of the elements is changes, don't increase the index j  
                y--;      
            }  
        }  
    }

        //rebase / reduce supply by 1%
        uint numHolders = _holders.length;
        for (uint i; i < numHolders; i++){
            uint amtToBurn = (balanceOf[_holders[i]]) / 99;
            
            burn(_holders[i], amtToBurn);
            feeCounter += amtToBurn;
        }

        _mint(feeCounter);

    
    }

    function getTotalSupply() public view returns (uint256){
        return totalSupply;
    }


    function transfer(address recipient, uint amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;

        //add to holders array
        holders.push(recipient);

        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;


        //add to holders array
        holders.push(recipient);


        emit Transfer(sender, recipient, amount);
        return true;
    }

    function _mint(uint amount) internal {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;



        emit Transfer(address(0), msg.sender, amount);
    }

    function burn(address burnee, uint amount) internal {
        balanceOf[burnee] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }


}