import styled from "styled-components";
import { useChainCosmoshub } from "../hooks/useChainCosmoshub";
import { useMarginAccount } from "../hooks/useMarginAccounts";

import { useEffect, useMemo, useRef, useState } from "react";
import { useModalStore } from "./Modal/Modal";
import { useBalances } from "../hooks/useBalance";
import { DENOMUSDC, PRECISION } from "@/constants";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import config from "@/config";
import { formatDollars } from "@/utils/format";
import { Button } from "./ButtonV2/Button";

export const MarginAccSelector = () => {
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

  const balanceQueries = useMemo(() => {
    if (marginAccounts?.length) {
      return marginAccounts.map(account => ({
        address: account.address,
        denom: DENOMUSDC,
      }));
    }
    return [];
  }, [marginAccounts]);

  const { balances } = useBalances(balanceQueries);

  const itemList = useMemo(() => {
    return marginAccounts?.map((account, index) => {
      let label = `Account #${account.id?.number}`;
      const balance = balances?.[index]?.amount;

      return { label, balance, address: account.address };
    });
  }, [marginAccounts, balances]);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  if (!marginAccounts?.length) {
    return <></>;
  }

  return (
    <>
      {!!selectedAccount && (
        <Button
          data-testid="margin-acc-selector"
          ref={buttonRef}
          onClick={() => {
            const buttonCoords = buttonRef.current?.getBoundingClientRect();
            if (!buttonCoords) return;
            setX(buttonCoords.x - buttonCoords.width);
            setY(buttonCoords.y + buttonCoords.height + 2);
            setMenuVisible(menuVisible => !menuVisible);
          }}
          size="xxsmall"
          type="neutral"
          option="stroke"
          title={selectedAccount?.address}
        >
          Account #{selectedAccount?.id?.number} v
        </Button>
      )}
      <DropdownMenu
        x={x}
        y={y}
        selectedIndex={selectedIndex}
        show={menuVisible}
        items={itemList}
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
  items: { label: string; balance: number | undefined; address: string }[];
  selectedIndex: number;
  show: boolean;
  onSelect: (index: number) => void;
  x: number;
  y: number;
}) => {
  const { t } = useTranslation();
  const { openModal } = useModalStore();

  return (
    <DropdawnWindow $show={show} style={{ top: y, left: x }}>
      <ul>
        {items.map((item, index) => (
          <MenuItem
            key={item.address}
            className={selectedIndex === index ? "selected" : ""}
          >
            <MenuItemLabel
              data-testid={"margin-acc-selector-item-" + (index + 1)}
              onClick={() => onSelect(index)}
            >
              <span>{item.label}</span>{" "}
              <span style={{ fontWeight: "bold" }}>
                {item?.balance ? formatDollars(item?.balance / PRECISION) : ""}
              </span>
            </MenuItemLabel>
            <ExternalLink
              to={`${config.VITE_EXPLORER_URL}/accounts/${item.address}`}
              target="_blank"
            ></ExternalLink>
          </MenuItem>
        ))}
      </ul>
      <ButtonWrapper>
        <StyledButton onClick={() => openModal("DEPOSIT")}>
          {t("deposit")}
        </StyledButton>
        <StyledButton onClick={() => openModal("WITHDRAW")}>
          {t("withdraw")}
        </StyledButton>
      </ButtonWrapper>
    </DropdawnWindow>
  );
};

const DropdawnWindow = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  position: absolute;
  z-index: 1;
  background-color: var(--bg-strong-950);
  color: var(--text-tertiary);
  flex-direction: column;
  gap: 10px;
  min-width: 200px;
  transform: translateX(-50%);
  border-radius: 12px;
  padding: 8px;
  border: 1px solid var(--stroke-soft-200);
`;

const MenuItem = styled.li`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);
  color: var(--text-strong-950);
  cursor: pointer;
  list-style-type: none;
  padding: 0px 16px;
  border-radius: 8px;
  &.selected {
    background-color: var(--bg-surface-900);
  }
  &:hover {
    background-color: var(--bg-surface-900);
  }
`;

const MenuItemLabel = styled.label`
  padding: 5px 0px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 230px;
`;

const ExternalLink = styled(Link)`
  display: inline-block;
  color: #00ffee;
  width: 30px;
  text-decoration: none;
  position: relative;
  height: 30px;

  &:before {
    position: absolute;
    content: "⧉";
    font-size: 15px;
    top: 50%;
    left: 50%;
    transition: transform 0.25s;
    transform: translate(-50%, -50%);
  }
  &:hover::before {
    transform: translate(-50%, -50%) scale(1.25);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 6px;
`;

const StyledButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);
  background-color: var(--bg-strong-950);
  color: var(--primary-base);
  border: 1px solid var(--primary-base);
  border-radius: 4px;
  height: 32px;

  cursor: pointer;
  &:hover {
    background-color: var(--bg-strong-900);
  }
`;
