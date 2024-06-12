import React from "react";
import styled from "styled-components";
import { getThemeColors } from "../../theme";
import { Text } from "../../components";
import { useAppSelector } from "../../hooks";
import { orderBook } from "../../state/orderBookSlice";
import { formatNumber } from "../../utils/format";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border: ${({ theme }) => `1px solid ${getThemeColors(theme).border.default}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 5px 10px;
`;

const Divider = () => {
  const { spread, percentage } = useAppSelector(orderBook);
  return (
    <Container>
      <Text variant="textNumMdBold" color="secondaryActive">
        {formatNumber({ value: spread, before: "$" })}
      </Text>
      <Text variant="textNumMdBold" color="secondaryActive">
        {formatNumber({ value: percentage, after: "%" })}
      </Text>
    </Container>
  );
};

export default Divider;
