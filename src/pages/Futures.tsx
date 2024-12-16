import React from "react";
import styled from "styled-components";
import OrderInput from "../sections/order/OrderInput";
import { TradingViewContainer } from "../sections/chart/TradingViewContainer";
import OrderBook from "../sections/orderbook/OrderBook";
import OrdersHistory from "../sections/ordersTabs";
import { Stack } from "../components";
import PriceBorder from "../sections/priceBorder";
import Group from "../components/Group";
import TabComponent from "../components/Tab/Tab";
import Surface from "../ui/Layouts/Surface";
import { ActionBarContainer } from "../components/AttributionBar/ActionBar";
import Text from "../components/Text";
import logo from "../assets/icons/logo-small.svg";
import useTheme from "../hooks/useTheme";
import Trades from "../sections/trades/Trades";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: calc(100vh - 28px - 100px);
  gap: 16px;
`;
const Logo = () => {
  const { themeColors } = useTheme();
  return (
    <ActionBarContainer
      align="center"
      style={{ width: "290px", margin: "0 auto", padding: "0 32px" }}
    >
      <Text color={themeColors.actionBar.text}>SPHINX OFFICIAL</Text>
      <img alt="lynx logo" src={logo} />
      <Text color={themeColors.actionBar.text}>ORDER BOOK</Text>
    </ActionBarContainer>
  );
};
const tabs = [
  {
    title: "Order book",
    content: <OrderBook />,
  },
  {
    title: "Trades",
    content: <Trades />,
  },
];

const Futures = () => {
  return (
    <Wrapper>
      <OrderInput />
      <Stack margin-top="100px" style={{ marginTop: "-50px" }}>
        <PriceBorder />
        <Group style={{ flex: 1 }}>
          <Stack style={{ flex: 1 }} fullHeight>
            <TradingViewContainer />
            <OrdersHistory />
          </Stack>
          <Surface
            style={{
              width: "320px",
              marginLeft: "16px",
              paddingBottom: "32px",
            }}
          >
            <Stack justify="apart" fullHeight>
              <div style={{ flex: 1 }}>
                <TabComponent tabs={tabs} />
              </div>
              <Logo />
            </Stack>
          </Surface>
        </Group>
      </Stack>
    </Wrapper>
  );
};

export default Futures;
