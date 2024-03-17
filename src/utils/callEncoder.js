import { ethers } from "ethers";

import StakedTokenABI from "../constants/StakeTokenABI.json";
import StakingPoolABI from "../constants/StakingPoolABI.json";

export const getTokenInterface = () => new ethers.Interface(StakedTokenABI);

export const getStakingPoolABIInterface = () =>
  new ethers.Interface(StakingPoolABI);

export const encodeStakingPoolABICall = (fn, values) => {
  const itf = getStakingPoolABIInterface();
  const data = itf.encodeFunctionData(fn, values);

  return data;
};

export const decodeStakingPoolABIResult = (fn, data) => {
  const itf = getStakingPoolABIInterface();
  const result = itf.decodeFunctionResult(fn, data);

  return result;
};
