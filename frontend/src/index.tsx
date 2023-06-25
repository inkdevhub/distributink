import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
  MyContractProvider,
  UIProvider,
} from "./contexts";
import { InkConfig, UseInkProvider } from "useink";
import { Astar, Shiden, Shibuya } from "useink/chains";
import { NotificationsProvider } from "useink/notifications";
import { Notifications } from "./components/Notifications";

const config: InkConfig = {
  config: {
    dappName: "Distribut-ink native tokens",
    chains: [Astar],
    caller: {
      default: "5EyR7vEk7DtvEWeefGcXXMV6hKwB8Ex5uvjHufm466mbjJkR",
    },
  },
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <UseInkProvider {...config}>
        <NotificationsProvider>
          <UIProvider>
            <MyContractProvider>
                <App />
                <Notifications />
            </MyContractProvider>
          </UIProvider>
        </NotificationsProvider>
      </UseInkProvider>
    </Router>
  </React.StrictMode>
);

