import React, { useEffect } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getStakingPoolContract } from "../constants/contracts";
import { toast } from 'react-toastify';

const handleClaimRewards = (poolID, onClaimReward) => {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    useEffect(() => {
        const claimRewardsAndEmitEvent = async () => {
            if (!isSupportedChain(chainId)) return toast.error("Wrong network");

            const readWriteProvider = getProvider(walletProvider);
            const signer = await readWriteProvider.getSigner();

            const contract = getStakingPoolContract(signer);

            try {
                const transaction = await contract.claimReward(poolID);
                const receipt = await transaction.wait();

                if (receipt.status) {
                    toast.success("Reward claimed successfully!!!");

                    // Emit a custom event if onClaimReward callback is provided
                    if (onClaimReward) {
                        const event = {
                            poolID: poolID,
                            transactionReceipt: receipt
                        };
                        onClaimReward(event);
                    }
                } else {
                    console.log("Reward claiming failed!");
                }
            } catch (error) {
                console.error(
                    "error: ",
                    error.reason || "An unknown error occurred"
                );
            }
        };

        claimRewardsAndEmitEvent();
    }, [chainId, poolID, walletProvider, onClaimReward]);
};

export default handleClaimRewards;
