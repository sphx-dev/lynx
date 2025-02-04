import React, { FunctionComponent } from "react";
import { PriceLevelContainer } from "./PriceLevelRowStyle";
import { Text } from "../../components";
import styled from "styled-components";
import { useMarkets } from "@/hooks/useMarkets";

interface PriceLevelRowProps {
  total: string;
  size: string;
  price: string;
  amount: string;
  amountSum: string;
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

const Currency = styled.span`
  color: #ffffff89;
  margin-right: 2px;
`;

const PriceLevelRow: FunctionComponent<PriceLevelRowProps> = ({
  total,
  size,
  price,
  amount,
  amountSum,
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
          <Text variant="textNumMd">
            <Currency>$</Currency>
            {price}
          </Text>
        </Label>
        <Label>
          <Currency>$</Currency>
          <Text
            variant="textNumMd"
            data-tooltip={size + " " + symbol}
            data-tooltip-top
          >
            {amount}
          </Text>
        </Label>
        <Label>
          <Currency>$</Currency>
          <Text
            variant="textNumMd"
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
