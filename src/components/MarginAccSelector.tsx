import styled from "styled-components";
import { useChainCosmoshub } from "../hooks/useChainCosmoshub";
import { useMarginAccount } from "../hooks/useMarginAccounts";
import Button, { ButtonProps } from "./Button";

import { useEffect, useRef, useState } from "react";
import { getBalance } from "../utils/getBalance";
import { getThemeColors } from "../theme";
import { useModalStore } from "./Modal/Modal";

export const MarginAccSelector = ({
  size,
  ...props
}: ButtonProps & { size: string }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  useEffect(() => {
    const eventListener = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("click", eventListener);

    return () => {
      document.removeEventListener("click", eventListener);
    };
  }, []);

  const { address } = useChainCosmoshub();
  const { marginAccounts, selectedAccount, setSelectedIndex, selectedIndex } =
    useMarginAccount(address);

  const [balances, setBalances] = useState<any[]>([]);
  useEffect(() => {
    if (marginAccounts && marginAccounts.length) {
      const promises = marginAccounts.map(account =>
        getBalance(account.address, "uusdc")
      );
      Promise.all(promises).then(balances => {
        setBalances(balances);
      });
    }
  }, [marginAccounts]);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  if (!marginAccounts || !marginAccounts.length) {
    return <></>;
  }

  return (
    <>
      {!!selectedAccount && (
        <Button
          ref={buttonRef}
          onClick={() => {
            const buttonCoords = buttonRef.current?.getBoundingClientRect();
            if (!buttonCoords) return;
            setX(buttonCoords.x + buttonCoords.width / 2);
            setY(buttonCoords.y + buttonCoords.height + 2);
            setMenuVisible(menuVisible => !menuVisible);
          }}
          size={size}
          {...props}
          title={selectedAccount?.address}
        >
          Account #{selectedAccount?.id?.number}
        </Button>
      )}
      <DropdownMenu
        x={x}
        y={y}
        selectedIndex={selectedIndex}
        show={menuVisible}
        items={marginAccounts.map(
          (account, index) =>
            `Account #${account.id?.number}` +
            (balances?.[index]?.amount
              ? ` (${balances?.[index]?.amount / 1e6} USDC)`
              : "")
        )}
        onSelect={index => {
          if (marginAccounts) {
            setSelectedIndex(index);
          }
        }}
      />
    </>
  );
};

const DropdownMenu = ({
  items,
  selectedIndex,
  show,
  onSelect,
  x,
  y,
}: {
  items: string[];
  selectedIndex: number;
  show: boolean;
  onSelect: (index: number) => void;
  x: number;
  y: number;
}) => {
  const { openModal } = useModalStore();
  console.log("typeof", typeof show);

  return (
    <DropdawnWindow $show={show} style={{ top: y, left: x }}>
      <ul>
        {items.map((item, index) => (
          <MenuItem
            key={item}
            className={selectedIndex === index ? "selected" : ""}
            onClick={() => onSelect(index)}
          >
            {item}
          </MenuItem>
        ))}
      </ul>
      <ButtonWrapper>
        <Button onClick={() => openModal("DEPOSIT")}>Deposit</Button>
        <Button variant="link" onClick={() => openModal("WITHDRAW")}>
          Withdraw
        </Button>
      </ButtonWrapper>
    </DropdawnWindow>
  );
};

const DropdawnWindow = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  position: absolute;
  z-index: 1;
  background-color: ${({ theme }) =>
    getThemeColors(theme)?.background?.dropdown};
  color: ${({ theme }) => getThemeColors(theme)?.text?.tertiary};
  flex-direction: column;
  gap: 10px;
  min-width: 200px;
  transform: translateX(-50%);
  border-radius: 8px;
  padding: 12px 0;
`;

const MenuItem = styled.li`
  ${({ theme }) => theme?.fonts?.typography?.actionMd}
  cursor: pointer;
  list-style-type: none;
  padding: 4px 16px;
  &.selected {
    background-color: ${({ theme }) =>
      getThemeColors(theme)?.input?.primary?.background?.hovered};
    color: ${({ theme }) => getThemeColors(theme)?.text?.primary};
  }
  &:hover {
    background-color: ${({ theme }) =>
      getThemeColors(theme)?.input?.primary?.background?.hovered};
    color: ${({ theme }) => getThemeColors(theme)?.text?.primary};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px 16px 0 16px;
`;
