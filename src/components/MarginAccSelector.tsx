import styled from "styled-components";
import { useChainCosmoshub } from "../hooks/useChainCosmoshub";
import { useMarginAccount } from "../hooks/useMarginAccounts";
import Button, { ButtonProps } from "./Button";

import { useEffect, useMemo, useRef, useState } from "react";
import { getThemeColors } from "../theme";
import { useModalStore } from "./Modal/Modal";
import { useBalances } from "../hooks/useBalance";
import { DENOMUSDC, PRECISION } from "@/constants";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import config from "@/config";
import { formatDollars } from "@/utils/format";

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
            <Link
              style={{ color: "#00ffee", padding: "5px 0" }}
              to={`${config.VITE_EXPLORER_URL}/accounts/${item.address}`}
              target="_blank"
            >
              ⧉
            </Link>
          </MenuItem>
        ))}
      </ul>
      <ButtonWrapper>
        <Button onClick={() => openModal("DEPOSIT")}>{t("deposit")}</Button>
        <Button variant="link" onClick={() => openModal("WITHDRAW")}>
          {t("withdraw")}
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
  box-shadow: 0px 5px 20px black;
`;

const MenuItem = styled.li`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  ${({ theme }) => theme?.fonts?.typography?.actionMd}
  cursor: pointer;
  list-style-type: none;
  padding: 0px 16px;
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

const MenuItemLabel = styled.label`
  padding: 5px 0px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 230px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 8px;
  padding: 10px 16px 0 16px;
`;
