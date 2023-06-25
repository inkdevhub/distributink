import { useContext } from "react";
import { MyContractContext } from "../contexts";

export const useMyContract = () => {
  const context = useContext(MyContractContext);

  if (context === undefined) {
    throw new Error(
      "useMyContract must be used within a MyContractProvider"
    );
  }

  return context;
}
