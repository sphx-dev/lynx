import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
import TabButton from "../../components/TabButton";
import useTheme from "../../hooks/useTheme";
import { useAccount } from "wagmi";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { errorAlert, successAlert } from "../../utils/alerts";
import {
  usePlaceLimitOrderMutation,
  usePlaceMarketOrderMutation,
} from "../../utils/api/orderApi";
import { handleApiCall } from "../../utils/handleApiCall";
import { MESSAGE } from "../../constants/validation";
import SymbolSelect from "../../components/SymbolSelect/SymbolSelect";
import { useAppSelector } from "../../hooks";
import { selectMarketId } from "../../state/futuresSlice";
import { OrderType } from "../../types/order";
import { getThemeColors } from "../../theme";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.common.palette.alpha.white5};
  padding: 16px 0;
  width: 320px;
`;
const Container = styled.div`
  padding: 0 16px;
`;
const StyledButton = styled(Button)`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const buyStyle = css`
  background-color: ${({ theme }) =>
    getThemeColors(theme).orderButton.buy.background};
  &:hover {
    background-color: ${({ theme }) =>
      getThemeColors(theme).orderButton.buy.hover};
  }
`;

const sellStyle = css`
  background-color: ${({ theme }) =>
    getThemeColors(theme).orderButton.sell.background};
  &:hover {
    background-color: ${({ theme }) =>
      getThemeColors(theme).orderButton.sell.hover};
  }
`;

const PlaceOrderButton = styled(Button)<{ $isBuy: boolean }>`
  ${({ $isBuy }) => ($isBuy ? buyStyle : sellStyle)}
`;

const TP_SL_TYPES_MAP = {
  [OrderType.MARKET]: {
    takeProfit: OrderType.TAKE_PROFIT_MARKET,
    stopLoss: OrderType.STOP_LOSS_MARKET,
  },
  [OrderType.LIMIT]: {
    takeProfit: OrderType.TAKE_PROFIT_LIMIT,
    stopLoss: OrderType.STOP_LOSS_LIMIT,
  },
};

type MainOrderType = OrderType.MARKET | OrderType.LIMIT;

const options: [
  { label: string; value: OrderType.MARKET },
  { label: string; value: OrderType.LIMIT }
] = [
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
  orderType: MainOrderType;
}

const defaultValues: MarketOrderForm = {
  volume: 0,
  isBuy: true,
  leverage: 1,
  price: 0,
  takeProfit: null,
  stopLoss: null,
  orderType: OrderType.MARKET,
};

const schema = (markPrice: number) =>
  yup.object().shape({
    volume: yup
      .number()
      .typeError(MESSAGE.number)
      .moreThan(0)
      .required(MESSAGE.required),
    price: yup.number().when("orderType", {
      is: OrderType.LIMIT,
      then: schema1 =>
        schema1
          .typeError(MESSAGE.required)
          .moreThan(0)
          .required(MESSAGE.required),
      otherwise: schema1 => schema1.nullable(),
    }),
    takeProfit: yup
      .number()
      .nullable()
      .transform(value => {
        return value || null;
      })
      .when("isBuy", {
        is: true,
        then: schema => schema.moreThan(markPrice, MESSAGE.moreThan),
        otherwise: schema => schema.lessThan(markPrice, MESSAGE.lessThan),
      }),
    stopLoss: yup
      .number()
      .nullable()
      .transform(value => {
        return value || null;
      })
      .when("isBuy", {
        is: true,
        then: schema => schema.lessThan(markPrice, MESSAGE.lessThan),
        otherwise: schema => schema.moreThan(markPrice, MESSAGE.moreThan),
      }),
  });

function OrderInput() {
  const { themeColors } = useTheme();
  const { isConnected } = useAccount();
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MarketOrderForm>({
    defaultValues,
    resolver: yupResolver<any>(schema(90)),
  });
  const [placeMarketOrder] = usePlaceMarketOrderMutation();
  const [placeLimitOrder] = usePlaceLimitOrderMutation();
  const marketId = useAppSelector(selectMarketId);

  const orderHandlers = useMemo(
    () => ({
      [OrderType.MARKET]: placeMarketOrder,
      [OrderType.LIMIT]: placeLimitOrder,
    }),
    []
  );
  const handleSwitchOrderType = (type: MainOrderType) =>
    setValue("orderType", type);

  const isBuyPosition = watch("isBuy");
  const orderType: MainOrderType = watch("orderType");

  const handleChangeOrderSide = (value: boolean) => setValue("isBuy", value);
  const handleChangeLeverage = (value: number) => setValue("leverage", value);

  const placeOrder = async (values: MarketOrderForm) => {
    const handler = orderHandlers[orderType];
    const response = await handler(values);
    handleApiCall(
      response,
      () => errorAlert("Something went wrong"),
      () => {
        successAlert("Order placed");
        if (values.takeProfit) {
          placeMarketOrder({
            ...values,
            isBuy: !values.isBuy,
            triggerPrice: values.takeProfit,
            orderType: TP_SL_TYPES_MAP[orderType].takeProfit,
          });
        }
        if (values.stopLoss) {
          placeMarketOrder({
            ...values,
            isBuy: !values.isBuy,
            triggerPrice: values.stopLoss,
            orderType: TP_SL_TYPES_MAP[orderType].stopLoss,
          });
        }
      }
    );
  };

  return (
    <Surface
      style={{
        paddingBottom: "32px",
        borderTop: `1px solid ${themeColors.border.default}`,
      }}
    >
      <Stack justify="apart" fullHeight spacing={40}>
        <Wrapper>
          <Container style={{ paddingBottom: "16px" }}>
            <SymbolSelect />
          </Container>
          <Divider />
          {!isConnected && (
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
          )}
          <Stack spacing={20}>
            <form onSubmit={handleSubmit(placeOrder)}>
              <Stack spacing={20}>
                <Group spacing={0}>
                  <TabButton
                    $active={isBuyPosition}
                    onClick={() => handleChangeOrderSide(true)}
                    type="button"
                    style={{ flex: 1 }}
                  >
                    LONG
                  </TabButton>
                  <TabButton
                    $active={!isBuyPosition}
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
                        type="number"
                        value={watch("price")}
                        error={errors.price?.message}
                      />
                    )}
                    <Input
                      {...register("volume")}
                      error={errors.volume?.message}
                      value={watch("volume")}
                      type="number"
                      label="Size"
                      rightSide={marketId}
                    />
                    <div style={{ position: "relative" }}>
                      <Group align="end">
                        <Input
                          {...register("leverage")}
                          style={{ minWidth: "60px" }}
                          label="Leverage"
                          readOnly
                        />
                        <Group align="end" style={{ flex: 1 }}>
                          <StyledButton
                            type="button"
                            onClick={() => handleChangeLeverage(1)}
                          >
                            1x
                          </StyledButton>
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
                      error={errors.takeProfit?.message}
                      type="number"
                      value={watch("takeProfit") || ""}
                    />
                    <Input
                      {...register("stopLoss")}
                      label="Stop Loss"
                      rightSide="USD"
                      error={errors.stopLoss?.message}
                      type="number"
                      value={watch("stopLoss") || ""}
                    />
                    {!isConnected && <ConnectButton />}
                    {isConnected && (
                      <PlaceOrderButton $isBuy={isBuyPosition}>
                        {t("placeOrder")}
                      </PlaceOrderButton>
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
