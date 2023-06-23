import { Formik } from "formik";
import { useUI } from "../hooks";
import { Header } from "./Header";
import { useState } from "react";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { ConnectWallet } from "./ConnectWallet";
// import { PinkTabs } from "./PinkTabs";

export const MyContainer = () => {
  const { showConnectWallet, setShowConnectWallet } = useUI();
  const [error, setError] = useState<string>("");

  const handleCloseError = () => setError("");

  return (
    <div className="App">
      <ConnectWallet
        show={showConnectWallet}
        onClose={() => setShowConnectWallet(false)}
      />
      <>
        <div
        >
          <Header />
          <div className="content">
            <h1 className="text-3xl font-bold text-center text-gray-200">
              Hi </h1>
            <Error
              open={!!error}
              onClose={handleCloseError}
              message={error}
            />
          </div>
        </div>
      </>
    </div>
  );
};
