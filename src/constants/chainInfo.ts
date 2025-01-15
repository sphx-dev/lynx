import { DENOMUSDC } from "@/constants";
import { ChainInfo } from "@keplr-wallet/types";

// https://github.com/chainapsis/keplr-wallet/blob/master/apps/mobile/src/config.ts
export const cosmoshub: ChainInfo = {
  rpc: "https://rpc-cosmoshub.keplr.app",
  rest: "https://lcd-cosmoshub.keplr.app",
  chainId: "cosmoshub-4",
  chainName: "Cosmos Hub",
  stakeCurrency: {
    coinDenom: "ATOM",
    coinMinimalDenom: "uatom",
    coinDecimals: 6,
    coinGeckoId: "cosmos",
  },
  walletUrl: "https://wallet.keplr.app/chains/cosmos-hub",
  walletUrlForStaking: "https://wallet.keplr.app/chains/cosmos-hub",
  bip44: {
    coinType: 118,
  },
  // bech32Config: Bech32Address.defaultBech32Config("cosmos"),
  bech32Config: {
    bech32PrefixAccAddr: "cosmos",
    bech32PrefixAccPub: "cosmospub",
    bech32PrefixValAddr: "cosmosvaloper",
    bech32PrefixValPub: "cosmosvaloperpub",
    bech32PrefixConsAddr: "cosmosvalcons",
    bech32PrefixConsPub: "cosmosvalconspub",
  },
  currencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: "cosmos",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: "cosmos",
    },
  ],
  features: ["ibc-transfer", "ibc-go"],
};

// 🌍 Tendermint node: http://0.0.0.0:26657
// 🌍 Blockchain API: http://0.0.0.0:1317
// 🌍 Token faucet: http://0.0.0.0:4500
export const sphxLocalChainInfo: ChainInfo = {
  rpc: "http://0.0.0.0:26657",
  rest: "http://0.0.0.0:1317",
  chainId: "sphx",
  chainName: "Sphinx Local Testnet",
  chainSymbolImageUrl: "https://avatars.githubusercontent.com/u/134250347",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "sphx",
    bech32PrefixAccPub: "sphxpub",
    bech32PrefixValAddr: "sphxvaloper",
    bech32PrefixValPub: "sphxvaloperpub",
    bech32PrefixConsAddr: "sphxvalcons",
    bech32PrefixConsPub: "sphxvalconspub",
  },
  currencies: [
    {
      coinDenom: "USDC",
      coinMinimalDenom: DENOMUSDC,
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "USDC",
      coinMinimalDenom: DENOMUSDC,
      coinDecimals: 6,
    },
  ],
};

export const sphxTestnetChain1Info: ChainInfo = {
  rpc: "https://rpc.sphx.dev/",
  rest: "https://rest1.sphx.dev/",
  chainId: "sphx-testnet",
  chainName: "Sphinx Testnet 1",
  chainSymbolImageUrl: "https://avatars.githubusercontent.com/u/134250347",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "sphx",
    bech32PrefixAccPub: "sphxpub",
    bech32PrefixValAddr: "sphxvaloper",
    bech32PrefixValPub: "sphxvaloperpub",
    bech32PrefixConsAddr: "sphxvalcons",
    bech32PrefixConsPub: "sphxvalconspub",
  },
  currencies: [
    {
      coinDenom: "USDC",
      coinMinimalDenom: DENOMUSDC,
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "USDC",
      coinMinimalDenom: DENOMUSDC,
      coinDecimals: 6,
    },
  ],
};

export const sphxTestnetChain2Info: ChainInfo = {
  rpc: "https://rpc2.sphx.dev/",
  rest: "https://rest2.sphx.dev/",
  chainId: "sphx-testnet",
  chainName: "Sphinx Testnet 2",
  chainSymbolImageUrl: "https://avatars.githubusercontent.com/u/134250347",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "sphx",
    bech32PrefixAccPub: "sphxpub",
    bech32PrefixValAddr: "sphxvaloper",
    bech32PrefixValPub: "sphxvaloperpub",
    bech32PrefixConsAddr: "sphxvalcons",
    bech32PrefixConsPub: "sphxvalconspub",
  },
  currencies: [
    {
      coinDenom: "USDC",
      coinMinimalDenom: DENOMUSDC,
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "USDC",
      coinMinimalDenom: DENOMUSDC,
      coinDecimals: 6,
    },
  ],
};
