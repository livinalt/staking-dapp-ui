import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import handleClaimRewards from '../hooks/handleClaimRewards';

const ClaimRewards = () => {
    const [poolId, setPoolId] = useState("");

    return (
        <div className="flex">
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Rewards
                    </Button>
                </Dialog.Trigger>

                <Dialog.Content className="bg-white p-8 rounded-lg shadow-md" style={{ maxWidth: 450 }}>
                    <Dialog.Title className="text-xl font-semibold mb-4">Claim</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Claim Your Rewards
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label className="flex flex-col">
                            <span className="text-sm font-bold mb-1">Pool ID</span>
                            <input
                                type="text"
                                placeholder="Enter Pool ID"
                                className="border rounded-md py-1 px-2 focus:outline-none focus:border-blue-500"
                                value={poolId}
                                onChange={(e) => setPoolId(e.target.value)}
                            />
                        </label>
                    </Flex>

                    <Flex direction="column" gap="3">
                        <span className="text-sm font-bold">You have rewards in your account</span>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <button className="text-gray-600 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
                        </Dialog.Close>
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                            onClick={() => handleClaimRewards(poolId)}>
                            Claim Rewards
                        </button>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    );
};

export default ClaimRewards;
