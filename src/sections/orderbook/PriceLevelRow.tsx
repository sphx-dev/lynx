import React, { FunctionComponent } from "react";
import { PriceLevelContainer } from "./PriceLevelRowStyle";
import { Text } from "../../components";
import styled from "styled-components";

interface PriceLevelRowProps {
  total: string;
  size: string;
  price: string;
  reversedFieldsOrder: boolean;
  windowWidth: number;
}

const Label = styled.div`
  flex: 1;
`;

const PriceLevelRow: FunctionComponent<PriceLevelRowProps> = ({
  total,
  size,
  price,
  reversedFieldsOrder = false,
  windowWidth,
}) => {
  return (
    <PriceLevelContainer
      data-testid="price-level-row"
      $isRight={!reversedFieldsOrder}
      $windowWidth={windowWidth}
    >
      <>
        <Label>
          <Text variant="textNumMd">${price}</Text>
        </Label>
        <Label>
          <Text variant="textNumMd">{size}</Text>
        </Label>
        <Label>
          <Text variant="textNumMd">${total}</Text>
        </Label>
      </>
    </PriceLevelContainer>
  );
};

export default PriceLevelRow;
