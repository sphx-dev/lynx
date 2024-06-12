import Stack from "../Stack";
import Input from "../Input";
import Popup from "../Popup/Popup";
import Group from "../Group";
import Text from "../Text";
import { useAppSelector } from "../../hooks";
import {
  selectCurrentPair,
  selectFavoriteSymbols,
  selectFuturesList,
} from "../../state/futuresSlice";
import Icon from "../Icon";
import FuturesList from "./FuturesList";
import Button from "../Button";
import { ChangeEvent, useMemo, useState } from "react";

enum List {
  All = "all",
  Favorite = "favorite",
}

interface SymbolContentProps {
  close: Function;
}
const SymbolContent = ({ close }: SymbolContentProps) => {
  const futures = useAppSelector(selectFuturesList);
  const favorites = useAppSelector(selectFavoriteSymbols);
  const [search, setSearch] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const favoriteList = useMemo(() => {
    return futures.filter(item => favorites.includes(item.symbol));
  }, [favorites, futures]);

  const [list, setList] = useState(List.All);

  const listToShow = list === List.Favorite ? favoriteList : futures;
  const getColor = (type: List) =>
    list === type ? "secondaryLink" : "tertiary";

  const filteredList = useMemo(() => {
    return listToShow.filter(item =>
      item.symbol.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [listToShow, search]);

  return (
    <Stack style={{ width: "480px " }} spacing={20}>
      <Input placeholder="Search" onChange={handleChange} value={search} />
      <div>
        <Group>
          <Button
            variant="link"
            color={getColor(List.All)}
            onClick={() => setList(List.All)}
          >
            All
          </Button>
          <Button
            variant="link"
            color={getColor(List.Favorite)}
            onClick={() => setList(List.Favorite)}
          >
            Favorite
          </Button>
        </Group>
        <FuturesList list={filteredList} closePopup={close} />
      </div>
    </Stack>
  );
};

const SymbolSelect = () => {
  const { symbol, icon } = useAppSelector(selectCurrentPair);
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
