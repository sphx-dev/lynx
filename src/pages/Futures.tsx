import React, { useEffect, useState } from "react"
import styled from "styled-components"
import OrderInput from "../sections/order/OrderInput"
import { TradingViewContainer } from "../sections/chart/TradingViewContainer"
import OrderBook from "../sections/orderbook/OrderBook"
import AccountOrderHistory from "../sections/account/AccountOrderHistory"
import Footer from "../sections/footer"
import OrdersHistory from "../components/OrdersHistory"
import { Stack } from "../components"
import PriceBorder from "../sections/PriceBorder"
import Group from "../components/Group"
import TabComponent from "../components/Tab/Tab";
import Surface from "../Layouts/Surface";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: calc(100vh - 28px - 95px);
`

const tabs = [
  {
    title: "Order book",
    content: <OrderBook windowWidth={2000} />,
  },
  {
    title: "Trades",
    content: <h1>No Data</h1>,
  },
]
const Futures = () => {
  return (
    <Wrapper>
      <OrderInput />
      <Stack style={{ marginTop: "-50px", paddingLeft: "16px" }}>
        <PriceBorder />
        <Group style={{ flex: 1 }}>
          <Stack style={{ flex: 1, height: "100%" }}>
            <TradingViewContainer />
            <OrdersHistory />
          </Stack>
          <Surface style={{ width: "320px" }}>
            <TabComponent tabs={tabs} />
          </Surface>
        </Group>
      </Stack>
    </Wrapper>
  )
}

export default Futures
