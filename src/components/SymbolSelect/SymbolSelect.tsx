// TODO: clean up and redo the markup based on the new design

import Popup from "./Popup/Popup";
import Group from "../Group";
import Text from "../Text";
import Icon from "../Icon";
import { useMarkets } from "../../hooks/useMarkets";
import { getThemeColors } from "../../theme";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface SymbolContentProps {
  close: Function;
}
const SymbolContent = ({ close }: SymbolContentProps) => {
  const { t } = useTranslation();

  const { markets, setMarketId } = useMarkets();
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
  ${({ theme }) => theme?.fonts?.typography?.actionMd}
  color: ${({ theme }) => getThemeColors(theme)?.text?.tertiary};
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
  &:focus-visible {
    outline: 1px solid
      ${({ theme }) => getThemeColors(theme)?.input?.primary?.border?.focused};
  }
`;

const SymbolSelect = () => {
  const { t } = useTranslation();

  const { selectedMarket, symbol, icon } = useMarkets();

  if (!selectedMarket) return null;

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
          <img src={icon} alt="pairIcon" width={30} />
          <Text variant="textMd">{t(symbol || "")}</Text>
        </Group>
        <Icon icon="ChevronIcon" color="white" rotate="90deg" />
      </Group>
    </Popup>
  );
};

export default SymbolSelect;
