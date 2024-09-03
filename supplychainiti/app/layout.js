"use client";
import "./globals.css";
import { ethers } from "ethers";

import contractAbi from "../public/abis/MarketPlaceAbi.json";
import { useState } from "react";
import { useEffect } from "react";
import { NavBar } from "@/components/NavBar";

export default function RootLayout({ children }) {
  const [account, setAccount] = useState();
  const [admin, setAdmin] = useState();
  const [productCount, setProductCount] = useState();

  useEffect(() => {
    connectWalletHandeler();
  }, []);
  const connectWalletHandeler = async () => {
    console.log("conncet wallet");
    try {
      if (!window.ethereum) throw new Error("Please install wallet");

      //Connect Wallet
      const provider = new ethers.BrowserProvider(window.ethereum);

      console.log(provider, "P{}");

      const signer = await provider.getSigner();

      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      console.log(accounts[0], "accounts");

      await loadContract(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const loadContract = async (provider) => {
    //adress//abi

    console.log(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
    console.log(contractAbi);

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      contractAbi,
      provider
    );

    const adminAddress = await contract.companyAdmin();
    const productCounter = await contract.productCounter();

    setAdmin(adminAddress);
    setProductCount(productCount);

    console.log(adminAddress, "adminAddress", productCounter);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <html lang="en">
      <body>
        <NavBar
          connectButtonHandeler={connectWalletHandeler}
          walletAccount={account}
        />

        {children}
      </body>
    </html>
  );
}
