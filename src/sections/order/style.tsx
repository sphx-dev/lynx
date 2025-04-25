import styled from "styled-components";
import { Button, Text } from "../../components";
import { css } from "styled-components";
import { getThemeColors } from "../../theme";
import { useTranslation } from "react-i18next";
import { VerticalDivider } from "@/components/Input";
import { t } from "i18next";

export const Wrapper = styled.div`
  background: var(--bg-surface-900);
  padding: 8px;
  width: 320px;
  border-radius: 8px;
`;

export const StyledButton = styled.button`
  width: 48px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);

  background-color: var(--bg-strong-950);
  border: 1px solid var(--stroke-soft-200);
  border-radius: 8px;
  color: var(--text-sub-600);

  &:disabled {
    background-color: var(--bg-strong-800);
    border: 1px solid var(--stroke-soft-200);
    color: var(--text-sub-600);
  }

  &:not(:disabled):hover {
    border: 1px solid var(--primary-base);
    color: var(--primary-base);
    background-color: var(--bg-strong-900);
  }
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

export const PlaceOrderButton = styled(Button)<{
  $isBuy: boolean;
  smartSign: boolean;
}>`
  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);
  background-color: var(--primary-base);
  color: black;

  /* ${({ $isBuy }) => ($isBuy ? buyStyle : sellStyle)} */
  ${({ $isBuy, smartSign }) =>
    smartSign &&
    css`
      border-bottom: 1px solid;
      border-bottom-color: ${({ theme }) => ($isBuy ? "#90f767" : "#ffa700")};
    `}
`;

export const PlaceOrderMessage = () => {
  return <PlaceHolder>{t("order.youNeedAMarginAccount")}</PlaceHolder>;
};
export const PlaceHolder = styled.div`
  padding: 14px 14px 16px 14px;
  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);
  color: white;
  background: var(--warning-base);
  border: 0;
  border-radius: 12px;
`;

export const PriceEstimation = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  const { t } = useTranslation();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <Text variant="textSmall" color="strong950">
        {label}
      </Text>
      <InputWrapper>
        <StyledNonInput>{value}</StyledNonInput>
        <VerticalDivider style={{ background: "var(--stroke-sub-300)" }} />
        <Text color="disabled300">{t("USDC")}</Text>
      </InputWrapper>
    </div>
  );
};

const InputWrapper = styled.div`
  border: 1px solid var(--bg-surface-900);
  border-radius: 6px;
  width: 100%;
  padding: 7px 12px;

  background-color: var(--bg-surface-800);

  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StyledNonInput = styled.div`
  text-align: right;
  width: 100%;
  color: var(--text-bull);
  ${({ theme }) => theme.fonts.typography.textNumMd}
`;
