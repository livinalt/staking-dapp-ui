import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { parseEther } from "ethers";
import { useCallback, useState } from "react";
import { toast } from 'react-toastify';

import {
  getStakingPoolContract,
  getStakeTokenContract,
} from "../constants/contracts";
import { getReadWriteProvider } from "../constants/providers";

const useStakedToken = () => {
  const { walletProvider } = useWeb3ModalProvider();

  const [stakeLoading, setLoading] = useState(false);

  const stake = useCallback(
    async (poolId, amount) => {
      if (amount === "") return console.error("Amount is required");
      setLoading(true);

      try {
        const provider = getReadWriteProvider(walletProvider);

        const signer = await provider.getSigner();
        const tokenContract = getStakeTokenContract(signer);
        const stakingContract = getStakingPoolContract(signer);
        const parsedAmount = parseEther(amount).toString();

        // approve staking contract to spend the token
        const approveTx = await tokenContract.approve(
          stakingContract.target,
          parsedAmount
        );
        await approveTx.wait();
        // Call the stake function from the smart contract
        const stakeTx = await stakingContract.stake(poolId, parsedAmount);
        const receipt = await stakeTx.wait();
        toast("Staked successfully");

        console.log(receipt);
      } catch (err) {
        toast.error("Staking failed");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [walletProvider]
  );

  return { stake, stakeLoading };
};

export default useStakedToken;
