import { useEffect, useState } from "react";
import { getReadWriteProvider } from "../constants/providers";
import { getMultiCallContract, getStakingPoolContract} from "../constants/contracts";
import { decodeStakingPoolABIResult, encodeStakingPoolABICall,} from "../utils/callEncoder";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import usePoolNumbers from "./usePoolNumbers";
import { formatEther } from "ethers";

const useStakingPools = () => {
  const { address } = useWeb3ModalAccount();
  const totalPools = usePoolNumbers();
  const [poolDetails, setPoolDetails] = useState([]);
  const multicallContract = getMultiCallContract(getReadWriteProvider);
  const stakingPoolContract = getStakingPoolContract(getReadWriteProvider);

  const convertArray = (array) => {
    return array.map((subArray) => {
      const convertedArray = subArray.map((value, index) => {
        if (index === 1 || index === 2) {
        
          return formatEther(value);
        } else {
          return value;
        }
      });
      return convertedArray;
    });
  };
  const fetchPoolDetails = async () => {
    try {
      // Fetch only if totalPools is greater than 0
      if (totalPools > 0) {
        const calls = [];
        for (let i = 0; i < totalPools; i++) {
          calls.push({
            target: stakingPoolContract.target,
            callData: encodeStakingPoolABICall("getPoolByID", [i]),
          });
        }

        const response = await multicallContract.tryAggregate.staticCall(
          false,
          calls
        );

        const decodedResponse = response.map((res) =>
          decodeStakingPoolABIResult("getPoolByID", res[1])
        );
        let result = decodedResponse.map((res) => res.toString().split(","));

        result = convertArray(result);

        setPoolDetails({ isLoading: false, data: result });
      } else {
        setPoolDetails({ isLoading: false, data: [] });
      }
    } catch (error) {
      console.error("Error fetching pool details:", error);
      setPoolDetails({ isLoading: false, data: [] });
    }
  };

  useEffect(() => {
    fetchPoolDetails();
  }, [totalPools]);

  return poolDetails;
};

export default useStakingPools;
