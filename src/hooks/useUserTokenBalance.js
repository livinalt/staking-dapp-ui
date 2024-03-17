import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { ethers } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getReadWriteProvider } from "../constants/providers";
import { getStakeTokenContract } from "../constants/contracts";

const useUserTokenBalance = (newBlock) => {
  const [balance, setBalance] = useState("");
  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    if (typeof address === "undefined") {
      setBalance("0");
      return;
    }

    const contract = getStakeTokenContract(getReadWriteProvider);
    contract
      .balanceOf(address)
      .then((res) => {
        setBalance(ethers.formatUnits(res, 18));
      })
      .catch((err) => {
        toast("Could not fetch balance");
        console.error("Error:", err);
      });
  }, [address, newBlock]);

  return balance;
};

export default useUserTokenBalance;
