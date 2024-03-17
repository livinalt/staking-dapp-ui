import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { parseEther } from "ethers";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { getStakingPoolContract } from "../constants/contracts";
import { getReadWriteProvider } from "../constants/providers";

const useUnstakeToken = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const [unstakeLoading, setLoading] = useState("");

  const unstake = useCallback(
    async (poolId) => {
      if (poolId === "") return console.error("poolId is required");
      setLoading(true);

      try {
        const provider = getReadWriteProvider(walletProvider);

        const signer = await provider.getSigner();
        const stakingContract = getStakingPoolContract(signer);

        // unstake the token
        const unstakeTx = await stakingContract.unstake(poolId);
        const receipt = await unstakeTx.wait();
        toast("Tokens Unstaked successfully");

        console.log(receipt);
      } catch (err) {
        toast.error(" unstake successfully");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [walletProvider]
  );

  return { unstake, unstakeLoading };
};

export default useUnstakeToken;