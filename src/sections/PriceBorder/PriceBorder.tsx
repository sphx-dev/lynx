import React from "react"
import styled from "styled-components"
import TradingPairSelector from "../../components/TraidingPairSelector"
import { Stack, Text } from "../../components"
import useTheme from "../../hooks/useTheme"
import { formatNumber } from "../../utils/format"

const Wrapper = styled.div`
  background: linear-gradient(180deg, #16353c 0%, #17484e 100%);
  display: flex;
  padding: 8px 16px;
  gap: 24px;
  width: 100%;
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: #2d5a62;
`
const Divider = styled.div`
  width: 1px;
  background-color: rgba(255, 255, 255, 0.1);
`

enum ValueType {
  ERROR = "ERROR",
  ACTIVE = "ACTIVE",
  DEFAULT = "DEFAULT",
}
interface PriceView {
  label: string
  value: string | number
  type?: ValueType
}
const PriceView = ({ label, value, type = ValueType.DEFAULT }: PriceView) => {
  const { themeColors } = useTheme()
  const colorsByType = {
    [ValueType.ACTIVE]: themeColors.text.secondaryActive,
    [ValueType.ERROR]: themeColors.text.error,
    [ValueType.DEFAULT]: themeColors.text.primary,
  }
  return (
    <Stack>
      <Text color="tertiary">{label}</Text>
      <Text variant="textNumSm" color={colorsByType[type]}>
        {value}
      </Text>
    </Stack>
  )
}

const PriceBorder = () => {
  const unit = "$"
  return (
    <Wrapper>
      <TradingPairSelector />
      <Divider />
      <PriceView
        label="Last Price"
        value={formatNumber({ value: 22987, before: unit })}
        type={ValueType.ACTIVE}
      />
      <PriceView
        label="Mark Price"
        value={formatNumber({ value: 22987.43, before: unit })}
      />
      <PriceView
        label="Spot Oracle Price"
        value={formatNumber({ value: 22987.09, before: unit })}
      />
      <PriceView
        label="24h Change"
        value={formatNumber({ value: -23, after: "%" })}
        type={ValueType.ERROR}
      />
      <PriceView
        label="Open Interest"
        value={formatNumber({ value: 22987672, before: unit })}
      />
      <PriceView
        label="24h Volume"
        value={formatNumber({ value: 2298736274, before: unit })}
      />
      <PriceView
        label="8h Funding"
        value={formatNumber({ value: 0.0032, after: "%" })}
        type={ValueType.ACTIVE}
      />
    </Wrapper>
  )
}

export default PriceBorder
