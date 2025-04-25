import React, { FunctionComponent } from "react";
import { PriceLevelContainer } from "./PriceLevelRowStyle";
import { Text } from "../../components";
import styled from "styled-components";
import { useMarkets } from "@/hooks/useMarkets";
import { OrderType } from "../../types/orderBook";

interface PriceLevelRowProps {
  total: string;
  size: string;
  price: string;
  amount: string;
  amountSum: string;
  orderType: OrderType;
  reversedFieldsOrder: boolean;
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

const PriceLevelRow: FunctionComponent<PriceLevelRowProps> = ({
  total,
  size,
  price,
  amount,
  amountSum,
  orderType,
  reversedFieldsOrder = false,
}) => {
  const { selectedMarket } = useMarkets();
  const symbol = selectedMarket?.baseAsset;
  return (
    <PriceLevelContainer
      data-testid="price-level-row"
      $isRight={!reversedFieldsOrder}
    >
      <>
        <Label>
          <Text
            variant="textXSmall"
            color={
              orderType === OrderType.ASKS
                ? "var(--text-bear)"
                : "var(--text-bull)"
            }
          >
            {price}
          </Text>
        </Label>
        <Label>
          <Text
            variant="textXSmall"
            data-tooltip={size + " " + symbol}
            data-tooltip-top
          >
            {amount}
          </Text>
        </Label>
        <Label>
          <Text
            variant="textXSmall"
            data-tooltip={total + " " + symbol}
            data-tooltip-top
          >
            {amountSum}
          </Text>
        </Label>
      </>
    </PriceLevelContainer>
  );
};

export default PriceLevelRow;
