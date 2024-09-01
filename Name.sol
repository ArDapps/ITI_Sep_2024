// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Name{


    uint   [] public dynamic = [1,4,8] ; //
    string [5]   names =["Bahaa","Ali","Bahaa","Ali"];

    address  studentWaalet ;

//0x0D366F7C4a21FD03248A5566Bc5C3860072892e8 
//0x8059B0AE35c113137694Ba15b2C3585aE77Bb8E9


//Stacking => lock =>




   function removeNumb()public  {
        dynamic.pop();
    }

    function addNumb(uint _num)public  {
        dynamic.push(_num);

    }

    function getFirst()public view returns (uint){

       return  dynamic[2];

    }

    //map

    //[1,2,3]

    mapping (uint=>string) public  students;

    function addStudenet (uint _id,string memory _name) public {

        students[_id] = _name;

        
    }


    enum State {Pending,Approved,Rejected}


   State  public  currentState = State.Pending;


   function getOne () public view returns (bool) {

    if(currentState == State.Rejected) {

        return false;
    }else  {
        
        return  true;
    }
   }






    

   
}






//2-address diffrence?


