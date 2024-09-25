import styled from "styled-components";
import { Button } from "../../components";
import { css } from "styled-components";
import { getThemeColors } from "../../theme";

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.common.palette.alpha.white5};
  padding: 16px 0;
  width: 320px;
`;
export const Container = styled.div`
  padding: 0 16px;
`;
export const StyledButton = styled(Button)`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const buyStyle = css`
  background-color: ${({ theme }) =>
    getThemeColors(theme).orderButton.buy.background};
  &:hover {
    background-color: ${({ theme }) =>
      getThemeColors(theme).orderButton.buy.hover};
  }
`;

export const sellStyle = css`
  background-color: ${({ theme }) =>
    getThemeColors(theme).orderButton.sell.background};
  &:hover {
    background-color: ${({ theme }) =>
      getThemeColors(theme).orderButton.sell.hover};
  }
`;

export const PlaceOrderButton = styled(Button)<{ $isBuy: boolean }>`
  ${({ $isBuy }) => ($isBuy ? buyStyle : sellStyle)}
`;

export const PlaceOrderMessage = () => {
  return (
    <PlaceHolder>
      You need a Margin Account with funds to place an order
    </PlaceHolder>
  );
};
export const PlaceHolder = styled.div`
  text-align: center;
  padding: 16px;
  color: ${({ theme }) => getThemeColors(theme).text.primary};
  background: ${({ theme }) => getThemeColors(theme).background.button};
  border: 1px solid ${({ theme }) => getThemeColors(theme).border.default};
  border-radius: 8px;
  margin: 6px;
`;
