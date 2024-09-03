"use client";
import { ethers } from "ethers";
import { useState } from "react";
import contractAbi from "../../public/abis/MarketPlaceAbi.json";
import { useRouter } from "next/navigation";

const page = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const handelinputChange = (e) => {
    const { id, value } = e.target;

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };

  const router = useRouter();
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(newProduct);

    if (!window.ethereum) throw new Error("Please install wallet");

    //Connect Wallet
    const provider = new ethers.BrowserProvider(window.ethereum);

    console.log(ethers.parseEther(newProduct.price));

    const signer = await provider.getSigner();

    try {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        contractAbi,
        signer
      );

      const tx = await contract.createProduct(
        newProduct.name,
        ethers.parseEther(newProduct.price),

        newProduct.description,
        newProduct.imageUrl
      );
      const receipt = await tx.wait();
      console.log(receipt, "receipt");
      console.log(receipt.status, "receipt sattus");

      if (receipt.status === 1) {
        setNewProduct({
          name: "",
          price: "",
          description: "",
          imageUrl: "",
        });

        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handelSubmit}>
        <div>
          <label
            for="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={newProduct.name}
            onChange={handelinputChange}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            for="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Description
          </label>
          <input
            type="text"
            id="description"
            value={newProduct.description}
            onChange={handelinputChange}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            for="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            product Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={newProduct.imageUrl}
            onChange={handelinputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Price in ETH ex= 0.3/ 1.6 eth
          </label>
          <input
            type="number"
            id="price"
            value={newProduct.price}
            onChange={handelinputChange}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          class=" m-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default page;
