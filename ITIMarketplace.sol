
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
contract ITIMarketplace {
    using Counters for Counters.Counter;

    address  public  companyAdmin;

    constructor(address companyOwner){

        companyAdmin=companyOwner;

    }

    Counters.Counter public productCounter;

enum ProductStatus {Shipping,Sold,Resell}

    struct Product {
        uint id;
        string name;
        uint price;
        string description;
        string imageHash;
        address factoryCreatore;
        address currentOwner;
        ProductStatus status;

    }
    event ProductCreated(
       uint id,
         uint price, 
         address currentOwner,
        ProductStatus status,
        uint timeStamp

    );

        event ProductPurchased(
       uint id,
         uint price, 
         address currentOwner,
        ProductStatus status,
        uint timeStamp

    );







    mapping (uint=>Product) public  products;

    modifier onlyCompany (){

        require(msg.sender == companyAdmin,"Company Owner only can add Product");



        _;
    }


    //Create product ->ONLY Factory Admin

    function createProduct ( string memory _name, uint _price,string memory _description,string  memory _imageHash) public onlyCompany {


require(bytes(_name).length >3 ,"Name should be more than 3 chars");
require(bytes(_description).length >10 ,"Description should be more than 10 chars");
require(bytes(_imageHash).length >15 ,"Image HaSH should be more than 15 chars");

//10000000000000000

require(_price >10000000000000000,"Price should be more than 10000000000000000 == 25$");

require(msg.sender !=address(0),"You shoudl conncet web3 wallet provider first");

productCounter.increment();

uint _id = productCounter.current();

products[_id]= Product(_id,_name,_price,_description,_imageHash,companyAdmin,address(0x0),ProductStatus.Shipping);
   emit  ProductCreated(_id, _price, address(0x0), ProductStatus.Shipping, block.timestamp);//time.now()

        }



        //Buy product

function buyProduct (uint _id) public payable {

    Product memory _product = products[_id];

    require(_product.id>0&& _product.id <=productCounter.current(),"Invalid Product ID");
    require(_product.status ==ProductStatus.Shipping,"Product already purchased");

    require(_product.factoryCreatore !=msg.sender,"Cannot Purchased your products");

    require(msg.value >=_product.price,"Not Enough amount sent");

    //
    payable (_product.factoryCreatore).transfer(msg.value);

    _product.currentOwner=msg.sender;
    _product.status = ProductStatus.Sold;

    products[_id] =_product;

   emit  ProductCreated(_id, _product.price, msg.sender, ProductStatus.Sold, block.timestamp);//time.now()


}
        



}