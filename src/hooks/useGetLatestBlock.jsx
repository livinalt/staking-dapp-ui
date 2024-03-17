import { useEffect, useState } from "react";
import { getWssProvider } from "../constants/providers";
import { getTokenContract } from "../constants/contracts";

const useGetLatestBlock = () => {
  const [blockNumber, setBlockNumber] = useState("");

  const eventListener = async () => {
    getWssProvider.on("block", (blockNumber) => {
      setBlockNumber(blockNumber);
    });
  };

  useEffect(() => {
    eventListener();

    return () => {
      getTokenContract(getWssProvider).removeAllListeners("block");
      console.log("event disconnected");
    };
  }, []);

  return blockNumber;
};

export default useGetLatestBlock;
