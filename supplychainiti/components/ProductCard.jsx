import { ethers } from "ethers";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import contractAbi from "../public/abis/MarketPlaceAbi.json";

export const ProductCard = ({ product }) => {
  const buyProducthandeler = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      console.log(provider, "P{}");

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        contractAbi,
        signer
      );

      const tx = await contract.buyProduct(product.id, {
        value: product.price,
      });
      await tx.wait();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {product && (
        <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <svg
            className="w-10 h-10 text-gray-500 dark:text-gray-400 mb-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
          </svg>
          <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            {product.description}
          </p>
          <a
            href="#"
            className="inline-flex font-bold text-3xl items-center text-blue-600 hover:underline"
          >
            {ethers.formatEther(product.price.toString())}
            <FaEthereum size={40} />
          </a>
          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Cretore:{product.factoryCreatore}
          </p>

          <button
            onClick={buyProducthandeler}
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};
