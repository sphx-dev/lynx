import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  ConnectButton,
  Divider,
  Group,
  Input,
  Stack,
  Switcher,
  Text,
} from "../../components";
import Surface from "../../Layouts/Surface";
import Summary from "./Summary";
import AttributionBar from "../../components/AttributionBar";
import TradingPairSelector from "../../components/TraidingPairSelector";
import TabButton from "../../components/TabButton";
import useTheme from "../../hooks/useTheme";
import { useAccount } from "wagmi";
import { useForm } from "react-hook-form";
import Colors from "../../theme/colors";
import { errorAlert, successAlert } from "../../utils/alerts";
import {
  usePlaceLimitOrderMutation,
  usePlaceMarketOrderMutation,
} from "../../utils/api/orderApi";
import { handleApiCall } from "../../utils/handleApiCall";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.common.palette.alpha.white5};
  padding: 16px 0;
  width: 320px;
`;
const Container = styled.div`
  padding: 0px 16px;
`;
const StyledButton = styled(Button)`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

enum OrderType {
  MARKET = "MARKET",
  LIMIT = "LIMIT",
  STOP = "STOP",
}

const options = [
  {
    label: "Market",
    value: OrderType.MARKET,
  },
  {
    label: "Limit",
    value: OrderType.LIMIT,
  },
];

export interface MarketOrderForm {
  volume: number;
  isBuy: boolean;
  leverage: number;
  price: number;
  takeProfit: number | null;
  stopLoss: number | null;
}

const defaultValues: MarketOrderForm = {
  volume: 0,
  isBuy: false,
  leverage: 1,
  price: 0,
  takeProfit: null,
  stopLoss: null,
};

function OrderInput() {
  const { themeColors } = useTheme();
  const { isConnected } = useAccount();
  const [orderType, setOrderType] = useState(OrderType.MARKET);
  const { handleSubmit, register, setValue, watch } = useForm({
    defaultValues,
  });
  const [placeMarketOrder] = usePlaceMarketOrderMutation();
  const [placeLimitOrder] = usePlaceLimitOrderMutation();
  const handleSwitchOrderType = (type: OrderType) => setOrderType(type);

  const isBuyPosition = watch("isBuy");

  const handleChangeOrderSide = (value: boolean) => setValue("isBuy", value);
  const handleChangeLeverage = (value: number) => setValue("leverage", value);

  const placeOrder = async (values: MarketOrderForm) => {
    const handler =
      orderType === OrderType.MARKET ? placeMarketOrder : placeLimitOrder;
    const response = await handler(values);
    handleApiCall(
      response,
      () => errorAlert("Something went wrong"),
      () => successAlert("Order placed")
    );
  };

  return (
    <Surface
      style={{
        paddingBottom: "32px",
        borderTop: `1px solid ${themeColors.border.default}`,
      }}
    >
      <Stack justify="apart" fullHeight>
        <Wrapper>
          <Container style={{ paddingBottom: "16px" }}>
            <TradingPairSelector />
          </Container>
          <Divider />
          <Container style={{ padding: "10px 16px" }}>
            <Group align="center" position="apart">
              {!isConnected && (
                <Stack spacing={2}>
                  <Text variant="text2Xs">No wallet connected</Text>
                  <Text variant="text2Xs" color="primaryLink">
                    Connect wallet to deposit margin
                  </Text>
                </Stack>
              )}
              <ConnectButton size="small" />
            </Group>
          </Container>
          <Stack spacing={20}>
            <form onSubmit={handleSubmit(placeOrder)}>
              <Stack spacing={20}>
                <Group spacing={0}>
                  <TabButton
                    active={isBuyPosition}
                    onClick={() => handleChangeOrderSide(true)}
                    type="button"
                    style={{ flex: 1 }}
                  >
                    LONG
                  </TabButton>
                  <TabButton
                    active={!isBuyPosition}
                    onClick={() => handleChangeOrderSide(false)}
                    type="button"
                    style={{ flex: 1 }}
                  >
                    SHORT
                  </TabButton>
                </Group>
                <Container>
                  <Stack spacing={20}>
                    <Switcher
                      onChange={handleSwitchOrderType}
                      options={options}
                      name="orderType"
                    />
                    {orderType !== OrderType.MARKET && (
                      <Input
                        {...register("price")}
                        label="Price"
                        rightSide="USD"
                      />
                    )}
                    <Input
                      {...register("volume")}
                      label="Size"
                      rightSide="USD"
                    />
                    <div style={{ position: "relative" }}>
                      <Group align="end">
                        <Input
                          {...register("leverage")}
                          style={{ minWidth: "60px" }}
                          label="Leverage"
                        />
                        <Group align="end" style={{ flex: 1 }}>
                          <StyledButton
                            type="button"
                            onClick={() => handleChangeLeverage(2)}
                          >
                            2x
                          </StyledButton>
                          <StyledButton
                            type="button"
                            onClick={() => handleChangeLeverage(5)}
                          >
                            5x
                          </StyledButton>
                          <StyledButton
                            type="button"
                            onClick={() => handleChangeLeverage(25)}
                          >
                            25x
                          </StyledButton>
                          <StyledButton
                            type="button"
                            onClick={() => handleChangeLeverage(50)}
                          >
                            50x
                          </StyledButton>
                        </Group>
                      </Group>
                    </div>
                    <Input
                      {...register("takeProfit")}
                      label="Take Profit"
                      rightSide="USD"
                    />
                    <Input
                      {...register("stopLoss")}
                      label="Stop Loss"
                      rightSide="USD"
                    />
                    {!isConnected && <ConnectButton />}
                    {isConnected && (
                      <Button
                        style={{
                          backgroundColor: isBuyPosition
                            ? Colors.common.positive1
                            : Colors.common.negative3,
                        }}
                      >
                        Place Order
                      </Button>
                    )}
                    <Summary />
                  </Stack>
                </Container>
              </Stack>
            </form>
          </Stack>
        </Wrapper>
        <Container>
          <AttributionBar />
        </Container>
      </Stack>
    </Surface>
  );
}

export default OrderInput;
