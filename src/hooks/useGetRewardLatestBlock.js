import { useEffect, useState } from "react";
import { getWssProvider } from "../constants/providers";
import { getRewardTokenContract } from "../constants/contracts";

const useGetLatestBlock = () => {
  const [rewardBlockNumber, setRewardBlockNumber] = useState("");

  const eventListener = async () => {
    getWssProvider.on("block", (blockNumber) => {
      console.log("blockNumber", blockNumber);
      setRewardBlockNumber(blockNumber);
    });
  };

  useEffect(() => {
    eventListener();

    return () => {
      getRewardTokenContract(getWssProvider).removeAllListeners("block");
      console.log("event disconnected");
    };
  }, []);

  return rewardBlockNumber;
};

export default useGetLatestBlock;
