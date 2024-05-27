import React from "react";
import styled from "styled-components";
import { Stack, Text } from "../../components";
import useTheme from "../../hooks/useTheme";
import { formatNumber } from "../../utils/format";
import { useAppSelector } from "../../hooks";
import { selectCurrentPair } from "../../state/futuresSlice";
import SymbolSelect from "../../components/SymbolSelect/SymbolSelect";

const Wrapper = styled.div`
  background: linear-gradient(180deg, #16353c 0%, #17484e 100%);
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 24px;
  width: 100%;
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: #2d5a62;
  margin-bottom: 12px;
`;
const Divider = styled.div`
  width: 1px;
  background-color: rgba(255, 255, 255, 0.1);
`;

enum ValueType {
  ERROR = "ERROR",
  ACTIVE = "ACTIVE",
  DEFAULT = "DEFAULT",
}
interface PriceView {
  label: string;
  value: string | number;
  type?: ValueType;
}

// eslint-disable-next-line
const PriceView = ({ label, value, type = ValueType.DEFAULT }: PriceView) => {
  const { themeColors } = useTheme();
  const colorsByType = {
    [ValueType.ACTIVE]: themeColors.text.secondaryActive,
    [ValueType.ERROR]: themeColors.text.error,
    [ValueType.DEFAULT]: themeColors.text.primary,
  };
  return (
    <Stack>
      <Text color="tertiary">{label}</Text>
      <Text variant="textNumSm" color={colorsByType[type]}>
        {value}
      </Text>
    </Stack>
  );
};

const PriceBorder = () => {
  const unit = "$";
  const { price, volume, changeLastDay } = useAppSelector(selectCurrentPair);
  return (
    <Wrapper>
      <SymbolSelect />
      <Divider />
      <PriceView
        label="Last Price"
        value={formatNumber({ value: +price, before: unit })}
        type={ValueType.ACTIVE}
      />
      <PriceView
        label="Mark Price"
        value={formatNumber({ value: +price, before: unit })}
      />
      <PriceView
        label="Spot Oracle Price"
        value={formatNumber({ value: +price, before: unit })}
      />
      <PriceView
        label="24h Change"
        value={formatNumber({ value: +changeLastDay, after: "%" })}
        type={+changeLastDay > 0 ? ValueType.ACTIVE : ValueType.ERROR}
      />
      <PriceView
        label="Open Interest"
        value={formatNumber({ value: 22987672, before: unit })}
      />
      <PriceView
        label="24h Volume"
        value={formatNumber({ value: +volume, before: unit })}
      />
      <PriceView
        label="8h Funding"
        value={formatNumber({ value: 0.0032, after: "%" })}
        type={ValueType.ACTIVE}
      />
    </Wrapper>
  );
};

export default PriceBorder;
