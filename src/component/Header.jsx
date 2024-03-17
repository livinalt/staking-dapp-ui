import { Button, Flex } from "@radix-ui/themes";

export default function Header() {
  
  return (
    <div className="">
            <div className=" px-40 bg-blue-400 mb-20 flex justify-between items-center">
                <div className="text-lg  font-semibold">Staking Pool</div>
                <div className="flex gap-4 items-center">
                <w3m-button />
                </div>
            </div>
        </div>
  );
}
