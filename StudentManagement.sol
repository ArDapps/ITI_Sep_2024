// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentManagement {

 




    address public  admin;

    error Unauthorized(string msg);


constructor(){

    admin = msg.sender;

}



            struct Student {

                address walletAddress;
                uint totalPaid;
                uint currentBalance;
                string Name;

                uint age;

            }


            mapping (address=>Student) public  students;

event StudentAdded ( 
      address indexed  walletAddress,
                uint totalPaid,
                uint currentBalance,
                string Name

               );



            function addStudent (string memory _name,uint _age)public  {

                require(bytes(_name).length > 5,"name shoudl be more than 5 chars");


                if(_age <16){
                    revert("You should lagerthan 16 years");
                }

             
                

                students[msg.sender] = Student(msg.sender,0,0,_name,_age);

                emit StudentAdded (msg.sender,0,0,_name);
            }



function payFees() public payable  {

 



    if(students[msg.sender].walletAddress ==address(0x0) && students[msg.sender].age <16) {

        revert Unauthorized("Unauthoried msg skdjhfsd fk");

    }

   require(msg.value > 0,"you should send Morthe 1 wei");


students[msg.sender].totalPaid +=msg.value;

students[msg.sender].currentBalance +=msg.value;



    
}


modifier onlyAdmin (){
        require(msg.sender == admin,"admin only can do this");
        _;

}
// 0.2 eth 200000000

//1000000000000000000
function refund (address _studentAddress,uint _amount) public onlyAdmin  {


      if(students[_studentAddress].walletAddress ==address(0x0) && students[_studentAddress].age <16) {

        revert("User Not Registered");

    }

      if( students[_studentAddress].currentBalance <=_amount) {

        revert("insufficient balance");

    }

    students[_studentAddress].currentBalance -= _amount;

      payable  (_studentAddress).transfer(_amount);










}
           



}