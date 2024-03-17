import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import {
  getRewardTokenContract,
  getStakingPoolContract,
} from "../constants/contracts";
import { getReadWriteProvider } from "../constants/providers";
// import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const useCreateStakePool = () => {
  const { walletProvider } = useWeb3ModalProvider();

  if (!walletProvider) {
    return;
  }
  const provider = getReadWriteProvider(walletProvider);

  const createPool = async (rewardRate) => {
    const signer = await provider.getSigner();

    const stakingPoolContract = getStakingPoolContract(signer);
    const rewardTokenContract = getRewardTokenContract(signer);

    let toastId = console.loading("Approving staking pool creation");

    try {
      const reward = ethers.parseEther("100");

      const approveTx = await rewardTokenContract.approve(
        import.meta.env.VITE_Staking_Pool_contract_address,
        reward
      );
      await approveTx.wait();

      // Call the create Pool function from the smart contract
      console.loading("creating staking pool");
      const createPoolTx = await stakingPoolContract.createPool(rewardRate);
      await createPoolTx.wait();

      console.log(createPoolTx);
      toast.success(toastId);
      alert("Staking Pool Created successfully");
    } catch (error) {
      console.error(error);
      console.error("Failed to create pool");
    } finally {
      console.dismiss(toastId);
    }
  };

  return createPool;
};

export default useCreateStakePool;