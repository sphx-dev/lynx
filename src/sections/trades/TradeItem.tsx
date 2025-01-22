import { Side } from "../../types/order";
import { Text } from "../../components";
import styled from "styled-components";
import { showTime } from "../../utils/date";
import { formatDollars } from "@/utils/format";

interface Props {
  price: string;
  quantity: number;
  date: string;
  side: Side;
}
const Label = styled.div`
  flex: 1;
  text-align: center;
  &:first-child {
    text-align: left;
  }
  &:last-child {
    text-align: right;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  column-gap: 0px;
  padding: 0.3rem 0;
`;

const TradeItem = ({ price, quantity, date, side }: Props) => {
  return (
    <Row>
      <Label>
        <Text color={side} variant="textNumMd">
          {formatDollars(+price, "symbol")}
        </Text>
      </Label>
      <Label>
        <Text variant="textNumMd">{quantity}</Text>
      </Label>
      <Label>
        <Text variant="textNumMd">{showTime(date)}</Text>
      </Label>
    </Row>
  );
};

export default TradeItem;
