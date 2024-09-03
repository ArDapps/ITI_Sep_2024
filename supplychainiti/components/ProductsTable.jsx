import { ethers } from "ethers";
import Link from "next/link";
import React from "react";

export const ProductsTable = ({ products }) => {
  console.log(products[0], "products");
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Creator
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4"> {product.description}</td>
                <td className="px-6 py-4"> {product.factoryCreatore}</td>
                <td className="px-6 py-4">
                  {" "}
                  {ethers.formatEther(product.price.toString())}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/${product.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
