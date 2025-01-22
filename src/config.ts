import {
  sphxLocalChainInfo,
  sphxTestnetChain1Info,
  sphxTestnetChain2Info,
} from "./constants/chainInfo";

export function getEnvVARs(location: { hostname: string | string[] }) {
  const config = {
    VITE_API_HOST: "localhost",
    VITE_API_PORT: 3010,
    VITE_API_URL: "//localhost:3010",
    VITE_WS_PROTOCOL: "ws",
    VITE_EXPLORER_URL: "https://explorer.sphx.dev",
    VITE_STATION_URL: "https://station.non-prod.sphx.dev",
    VITE_FAUCET_URL: "https://faucet.non-prod.sphx.dev",
    FAUCET_API_KEY: "test123",
  };
  // config.VITE_API_HOST = "api.non-prod.sphx.dev";
  // config.VITE_API_PORT = 443;
  // config.VITE_API_URL = "//api.non-prod.sphx.dev";
  // config.VITE_WS_PROTOCOL = "wss";
  // config.VITE_EXPLORER_URL = "https://explorer.sphx.dev";
  // config.VITE_STATION_URL = "https://station.non-prod.sphx.dev";
  // config.VITE_FAUCET_URL = "http://0.0.0.0:9898";
  // return config;
  if (
    location.hostname.indexOf("localhost") > -1 ||
    location.hostname.indexOf("0.0.0.0")
  ) {
    config.VITE_API_HOST = "localhost";
    config.VITE_API_PORT = 3010;
    config.VITE_API_URL = "//localhost:3010";
    config.VITE_EXPLORER_URL = "https://explorer.sphx.dev";
    config.VITE_STATION_URL = "https://station.non-prod.sphx.dev";
    config.VITE_FAUCET_URL = "http://0.0.0.0:9898";
  }
  if (location.hostname.indexOf("demo.sphx.dev") > -1) {
    config.VITE_API_HOST = "apidemo.sphx.dev";
    config.VITE_API_PORT = 443;
    config.VITE_API_URL = "//apidemo.sphx.dev";
    config.VITE_EXPLORER_URL = "https://explorer.sphx.dev";
    config.VITE_STATION_URL = "https://station.non-prod.sphx.dev";
    config.VITE_FAUCET_URL = "https://faucet.non-prod.sphx.dev";
  }
  if (location.hostname.indexOf("non-prod.sphx.dev") > -1) {
    config.VITE_API_HOST = "api.non-prod.sphx.dev";
    config.VITE_API_PORT = 443;
    config.VITE_API_URL = "//api.non-prod.sphx.dev";
    config.VITE_WS_PROTOCOL = "wss";
    config.VITE_EXPLORER_URL = "https://explorer.sphx.dev";
    config.VITE_STATION_URL = "https://station.non-prod.sphx.dev";
    config.VITE_FAUCET_URL = "https://faucet.non-prod.sphx.dev";
  }
  return config;
}

const config = getEnvVARs(window.location);
export default config;

export const getChain = () => {
  // return sphxLocalChainInfo;
  // return sphxTestnetChain1Info;
  // return sphxTestnetChain2Info;
  if (window.location.hostname.includes("localhost")) {
    return sphxLocalChainInfo;
  }
  if (window.location.hostname.includes("non-prod.sphx.dev")) {
    return sphxTestnetChain1Info;
  }
  if (window.location.hostname.includes("demo.sphx.dev")) {
    return sphxTestnetChain1Info;
  }
  return sphxTestnetChain2Info;
};

export const getChainWS = () => {
  const protocol = getChain().rpc.indexOf("https") > -1 ? "wss" : "ws";
  const host = getChain().rpc.replace(/http(s)?:\/\//, "");
  return (
    protocol + "://" + host + (host.endsWith("/") ? "" : "/") + "websocket"
  );
};
