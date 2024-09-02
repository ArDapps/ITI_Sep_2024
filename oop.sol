// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



import "./IBanckAccount.sol";


contract SavingAccount is IBanckAccount {

    uint private balance;




 function deposit(uint amount) public override  {

    balance += amount + (amount * 4/100);
 }
    function withdraw(uint amount) external {   require(
            amount <=balance,"Insufficient Balance"
        );

        balance -=amount;}
    function getBalance()external  view returns(uint) {

        return balance;
    }

 
}

contract CurrentAccount is  IBanckAccount{
    uint private balance;


 function deposit(uint amount) public override {
    balance +=amount;
 }
    function withdraw(uint amount) external {
        require(
            amount <=balance,"Insufficient Balance"
        );

        balance -=amount;
    }
    function getBalance()external  view returns (uint) {

        return balance;
    }

}