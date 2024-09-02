
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTIti is ERC721URIStorage{

    using Counters for Counters.Counter;

    Counters.Counter public nftCounter;


    constructor()ERC721("MY_ITI_NFT","NITI"){}


    function createNFT (string memory tokenURI) public  returns  (uint){
         nftCounter.increment();//0-1

         uint nFTid = nftCounter.current() ;

        _safeMint(msg.sender, nFTid);//1=>sender transcation
        _setTokenURI(nFTid, tokenURI);//1=>uri-hash

    return nFTid;




    }

}