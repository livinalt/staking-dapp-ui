import { useEffect, useState } from "react";
import { wssProvider } from "../constants/providers";
import { ethers } from "ethers";

const useNumberOfPool = () => {
  const [value, setValue] = useState(0);
  4;
  // const eventListerner = useCallback(() => {
  //     setValue((prev) => prev + 1);
  // }, []);

  useEffect(() => {
    const eventListener = () => {
      setValue((prev) => prev + 1);
    };

    const filter = {
      address: import.meta.env.VITE_staking_contract_address,
      topics: [
        "0x1e9508a4adba2a00cbe57907315ae75b7766a40f03929616c91866787591f8ca",
      ],
    };

    console.log("filter", filter);

    wssProvider.getLogs({ ...filter, fromBlock: 5465128 }).then((logs) => {
      setValue(logs.length + 1);
    });

    const wssProvider2 = new ethers.WebSocketProvider(
      import.meta.env.VITE_wss_rpc_url
    );

    wssProvider2.on(filter, eventListener);

    return () => wssProvider2.off(filter, eventListener);
  }, []);

  return value;
};

export default useNumberOfPool;
