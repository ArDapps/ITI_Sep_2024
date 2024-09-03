"use client";

import { CreateProduct } from "@/components/CreateProduct";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import contractAbi from "../public/abis/MarketPlaceAbi.json";
import { ProductsTable } from "@/components/ProductsTable";

// "https://sepolia.infura.io/v3/c0b72977dfb14156a9424ef2539ebec9";

export default function Home() {
  const [allResellProducts, setAllResellProducts] = useState([]);
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const INFURA_PROVIDER =
      "https://sepolia.infura.io/v3/c0b72977dfb14156a9424ef2539ebec9";

    const provider = new ethers.JsonRpcProvider(INFURA_PROVIDER);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      contractAbi,
      provider
    );
    const productCounter = await contract.productCounter();
    console.log(productCounter, " productCounter Provider");

    let products = [];

    for (let i = 1; i <= productCounter; i++) {
      const product = await contract.products(i);
      console.log(product.status, " firstProduct ststus");

      // if (product.status.toString() === "0") {
      //   products.push(product);
      // }

      products.push(product);
    }
    setAllResellProducts(products);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div
        class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <span class="font-medium"> Welcome to </span> Supplychain web3 world
      </div>

      <div>
        <ProductsTable products={allResellProducts} />
      </div>
    </div>
  );
}
