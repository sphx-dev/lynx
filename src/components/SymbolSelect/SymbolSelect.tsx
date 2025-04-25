// TODO: clean up and redo the markup based on the new design

import React from "react";
import Popup from "./Popup/Popup";
import Group from "../Group";
import Text from "../Text";
import { useMarkets } from "../../hooks/useMarkets";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { RiArrowDropDownLine } from "@remixicon/react";

interface SymbolContentProps {
  close: Function;
}
const SymbolContent = ({ close }: SymbolContentProps) => {
  const { t } = useTranslation();

  const { markets, setMarketId, selectedMarketId } = useMarkets();
  const futures = markets;

  return (
    <MenuContainer>
      <ul>
        {futures.map(item => (
          <MenuItem
            tabIndex={0}
            key={item.ticker}
            onClick={() => {
              setMarketId(item.id);
              close();
            }}
            className={selectedMarketId === item.id ? "selected" : ""}
          >
            {t(item.baseAsset)} / {t(item.quoteAsset)} ({t(item.ticker)})
          </MenuItem>
        ))}
      </ul>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  min-width: 288px;
`;

const MenuItem = styled.li`
  font-family: var(--text-small-font-family);
  font-weight: var(--text-small-font-weight);
  font-size: var(--text-small-font-size);
  line-height: var(--text-small-line-height);
  color: var(--text-strong-950);

  cursor: pointer;
  list-style-type: none;
  padding: 4px 16px;
  &.selected {
    background-color: var(--bg-surface-900);
    color: var(--text-sub-600);
  }
  &:hover {
    background-color: var(--bg-surface-800);
    color: var(--text-sub-600);
  }
  &:focus-visible {
    outline: 1px solid var(--text-sub-600);
  }
`;

const SymbolSelect = () => {
  const { selectedMarket, symbol, icon } = useMarkets();

  if (!selectedMarket) return null;

  return <SymbolSelectView icon={icon} symbol={symbol!} />;
};

export default SymbolSelect;
const SymbolSelectView = React.memo(
  ({ icon, symbol }: { icon: string; symbol: string }) => {
    const { t } = useTranslation();
    return (
      <Popup
        content={closePopup => <SymbolContent close={closePopup} />}
        placement="bottom-start"
      >
        <Group
          style={{ cursor: "pointer" }}
          fluid
          align="center"
          position="apart"
        >
          <Group align="center">
            <img
              src={icon}
              alt="pairIcon"
              width={24}
              style={{ minHeight: "24px" }}
            />
            <Text variant="textLarge">{t(symbol || "---")}</Text>
          </Group>
          <DropDownButton>
            <RiArrowDropDownLine
              size={25}
              color="var(--icon-sub-600)"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </DropDownButton>
        </Group>
      </Popup>
    );
  }
);

const DropDownButton = styled.div`
  border-radius: 50%;
  border: 1px solid var(--stroke-soft-200);
  width: 24px;
  height: 24px;
  position: relative;
`;
