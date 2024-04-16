import React from "react"
import styled from "styled-components"
import OrderInput from "../sections/order/OrderInput"
import { Stack } from "../components"
import PriceBorder from "../sections/PriceBorder"
import { TradingViewContainer } from "../sections/chart/TradingViewContainer"
import OrdersHistory from "../components/OrdersHistory"
import { Outlet } from "react-router-dom"
import Group from "../components/Group"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: calc(100vh - 28px - 95px);
`
const BaseTemplate = () => {
  return (
    <Wrapper>
      <OrderInput />
      <Stack>
        <PriceBorder />
        <Group>
          <Stack style={{ flex: 1 }}>
            <TradingViewContainer />
            <OrdersHistory />
          </Stack>
          <OrderInput />
        </Group>
      </Stack>
    </Wrapper>
  )
}

export default BaseTemplate
