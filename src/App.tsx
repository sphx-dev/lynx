import "./App.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { ThemeInterface, themes } from "./theme";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header/Header";
import Footer from "./sections/footer";
import { Toaster } from "react-hot-toast";
import { Modal, useModalStore } from "./components/Modal/Modal";
import { DepositForm } from "./components/Modal/DepositForm";
import { WithdrawForm } from "./components/Modal/WithdrawForm";
import { useGlobalWebsocketHandler } from "./hooks/useGlobalWebsocketHandler";

function App() {
  const content = useRoutes(routes);
  const theme: ThemeInterface = themes["dark"];
  const { isOpen, closeModal, openModalType } = useModalStore();

  // Query invalidator needed to be called only in a single place
  useGlobalWebsocketHandler();

  return (
    <ThemeProvider theme={theme}>
      <Header />
      {content}
      <Footer />
      <Toaster />
      <Modal isOpen={isOpen} onClose={closeModal}>
        {openModalType === "DEPOSIT" && <DepositForm />}
        {openModalType === "WITHDRAW" && <WithdrawForm />}
      </Modal>
    </ThemeProvider>
  );
}

export default App;
