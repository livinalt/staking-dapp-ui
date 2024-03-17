import { ethers } from "ethers";
import StakingPoolAbi from "./StakingPoolABI.json";
import RewardTokenAbi from "./RewardTokenABI.json";
import StakedTokenAbi from "./StakeTokenABI.json";

const StakingPoolContractAddress = import.meta.env.VITE_Staking_Pool_contract_address;
const StakedTokenContractAddress = import.meta.env.VITE_Staking_Token_contract_address;
const RewardTokenContractAddress = import.meta.env.VITE_Reward_Token_contract_address;

export const getStakingPoolContract = (providerOrSigner) => {
  return new ethers.Contract(StakingPoolContractAddress, StakingPoolAbi, providerOrSigner);
};

export const getStakeTokenContract = (providerOrSigner) => {
  return new ethers.Contract(StakedTokenContractAddress, RewardTokenAbi, providerOrSigner);
};
export const getRewardTokenContract = (providerOrSigner) => {
  return new ethers.Contract(RewardTokenContractAddress, StakedTokenAbi, providerOrSigner);
};

export const getMultiCallContract = (provider) => {
  return new ethers.Contract(
    import.meta.env.VITE_multicall_address,
    MultiCallAbi,
    provider
  );
};
