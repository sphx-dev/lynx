import { yupResolver } from "@hookform/resolvers/yup";

import { Divider, Group, Stack, Switcher, Text } from "../../components";
import Surface from "@/ui/Layouts/Surface";
import Summary from "./Summary";
import AttributionBar from "../../components/AttributionBar";
import TabButton from "../../components/TabButton";
import useTheme from "../../hooks/useTheme";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { errorAlert, successAlert } from "../../utils/alerts";
import SymbolSelect from "../../components/SymbolSelect/SymbolSelect";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { ConnectButton } from "../../components/ConnectButton";
import { schema } from "./orderSchema";
import {
  Container,
  PlaceOrderButton,
  StyledButton,
  Wrapper,
  PlaceOrderMessage,
} from "./style";
import { useMarginAccount } from "../../hooks/useMarginAccounts";
import { useCreateOrder } from "../../hooks/useOrders";
import { useCallback, useState } from "react";
import { useMarkets } from "../../hooks/useMarkets";
import { useSub } from "@/hooks/usePubSub";
import { Input } from "@/components/Input/Input";
import { Checkbox } from "@/components/Input/Checkbox";
import { useBalance } from "@/hooks/useBalance";
import { OrderSide, OrderType } from "proto-codecs/codegen/sphx/order/order";
import { motion, AnimatePresence } from "framer-motion";

const options: [
  { label: string; value: OrderType },
  { label: string; value: OrderType }
] = [
  {
    label: "Limit",
    value: OrderType.ORDER_TYPE_LIMIT,
  },
  {
    label: "Market",
    value: OrderType.ORDER_TYPE_MARKET,
  },
];

export interface MarketOrderForm {
  volume: number | string;
  isBuy: boolean;
  leverage: number;
  price: number | string;
  hasTPSL: boolean;
  takeProfit: number | string;
  stopLoss: number | string;
  orderType: OrderType;
}

const defaultValues: MarketOrderForm = {
  volume: "",
  isBuy: true,
  leverage: 1,
  price: "",
  hasTPSL: false,
  takeProfit: "",
  stopLoss: "",
  orderType: OrderType.ORDER_TYPE_LIMIT,
};

function OrderInput() {
  const { themeColors } = useTheme();
  const { account, isConnected } = useChainCosmoshub();
  const address = account?.bech32Address;
  const { selectedAddress } = useMarginAccount(address);
  const { amount } = useBalance(selectedAddress);

  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MarketOrderForm>({
    defaultValues,
    resolver: yupResolver<any>(schema()),
  });

  const { selectedMarketId: marketId, selectedMarket } = useMarkets();

  const handleSwitchOrderType = (type: OrderType) => {
    setValue("orderType", type);
    if (type === OrderType.ORDER_TYPE_MARKET) {
      setValue("price", "");
    }
  };

  const isBuyPosition = watch("isBuy");
  const orderType: OrderType = watch("orderType");
  const hasTPSL = watch("hasTPSL");

  const handleChangeOrderSide = (value: boolean) => setValue("isBuy", value);
  const handleChangeLeverage = (value: number) => setValue("leverage", value);
  const handleClickHasTPSL = () => {
    setValue("takeProfit", "");
    setValue("stopLoss", "");
  };

  const setPriceFromEvent = useCallback(
    (price: number) => {
      console.log("PRICE_SELECTED", price);
      setValue("orderType", OrderType.ORDER_TYPE_LIMIT);
      setValue("price", price);
    },
    [setValue]
  );
  useSub("PRICE_SELECTED", setPriceFromEvent);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { placeMarketOrder, placeLimitOrder } = useCreateOrder();

  const placeOrder = async (values: MarketOrderForm) => {
    console.log("PLACE_ORDER", values);
    // TODO: Add toast notifications for address, selectedAddress, and marketId
    console.log(address, selectedAddress, marketId);
    if (!address || !selectedAddress || !marketId) {
      return;
    }

    try {
      const sideValue = values.isBuy
        ? OrderSide.ORDER_SIDE_BUY
        : OrderSide.ORDER_SIDE_SELL;

      const stopLossValue = values.stopLoss
        ? BigInt(Number(values.stopLoss) * 1e6)
        : undefined;

      const takeProfitValue = values.takeProfit
        ? BigInt(Number(values.takeProfit) * 1e6)
        : undefined;

      if (values.orderType === OrderType.ORDER_TYPE_MARKET) {
        setIsPlacingOrder(true);

        placeMarketOrder({
          address,
          marginAccountAddress: selectedAddress,
          orderId: BigInt(Date.now() * 1000),
          side: sideValue,
          quantity: BigInt(Number(values.volume) * 1e6),
          // price: BigInt(values.price * 1e6),
          leverage: BigInt(values.leverage),
          stopLoss: stopLossValue,
          takeProfit: takeProfitValue,
          marketId: BigInt(marketId),
          onSuccess: successAlert,
          onError: errorAlert,
        }).finally(() => {
          setIsPlacingOrder(false);
        });
      }
      if (values.orderType === OrderType.ORDER_TYPE_LIMIT) {
        setIsPlacingOrder(true);
        placeLimitOrder({
          address,
          marginAccountAddress: selectedAddress,
          orderId: BigInt(Date.now() * 1000),
          side: sideValue,
          quantity: BigInt(Number(values.volume) * 1e6),
          price: BigInt(Number(values.price) * 1e6),
          leverage: BigInt(values.leverage),
          stopLoss: stopLossValue,
          takeProfit: takeProfitValue,
          marketId: BigInt(marketId),
          onSuccess: successAlert,
          onError: errorAlert,
        }).finally(() => {
          setIsPlacingOrder(false);
        });
      }
    } catch (error) {
      console.error(error);
      setIsPlacingOrder(false);
      errorAlert("Error placing order");
    }
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
                <ConnectButton size="sm" />
              </Group>
            </Container>
          )}
          <Stack spacing={20}>
            <form
              onSubmit={handleSubmit(placeOrder, errors => {
                console.log(errors);
              })}
            >
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
                      defaultValue={orderType}
                      options={options}
                      name="orderType"
                    />

                    {orderType !== OrderType.ORDER_TYPE_MARKET && (
                      <Input
                        {...register("price")}
                        label="Price"
                        placeholder="0.00"
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
                      placeholder="0.00"
                      type="number"
                      label="Size"
                      rightSide={selectedMarket?.baseAsset || ""}
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
                            // TODO: enable when leverage is supported
                            disabled
                          >
                            2x
                          </StyledButton>
                          <StyledButton
                            type="button"
                            onClick={() => handleChangeLeverage(5)}
                            // TODO: enable when leverage is supported
                            disabled
                          >
                            5x
                          </StyledButton>
                          <StyledButton
                            type="button"
                            onClick={() => handleChangeLeverage(25)}
                            // TODO: enable when leverage is supported
                            disabled
                          >
                            25x
                          </StyledButton>
                          <StyledButton
                            type="button"
                            onClick={() => handleChangeLeverage(50)}
                            // TODO: enable when leverage is supported
                            disabled
                          >
                            50x
                          </StyledButton>
                        </Group>
                      </Group>
                    </div>
                    {/* TODO: Add Take Profit/Stop Loss when chain functionality is finished */}
                    {false && (
                      <Group>
                        <Checkbox
                          type="checkbox"
                          left={t("Take Profit/Stop Loss")}
                          onClick={handleClickHasTPSL}
                          {...register("hasTPSL")}
                        />
                      </Group>
                    )}

                    <AnimatePresence>
                      {hasTPSL && (
                        <motion.div
                          className={hasTPSL ? "hasTPSL" : "PLANE"}
                          style={{ overflow: "hidden" }}
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          transition={{ duration: 0.4 }}
                          exit={{ height: 0 }}
                        >
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
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isConnected && (
                      <ConnectButton
                        size="sm"
                        fluid
                        text={t("connectWallet")}
                      />
                    )}
                    {isConnected && (
                      <>
                        {!address ||
                        !marketId ||
                        !selectedAddress ||
                        !amount ? (
                          <PlaceOrderMessage />
                        ) : (
                          <PlaceOrderButton
                            $isBuy={isBuyPosition}
                            disabled={isPlacingOrder}
                          >
                            {t("placeOrder")}
                          </PlaceOrderButton>
                        )}
                      </>
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
