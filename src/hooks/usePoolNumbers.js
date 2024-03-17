import { useState } from "react";
import { getReadWriteProvider } from "../constants/providers";
import { getStakingPoolContract } from "../constants/contracts";

const usePoolNumbers = () => {
  const [totalPools, setTotalPools] = useState("");
  const stakingPoolContract = getStakingPoolContract(getReadWriteProvider);

  (async () => {
    const ids = await stakingPoolContract.id();
    setTotalPools(Number(ids));
  })();

  return totalPools;
};

export default usePoolNumbers;
