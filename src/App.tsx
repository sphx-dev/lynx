import { PropsWithChildren } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { ThemeInterface, themes } from "./theme";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./sections/footer";
import { Toaster } from "react-hot-toast";
import { useGetAccountQuery } from "./utils/api/accountApi";
import { useMediaQuery } from "react-responsive";
import OnlyDesktopMessage from "./components/OnlyDesktopMessage";
import { BREAK_POINTS } from "./constants";
import { GrazProvider } from "graz";
import { useChainCosmoshub } from "./hooks/useChainCosmoshub";
import { getChain } from "./config";
import { WebSocketProvider } from "./hooks/useWebsocket";
import { Modal, useModalStore } from "./components/Modal/Modal";
import { DepositForm } from "./components/Modal/DepositForm";
import { WithdrawForm } from "./components/Modal/WithdrawForm";
import { QueryClient, QueryClientProvider } from "react-query";

const Desktop = ({ children }: PropsWithChildren) => {
  const isDesktop = useMediaQuery({ minWidth: BREAK_POINTS.MOBILE_MIN_WIDTH });
  return isDesktop ? children : null;
};

const AnotherDevices = ({ children }: PropsWithChildren) => {
  const isBelowDesktop = useMediaQuery({
    maxWidth: BREAK_POINTS.MOBILE_MIN_WIDTH - 1,
  });
  return isBelowDesktop ? children : null;
};

const AppInitializtion = ({ children }: PropsWithChildren) => {
  const { isConnected } = useChainCosmoshub();

  useGetAccountQuery(undefined, { skip: !isConnected });

  return children;
};

const queryClient = new QueryClient();

function App() {
  const content = useRoutes(routes);
  const theme: ThemeInterface = themes["dark"];
  const { isOpen, closeModal, openModalType } = useModalStore();

  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <GrazProvider
          grazOptions={{
            chains: [getChain()],
          }}
        >
          <ThemeProvider theme={theme}>
            <AppInitializtion>
              <Desktop>
                <Header />
                {content}
                <Footer />
                <Toaster />
                <Modal isOpen={isOpen} onClose={closeModal}>
                  {openModalType === "DEPOSIT" && <DepositForm />}
                  {openModalType === "WITHDRAW" && <WithdrawForm />}
                </Modal>
              </Desktop>
              <AnotherDevices>
                <OnlyDesktopMessage />
              </AnotherDevices>
            </AppInitializtion>
          </ThemeProvider>
        </GrazProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default App;
