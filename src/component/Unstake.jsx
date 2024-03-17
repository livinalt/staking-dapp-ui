import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import useUnstake from "../hooks/useUnstakedTokens";

const UnstakeComp = () => {
  const [poolId, setPoolId] = useState(0);
  const handleUnstake = useUnstake(poolId);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-blue-600">Unstake</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Stake</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Unstake
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Enter ID
            </Text>
            <TextField.Input
              value={poolId}
              onChange={(e) => setPoolId(e.target.value)}
              placeholder="Enter Pool ID"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button className="bg-blue-600" onClick={handleUnstake}>
            Unstake
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UnstakeComp;
