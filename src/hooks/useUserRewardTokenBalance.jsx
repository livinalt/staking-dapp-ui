import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

import { ethers } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getReadWriteProvider } from "../constants/providers";
import { getRewardTokenContract } from "../constants/contracts";
import { toast } from "react-toastify";

const useUserRewardTokenBalance = () => {
  const [rewardBalance, setRewardBalance] = useState("0");
  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    if (typeof address === "undefined") {
      setRewardBalance("0");
      return;
    }

    const contract = getRewardTokenContract(getReadWriteProvider);
    contract
      .balanceOf(address)
      .then((res) => {
        setRewardBalance(ethers.formatUnits(res, 18));
      })
      .catch((err) => {
        alert("Could not fetch balance");
        toast.error("Error:", err);
      });
  }, [address]);

  return rewardBalance;
};

export default useUserRewardTokenBalance;
