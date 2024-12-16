import React, { FunctionComponent } from "react";
import { PriceLevelContainer } from "./PriceLevelRowStyle";
import { Text } from "../../components";
import styled from "styled-components";

interface PriceLevelRowProps {
  total: string;
  size: string;
  price: string;
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
  reversedFieldsOrder = false,
}) => {
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
          <Text variant="textNumMd">{size}</Text>
        </Label>
        <Label>
          <Text variant="textNumMd">{total}</Text>
        </Label>
      </>
    </PriceLevelContainer>
  );
};

export default PriceLevelRow;
