import styled from "styled-components";
import OrderInput from "../sections/order/OrderInput";
import { TradingViewContainer } from "../sections/chart/TradingViewContainer";
import OrderBook from "../sections/orderbook/OrderBook";
import OrdersTabs from "../sections/ordersTabs";
import { Stack } from "../components";
import PriceBorder from "../sections/priceBorder";
import TabComponent from "../components/Tab/Tab";
import Trades from "../sections/trades/Trades";

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
    <>
      <PriceBorder />

      <MainGroup>
        <Stack style={{ flex: 1 }} fullHeight>
          <TradingViewContainer />
          <OrdersTabs />
        </Stack>
        <TabsGroup>
          <TabComponent id="futures-tabs" tabs={tabs} />
        </TabsGroup>
        <OrderInput />
      </MainGroup>
    </>
  );
};

export default Futures;

const MainGroup = styled.div`
  display: grid;
  grid-template-columns: calc(100vw - 640px - 32px) 320px 320px;
  gap: 8px;
  padding: 8px;
  min-height: calc(100vh - 168px);
`;

const TabsGroup = styled.div`
  width: 320px;
  padding: 8px;
  border-radius: 8px;
  background: var(--bg-surface-900);
`;
