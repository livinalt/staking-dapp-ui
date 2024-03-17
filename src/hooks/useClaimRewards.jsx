import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { getStakingPoolContract } from "../constants/contracts";
import { getReadWriteProvider } from "../constants/providers";

const useClaimRewards = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const [claimRewardLoading, setLoading] = useState(false);

  const claimReward = useCallback(
    async (poolId) => {
      if (poolId === "") return console.error("poolId is required");
      setLoading(true);

      try {
        const provider = getReadWriteProvider(walletProvider);
        const signer = await provider.getSigner();
        const stakingContract = getStakingPoolContract(signer);

        // claim the reward
        const claimTx = await stakingContract.claimReward(poolId);
        const receipt = await claimTx.wait();
        toast.success("Rewar Claimed successfully");

        console.log(receipt);
      } catch (err) {
        toast.error("Could not claim");
        console.dir(err);
      } finally {
        setLoading(false);
      }
    },
    [walletProvider]
  );

  return { claimReward, claimRewardLoading };
};

export default useClaimRewards;