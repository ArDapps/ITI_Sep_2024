"use client";

import { CreateProduct } from "@/components/CreateProduct";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import contractAbi from "../../public/abis/MarketPlaceAbi.json";
import { ProductCard } from "@/components/ProductCard";
import { EventProductTable } from "@/components/EventProductTable";

// "https://sepolia.infura.io/v3/c0b72977dfb14156a9424ef2539ebec9";

export default function singlePage({ params }) {
  console.log(params);

  const [singleProduct, setSingleProduct] = useState();
  useEffect(() => {
    loadProduct();
    productEvents();
  }, [params]);
  const [evenst, setEvents] = useState([]);

  const loadProduct = async () => {
    const INFURA_PROVIDER =
      "https://sepolia.infura.io/v3/c0b72977dfb14156a9424ef2539ebec9";

    try {
      const provider = new ethers.JsonRpcProvider(INFURA_PROVIDER);
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        contractAbi,
        provider
      );

      const product = await contract.products(params.productId);
      setSingleProduct(product);
    } catch (error) {
      console.log(error);
    }
  };

  const productEvents = async () => {
    const INFURA_PROVIDER =
      "https://sepolia.infura.io/v3/c0b72977dfb14156a9424ef2539ebec9";

    try {
      const provider = new ethers.JsonRpcProvider(INFURA_PROVIDER);
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        contractAbi,
        provider
      );

      //Handel Events
      const createdFilterQuery = contract.filters.ProductCreated(
        params.productId
      );

      const buyFilterQuery = contract.filters.ProductPurchased(
        params.productId
      );

      const createdEvent = await contract.queryFilter(createdFilterQuery);
      const buyEvent = await contract.queryFilter(buyFilterQuery);

      console.log(createdEvent, "createdEvent");
      console.log(buyEvent, "buyEvent");

      const allEvents = [...createdEvent, ...buyEvent];
      allEvents.sort((first, last) => first.blockNumber - last.blockNumber);
      setEvents(allEvents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div
        class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      ></div>

      <div>
        <ProductCard product={singleProduct} />
        <EventProductTable events={evenst} />
      </div>
    </div>
  );
}
