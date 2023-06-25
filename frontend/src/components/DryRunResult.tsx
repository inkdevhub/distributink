import { useEffect, useRef } from "react";
import { useMyContract } from "../hooks";
import { pickTxInfo, formatBalance } from "useink/utils";
import { useWallet } from "useink";
import { tokenUnit } from "../const";

interface Props {
  list: string[];
  sendingValue: string;
  amount: string;
}

interface FeesProps {
  storage: any;
  gas: any;
  unit: string;
}

function Fees({ storage, gas, unit }: FeesProps) {
  const cost = gas.add(storage);
  formatBalance.setDefaults({ unit });
  return (
    <div className="text-xs text-right mb-2 text-gray-200">
      <p>storage + gas: {formatBalance(cost.toString(), { decimals: 18, withSi: true })}</p>
    </div>
  );
}

export function DryRunResult( { list, amount, sendingValue }: Props) {
  const { distributeDryRun } = useMyContract();
  const { account } = useWallet();
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function getOutcome() {
      distributeDryRun?.send([list, amount], { value: sendingValue, defaultCaller: true });
    }

    function debouncedDryRun() {
      if (timeoutId.current) clearTimeout(timeoutId.current);

      timeoutId.current = setTimeout(() => {
        getOutcome().catch(console.error);
        timeoutId.current = null;
      }, 1000);
    }

    debouncedDryRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distributeDryRun?.send, account?.address, sendingValue, list]);

  if (!distributeDryRun?.result) return null;
  const txInfo = pickTxInfo(distributeDryRun?.result);

  return (
    <>
      <Fees storage={txInfo ? txInfo.storageDeposit.asCharge : '--'}
        gas={txInfo ? txInfo.partialFee : '--'}
        unit={tokenUnit}
      />
    </>
  );
}
