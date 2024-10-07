import "../i18n";
import { Provider } from "react-redux";
import { store } from "../state/store";
import { ThemeProvider } from "styled-components";
import { themes } from "../theme";
import { GrazProvider } from "graz";
import { QueryClient, QueryClientProvider } from "react-query";
import { MockKeplr } from "@keplr-wallet/provider-mock";
import { sphxLocalChainInfo } from "../constants/chainInfo";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";

const WalletExtensionMock = new MockKeplr(
  async () => {
    return new Uint8Array(0);
  },
  [
    {
      chainId: sphxLocalChainInfo.chainId,
      bech32Config: { bech32PrefixAccAddr: "sphx" },
    },
  ],
  "diary match wagon soccer worth planet sea stumble thought post easily want"
);

declare global {
  var keplr: any;
  var getOfflineSigner: () => any;
}

globalThis.keplr = WalletExtensionMock;
globalThis.getOfflineSigner = () => {
  return {
    keplr: WalletExtensionMock,
  };
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // turns retries off
      retry: false,
    },
  },
});

export const AppWrapper = ({ children }: any) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GrazProvider
          grazOptions={{
            chains: [sphxLocalChainInfo],
          }}
        >
          <ThemeProvider theme={themes["dark"]}>
            <ChildrenWrapper>
              {children}
              <div id="modal-root"></div>
            </ChildrenWrapper>
          </ThemeProvider>
        </GrazProvider>
      </QueryClientProvider>
    </Provider>
  );
};

const ChildrenWrapper = ({ children }: any) => {
  const { connect } = useChainCosmoshub();
  return (
    <>
      <div>
        <button
          data-testid="connect-test-button"
          onClick={() => connect()}
        ></button>
      </div>
      {children}
    </>
  );
};
