// TODO: clean up and redo the markup based on the new design

// import Stack from "../Stack";
// import Input from "../Input";
import Popup from "./Popup/Popup";
import Group from "../Group";
import Text from "../Text";
// import { useAppSelector } from "../../hooks";
// import {
//   selectCurrentPair,
//   selectFavoriteSymbols,
//   selectFuturesList,
// } from "../../state/futuresSlice";
import Icon from "../Icon";
// import FuturesList from "./FuturesList";
// import Button from "../Button";
// import { ChangeEvent, useState } from "react";
// import { useMemo } from "react";
import { useMarkets } from "../../hooks/useMarkets";
import { getThemeColors } from "../../theme";
import styled from "styled-components";

// enum List {
//   All = "all",
//   Favorite = "favorite",
// }

interface SymbolContentProps {
  close: Function;
}
const SymbolContent = ({ close }: SymbolContentProps) => {
  // const futures = useAppSelector(selectFuturesList);
  // const favorites = useAppSelector(selectFavoriteSymbols);

  const { markets, setMarketId } = useMarkets();
  const futures = markets;

  // const [search, setSearch] = useState("");

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSearch(event.target.value);
  // };

  // const favoriteList = useMemo(() => {
  //   return futures.filter(item => favorites.includes(item.symbol));
  // }, [favorites, futures]);

  // const [list, setList] = useState(List.All);

  // const listToShow = list === List.Favorite ? favoriteList : futures;
  // const getColor = (type: List) =>
  //   list === type ? "secondaryLink" : "tertiary";

  // const filteredList = useMemo(() => {
  //   return futures.filter(
  //     item => item.ticker.toLowerCase().includes(search.trim().toLowerCase())
  //     // item.symbol.toLowerCase().includes(search.trim().toLowerCase())
  //   );
  // }, [futures, search]);

  return (
    <MenuContainer>
      <ul>
        {futures.map(item => (
          <MenuItem
            key={item.ticker}
            onClick={() => {
              setMarketId(item.id);
              close();
            }}
          >
            {item.baseAsset} / {item.quoteAsset} ({item.ticker})
          </MenuItem>
        ))}
      </ul>
    </MenuContainer>
  );

  // return (
  //   <Stack style={{ width: "480px " }} spacing={20}>
  //     <Input placeholder="Search" onChange={handleChange} value={search} />
  //     <div>
  //       <Group>
  //         <Button
  //           variant="link"
  //           color={getColor(List.All)}
  //           onClick={() => setList(List.All)}
  //         >
  //           All
  //         </Button>
  //         <Button
  //           variant="link"
  //           color={getColor(List.Favorite)}
  //           onClick={() => setList(List.Favorite)}
  //         >
  //           Favorite
  //         </Button>
  //       </Group>
  //       FUTURE LIST
  //       <FuturesList list={filteredList} closePopup={close} />
  //     </div>
  //   </Stack>
  // );
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
`;

const SymbolSelect = () => {
  // const { symbol, icon } = useAppSelector(selectCurrentPair);
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
          <Text variant="textMd">{symbol}</Text>
        </Group>
        <Icon icon="ChevronIcon" color="white" rotate="90deg" />
      </Group>
    </Popup>
  );
};

export default SymbolSelect;
