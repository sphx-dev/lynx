import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { create } from "zustand";
import { motion } from "framer-motion";
import { RiCloseLine } from "@remixicon/react";

// {
//   DEPOSIT: "DEPOSIT",
//   WITHDRAW: "WITHDRAW",
// };

// ModalType is a enum with two values: DEPOSIT and WITHDRAW
export type ModalType = "DEPOSIT" | "WITHDRAW";

type ModalStore = {
  isOpen: boolean;
  openModalType: ModalType | null;
  modalProps: any;
  openModal: (type: ModalType, props?: any) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>(set => ({
  isOpen: false,
  openModalType: null,
  modalProps: null,
  openModal: (type: ModalType, props?) =>
    set({ isOpen: true, openModalType: type, modalProps: props }),
  closeModal: () =>
    set({ isOpen: false, openModalType: null, modalProps: null }),
}));

export const Modal = ({
  children,
  isOpen,
  onClose,
}: PropsWithChildren<{ isOpen: boolean; onClose: () => void }>) => {
  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay
      className="modal-overlay"
      role="alertdialog"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalContent
        role="dialog"
        className="modal-content"
        data-testid="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <CloseButton className="modal-close" onClick={onClose}>
          {/* ⨯ */}
          <RiCloseLine
            style={{
              width: "19px",
              height: "19px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>,
    document.getElementById("modal-root") as HTMLElement
  );
};

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--overlay); /* Dark background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background-color: var(--bg-strong-950);
  border: 1px solid var(--stroke-soft-200);
  border-radius: 8px;
  color: var(--text-strong-950);
  padding: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  min-width: 300px;
`;

const CloseButton = styled.button`
  background-color: var(--bg-strong-950);
  border: 1px solid var(--stroke-soft-200);
  border-radius: 8px;
  color: var(--icon-sub-600);

  position: absolute;
  top: 7px;
  right: 7px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  &:hover {
    background: var(--stroke-soft-200);
  }
  &:active {
    background: var(--stroke-soft-200);
  }
`;
