import { Button } from "./Button";
import { useUI } from "../hooks";
import { AccountsDropdown } from "./AccountsDropdown";
import { useWallet } from "useink";
import { XCircleIcon } from "@heroicons/react/24/solid";

import classNames from "classnames";

export const Header = () => {
  const { account, accounts, disconnect } = useWallet();
  const { setShowConnectWallet } = useUI();

  return (
    <div className="header-container">
      <div className="flex items-center justify-between w-full">
        <div className="wallet-wrapper">
          {!account ? (
            <Button 
            className={classNames(
              "relative w-full cursor-default rounded-lg bg-violet-100 py-2 pl-3 pr-10 text-left shadow-md",
              "focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white", 
              "focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300",
              "sm:text-sm hover:cursor-pointer"
            )}
            onClick={() => setShowConnectWallet(true)}>
              Connect Wallet
            </Button>
          ) : (
            <div className="flex items-center justify-end accounts-dropdown">
              {accounts && accounts.length > 0 && <AccountsDropdown />}
              <button
              onClick={disconnect}
              className="py-1 px-2 text-xs bg-gray-800 bg-opacity-0 text-gray-300 hover:bg-gray-800 hover:bg-opacity-0 relative left-[4px]"
              title="disconnect wallet"
            >
              <XCircleIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
