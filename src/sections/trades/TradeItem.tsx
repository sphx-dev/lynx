import React from "react";
import { Side } from "../../types/order";
import { Group, Text } from "../../components";
import styled from "styled-components";
import { showTime } from "../../utils/date";
import { displayPrice } from "../../utils/format";

interface Props {
  price: string;
  quantity: number;
  date: string;
  side: Side;
}
const Label = styled.div`
  flex: 1;
`;

const TradeItem = ({ price, quantity, date, side }: Props) => {
  return (
    <Group spacing={0} style={{ padding: "0.3rem 0" }}>
      <Label>
        <Text color={side} variant="textNumMd">
          {displayPrice(+price, "$")}
        </Text>
      </Label>
      <Label>
        <Text variant="textNumMd">{quantity}</Text>
      </Label>
      <Label>
        <Text variant="textNumMd">{showTime(date)}</Text>
      </Label>
    </Group>
  );
};

export default TradeItem;
