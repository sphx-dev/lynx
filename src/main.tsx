import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import "./i18n";

import { store } from "./state/store";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Window as KeplrWindow } from "@keplr-wallet/types";
import { QueryClient, QueryClientProvider } from "react-query";
import { WebSocketProvider } from "./hooks/useWebsocket";
import { GrazProvider } from "graz";
import { getChain } from "./config";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {
    devTools: () => Promise<void>;
  }
}

window.devTools = async function () {
  await import("./utils/windowTooling").then(mod => {
    console.log("*** DEV TOOLS loaded ***");
    console.log("mod", mod);
  });
};

function Fallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const queryClient = new QueryClient();

const WALL_KEY = "sphx2025";
const Wall = () => {
  const [input, setInput] = useState("");
  const code = window.localStorage.getItem(WALL_KEY);

  if (code === "sphx2025") {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#00000080",
        backdropFilter: "blur(10px)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "22px",
            padding: "20px",
          }}
        >
          Please enter code:
        </h2>
        <input
          type="text"
          placeholder="Enter code"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              window.localStorage.setItem(WALL_KEY, input);
              window.location.reload();
            }
          }}
        />
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "rgb(31, 171, 173)",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            window.localStorage.setItem(WALL_KEY, input);
            window.location.reload();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={Fallback}
      onError={(error, info) => {
        if (error.message.includes("chainId")) {
          console.log("chainId error");
          if (localStorage.getItem("graz-internal") !== null) {
            console.log("reloading...");
            localStorage.removeItem("graz-internal");
            sessionStorage.removeItem("graz-session");
            sessionStorage.removeItem("graz-reconnect-session");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } else {
          console.error(error, info);
        }
      }}
    >
      <Wall />
      <Provider store={store}>
        <BrowserRouter
          future={{
            v7_startTransition: false,
            v7_relativeSplatPath: false,
          }}
        >
          <QueryClientProvider client={queryClient}>
            <GrazProvider
              grazOptions={{
                // TODO: Replace graz.sh for in house implementation
                // @ts-ignore:next-line
                chains: [getChain()],
              }}
            >
              <WebSocketProvider>
                <App />
              </WebSocketProvider>
            </GrazProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
