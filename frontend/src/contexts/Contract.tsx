import { PropsWithChildren, createContext } from "react";
import { useContract, DryRun, useDryRun, useTx, Tx, useCall, Call, ChainContract } from "useink";
import { contractAddress } from "../const";
import metadata from "../distributink.json";
import { useTxNotifications } from "useink/notifications";

interface MyContractState {
  myContract?: ChainContract; 
  distributeDryRun?: DryRun<number>;
  distribute?: Tx<number>;
  getPrice?: Call<number>;
}

export const MyContractContext = createContext<MyContractState>({});

export function MyContractProvider({ children }: PropsWithChildren) {
  const myContract = useContract(contractAddress, metadata);
  const distributeDryRun = useDryRun<number>(myContract, 'distributeEqual');
  const distribute = useTx(myContract, 'distributeEqual');
  const getPrice = useCall<number>(myContract, 'getPrice');

  useTxNotifications(distribute);

  return (
    <MyContractContext.Provider value={{ myContract, distributeDryRun, distribute, getPrice }}>
      {children}
    </MyContractContext.Provider>
  );
}