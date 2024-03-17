import { useEffect, useState } from "react";
import { TextField, Dialog, Flex, Text, Button } from "@radix-ui/themes";
import { parseEther } from "ethers";
import useUserRewardTokenBalance from "../hooks/useUserRewardTokenBalance";

import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useCreateStakePool from "../hooks/useCreateStakePool";
import { toast } from "react-toastify";

const CreatePool = () => {
  const { isConnected, address } = useWeb3ModalAccount();
  console.log("Connected Address:", address, isConnected);

  const rewardBalance = useUserRewardTokenBalance();

  console.log("Reward Balance:", rewardBalance);

  const [rewardRate, setRewardRate] = useState("");
  const createStakingPool = useCreateStakePool();
  const rewardTokenAmountNeeded = parseEther("100");

  const handleCreatePool = async () => {
    if (rewardRate <= 0)
      return toast.error("Reward rate must be greater than 0");
    if (isNaN(Number(rewardRate)))
      return toast.error("Require number for reward rate");
    if (rewardBalance < rewardTokenAmountNeeded)
      return toast.error("Balance too small to create staking pool");
    await createStakingPool(rewardRate);
    setRewardRate("");
  };

  return (
    isConnected && address ? (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button size="3" variant="soft" className="bg-blue">
            Create Pool
          </Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Create Staking Pool</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Specify a reward rate
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Reward Rate
              </Text>
              <TextField.Input
                placeholder="Enter your reward rate"
                value={rewardRate}
                onChange={(e) => setRewardRate(e.target.value)}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              variant="soft"
              color="blue"
              onClick={handleCreatePool}
            >
              Create Pool
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    ) : (
      <Text>Connect Wallet to create a pool</Text>
    )
  );
};

export default CreatePool;
