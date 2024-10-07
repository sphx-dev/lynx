import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { getThemeColors } from "../../theme";
import { create } from "zustand";
import { motion } from "framer-motion";

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
      role="dialog"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalContent
        role="button"
        className="modal-content"
        data-testid="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <CloseButton className="modal-close" onClick={onClose}>
          ⨯
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
  background-color: rgba(0, 0, 0, 0.5); /* Dark background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background-color: ${({ theme }) => getThemeColors(theme).background.dropdown};
  color: ${({ theme }) => getThemeColors(theme).text.primary};
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  min-width: 300px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: ${({ theme }) =>
    getThemeColors(theme).button.secondary.background.default};
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 24px;
  height: 24px;
  line-height: 24px;
  &:hover {
    background: ${({ theme }) =>
      getThemeColors(theme).button.secondary.background.hovered};
  }
  &:active {
    background: ${({ theme }) =>
      getThemeColors(theme).button.secondary.background.pressed};
  }
`;
