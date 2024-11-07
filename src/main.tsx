import React from "react";
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
      <Provider store={store}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <GrazProvider
              grazOptions={{
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
