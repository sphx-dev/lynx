import { yupResolver } from "@hookform/resolvers/yup";

import { Divider, Group, Stack, Switcher, Text } from "../../components";
import Summary from "./Summary";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  errorAlert,
  promiseAlert,
  successAlert,
} from "@/components/Toast/Toast";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { ConnectButton } from "../../components/ConnectButton";
import { schema } from "./orderSchema";
import {
  LeverageButton,
  Wrapper,
  PlaceOrderMessage,
  PriceEstimation,
} from "./style";
import { useMarginAccount } from "../../hooks/useMarginAccounts";
import { useCreateOrder, useCreateOrderSmart } from "../../hooks/useOrders";
import { useCallback, useEffect, useState } from "react";
import { useMarkets } from "../../hooks/useMarkets";
import { useSub } from "@/hooks/usePubSub";
import { Input } from "@/components/Input/Input";
import { Checkbox } from "@/components/Input/Checkbox";
import { useBalance } from "@/hooks/useBalance";
import { OrderSide, OrderType } from "proto-codecs/codegen/sphx/order/order";
import { motion, AnimatePresence } from "framer-motion";
import { PRECISION } from "@/constants";
import { useLocalStreaming } from "../chart/localStreaming";
import { useSmartSign } from "@/components/SmartSignButton";
import { PlaceLimitOrderInChainParams } from "@/utils/placeOrder";
import { LoaderBar } from "@/components/LoaderBar";
// import { useQueryPositionsByAccount } from "../ordersTabs/Positions/Positions";
import { useQueryPositionsByAccount } from "@/hooks/usePositions";
import { PositionSide } from "proto-codecs/codegen/sphx/order/perpetual_position";
import config from "@/config";
import { placeOrderSigned } from "./placeOrderSigned";
import {
  TabButtonContainer,
  TabButton,
} from "@/components/TabButton/TabButton";
import { Button } from "@/components/ButtonV2/Button";
import { SizeSlider } from "./slider/SizeSlider";

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

const defaultIsBuy =
  localStorage.getItem("order-input-isBuy") === "true" || false;
const defaultOrderType: OrderType =
  localStorage.getItem("order-input-orderType") === "1"
    ? OrderType.ORDER_TYPE_MARKET
    : OrderType.ORDER_TYPE_LIMIT;

const defaultValues: MarketOrderForm = {
  volume: "",
  isBuy: defaultIsBuy,
  leverage: 1,
  price: "",
  hasTPSL: false,
  takeProfit: "",
  stopLoss: "",
  orderType: defaultOrderType,
};

const MARKET_MINIMUM_MARGING_RATIO = 1 + config.MIN_MARGIN_RATIO / 100;

function OrderInput() {
  const { account, isConnected } = useChainCosmoshub();
  const address = account?.bech32Address;
  const { selectedAddress } = useMarginAccount(address);
  const { amount } = useBalance(selectedAddress);

  const data = useLocalStreaming();
  const marketEstimatedPrice = data?.p ?? 0;

  const { t } = useTranslation();
  const {
    selectedMarketId: marketId,
    selectedMarket,
    minimumVolume,
    pricePerContract,
  } = useMarkets();

  const { data: positions } = useQueryPositionsByAccount(address);

  const positionInMarket = positions?.find(
    position => position.symbol === selectedMarket?.ticker
  );

  const positionSide =
    positionInMarket?.volume === undefined
      ? undefined
      : Number(positionInMarket?.volume) > 0
      ? PositionSide.POSITION_SIDE_LONG
      : PositionSide.POSITION_SIDE_SHORT;
  const positionSize = Math.abs(Number(positionInMarket?.volume)) || Infinity;

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = useForm<MarketOrderForm>({
    defaultValues,
    resolver: yupResolver<any>(
      schema(minimumVolume, positionSide, positionSize, pricePerContract)
    ),
  });

  const handleSwitchOrderType = (type: OrderType) => {
    setValue("orderType", type);
    localStorage.setItem("order-input-orderType", type.toString());
    if (type === OrderType.ORDER_TYPE_MARKET) {
      setValue("price", "");
    }
  };

  const isBuySide = watch("isBuy");
  const orderType: OrderType = watch("orderType");
  const hasTPSL = watch("hasTPSL");

  const [isReduceOnly, setIsReduceOnly] = useState(false);
  useEffect(() => {
    let isReduceOnly = false;

    if (positionSide !== undefined) {
      if (
        (isBuySide && positionSide === PositionSide.POSITION_SIDE_LONG) ||
        (!isBuySide && positionSide === PositionSide.POSITION_SIDE_SHORT)
      ) {
        isReduceOnly = false;
      } else {
        isReduceOnly = true;
      }
    }

    setIsReduceOnly(isReduceOnly);
  }, [isBuySide, positionSide, setIsReduceOnly]);

  const handleChangeOrderSide = (value: boolean) => {
    setValue("isBuy", value);
    localStorage.setItem("order-input-isBuy", value.toString());
  };
  const handleChangeLeverage = (value: number) => setValue("leverage", value);
  const handleClickHasTPSL = () => {
    setValue("takeProfit", "");
    setValue("stopLoss", "");
  };

  const setPriceFromEvent = useCallback(
    (priceValue: number) => {
      const price = Number(priceValue).toFixed(6);
      console.log("PRICE_SELECTED", price);
      setValue("orderType", OrderType.ORDER_TYPE_LIMIT);
      localStorage.setItem(
        "order-input-orderType",
        OrderType.ORDER_TYPE_LIMIT.toString()
      );
      setValue("price", price);
    },
    [setValue]
  );
  useSub("PRICE_SELECTED", setPriceFromEvent);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { placeMarketOrder, placeLimitOrder } = useCreateOrder();
  const {
    placeLimitOrder: placeLimitOrderSmart,
    placeMarketOrder: placeMarketOrderSmart,
  } = useCreateOrderSmart();

  const { smartSign } = useSmartSign();

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
        ? BigInt((Number(values.stopLoss) * PRECISION).toFixed(0))
        : undefined;

      const takeProfitValue = values.takeProfit
        ? BigInt((Number(values.takeProfit) * PRECISION).toFixed(0))
        : undefined;

      const quantity =
        Math.floor(Number(values.volume) * PRECISION) * pricePerContract;
      const price = Math.floor(Number(values.price) * PRECISION);
      const leverage = Number(values.leverage);

      if (config.SIGNATURE_BASED_PLACEMENT) {
        const orderType =
          values.orderType === OrderType.ORDER_TYPE_LIMIT ? "limit" : "market";

        promiseAlert(
          placeOrderSigned(address, selectedMarket?.ticker!, {
            price: Number(values.price),
            volume: Number(values.volume),
            is_buy: values.isBuy,
            leverage: leverage,
            trigger_price: 0,
            order_type: orderType,
            chain_order_id: selectedAddress + ":" + Date.now() * 1000,
          }),

          {
            pending: t("waitingForApproval"),
            success: t("orderPlacedSuccess"),
            // error: (txt: string) => <div>{txt}</div>,
            error: t("errorPlacingOrder"),
          }
        )
          .then(() => {
            setValue("takeProfit", "");
            setValue("stopLoss", "");
          })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            setIsPlacingOrder(false);
          });
      } else {
        if (values.orderType === OrderType.ORDER_TYPE_MARKET) {
          setIsPlacingOrder(true);

          if (smartSign) {
            try {
              await placeMarketOrderSmart({
                marginAccountAddress: selectedAddress,
                side: sideValue,
                quantity: quantity,
                leverage: Number(values.leverage),
                marketTicker: selectedMarket?.ticker!,
              }).finally(() => {
                setIsPlacingOrder(false);
              });

              setValue("takeProfit", "");
              setValue("stopLoss", "");
              successAlert(t("orderPlacedSuccess"));
            } catch (error) {
              console.error(error);
              errorAlert(t("errorPlacingOrder"));
            } finally {
              setIsPlacingOrder(false);
            }
          } else {
            promiseAlert(
              placeMarketOrder({
                address,
                marginAccountAddress: selectedAddress,
                orderId: BigInt(Date.now() * 1000),
                side: sideValue,
                quantity: BigInt(quantity),
                leverage: BigInt(leverage),
                stopLoss: stopLossValue,
                takeProfit: takeProfitValue,
                marketId: BigInt(marketId),
              }),
              {
                pending: t("waitingForApproval"),
                success: t("orderPlacedSuccess"),
                error: t("errorPlacingOrder"),
              }
              // <div>{t("waitingForApproval")}</div>,
              // <div>{t("orderPlacedSuccess")}</div>,
              // (txt: string) => <div>{txt}</div>
            )
              .then(() => {
                // setValue("price", "");
                // setValue("volume", "");
                setValue("takeProfit", "");
                setValue("stopLoss", "");
              })
              .finally(() => {
                setIsPlacingOrder(false);
              });
          }
        }
        if (values.orderType === OrderType.ORDER_TYPE_LIMIT) {
          setIsPlacingOrder(true);

          if (smartSign) {
            try {
              await placeLimitOrderSmart({
                marginAccountAddress: selectedAddress,
                side: sideValue,
                quantity:
                  Math.floor(Number(values.volume) * PRECISION) *
                  pricePerContract,
                price: Math.floor(Number(values.price) * PRECISION),
                leverage: Number(values.leverage),
                marketTicker: selectedMarket?.ticker!,
              });
              // setValue("price", "");
              // setValue("volume", "");
              setValue("takeProfit", "");
              setValue("stopLoss", "");
              successAlert(t("orderPlacedSuccess"));
            } catch (error) {
              console.error(1234, error);
              errorAlert(t("errorPlacingOrder"));
            } finally {
              setIsPlacingOrder(false);
            }
          } else {
            sendLimitOrderToChain(
              placeLimitOrder,
              address,
              selectedAddress,
              sideValue,
              BigInt(quantity),
              BigInt(price),
              BigInt(leverage),
              stopLossValue,
              takeProfitValue,
              BigInt(marketId),
              t
            )
              .then(() => {
                // setValue("price", "");
                // setValue("volume", "");
                setValue("takeProfit", "");
                setValue("stopLoss", "");
              })
              .finally(() => {
                setIsPlacingOrder(false);
              });
          }
        }
      }
    } catch (error) {
      console.error(error);
      setIsPlacingOrder(false);
      errorAlert(t("errorPlacingOrder"));
    }
  };

  const orderTotalValueLimit =
    Number(getValues().volume) *
    Number(getValues().price) *
    pricePerContract *
    PRECISION *
    getValues().leverage;

  const orderTotalValueMarket =
    Number(getValues().volume) *
    marketEstimatedPrice *
    pricePerContract *
    PRECISION *
    getValues().leverage;

  const insufficientFundsLimit = orderTotalValueLimit > (amount ?? 0);
  const insufficientFundsMarket =
    orderTotalValueMarket * MARKET_MINIMUM_MARGING_RATIO > (amount ?? 0);

  return (
    <Wrapper>
      <Stack spacing={20}>
        <form
          onSubmit={handleSubmit(placeOrder, errors => {
            console.log(errors);
          })}
        >
          <Stack spacing={10}>
            <TabButtonContainer>
              <TabButton
                $active={isBuySide}
                $isBuy={true}
                onClick={() => handleChangeOrderSide(true)}
                type="button"
              >
                {t("long")}
              </TabButton>
              <TabButton
                $active={!isBuySide}
                $isBuy={false}
                onClick={() => handleChangeOrderSide(false)}
                type="button"
              >
                {t("short")}
              </TabButton>
            </TabButtonContainer>
            <Divider />
            <Stack spacing={8}>
              <Switcher
                onChange={handleSwitchOrderType}
                defaultValue={orderType}
                options={options}
                name="orderType"
              />
              {orderType !== OrderType.ORDER_TYPE_MARKET ? (
                <Input
                  data-testid="order-input-price"
                  {...register("price")}
                  label="Price"
                  placeholder="0.00"
                  rightSide="USD"
                  type="number"
                  value={watch("price")}
                  error={errors.price?.message}
                  autoComplete="off"
                />
              ) : (
                <FakeInput />
              )}
              <Input
                data-testid="order-input-volume"
                {...register("volume")}
                error={errors.volume?.message}
                value={watch("volume")}
                placeholder="0.00"
                type="number"
                label="Size"
                rightSide={selectedMarket?.baseAsset || ""}
                autoComplete="off"
              />
              <div>
                <Text variant="textXSmall" color="grey">
                  {t("total")}:
                </Text>
              </div>
              <div>
                <SizeSlider
                  onChange={size => {
                    if (amount) {
                      setValue(
                        "volume",
                        (((amount / PRECISION) * size) / 100).toFixed(3)
                      );
                    }
                  }}
                  disabled={!amount}
                  defaultValue={0}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* <div style={{ display: "flex", justifyContent: "center" }}>
                  {isReduceOnly ? (
                    <Text variant="textXSmall" color="bull">
                      Reduce Only
                    </Text>
                  ) : (
                    <Text variant="textXSmall" color="bull">
                      Open Position
                    </Text>
                  )}
                </div> */}
                <div style={{ display: "flex", justifyContent: "start" }}>
                  <Checkbox
                    type="checkbox"
                    right={t("reduceOnly")}
                    checked={isReduceOnly}
                  />
                </div>
                <div>
                  {isReduceOnly && (
                    <WarnInfoText>{t("ordersReduceInfo")}</WarnInfoText>
                  )}
                </div>
              </div>
              <div>
                <Group align="end">
                  <Input
                    {...register("leverage")}
                    style={{ minWidth: "60px" }}
                    label="Leverage"
                    readOnly
                  />
                  <Group align="end" style={{ flex: 1 }}>
                    <LeverageButton
                      data-testid="order-input-leverate-1x"
                      type="button"
                      onClick={() => handleChangeLeverage(1)}
                    >
                      1x
                    </LeverageButton>
                    <LeverageButton
                      data-testid="order-input-leverate-2x"
                      type="button"
                      onClick={() => handleChangeLeverage(2)}
                      // TODO: enable when leverage is supported
                      disabled
                    >
                      2x
                    </LeverageButton>
                    <LeverageButton
                      data-testid="order-input-leverate-5x"
                      type="button"
                      onClick={() => handleChangeLeverage(5)}
                      // TODO: enable when leverage is supported
                      disabled
                    >
                      5x
                    </LeverageButton>
                    <LeverageButton
                      data-testid="order-input-leverate-10x"
                      type="button"
                      onClick={() => handleChangeLeverage(10)}
                      // TODO: enable when leverage is supported
                      disabled
                    >
                      10x
                    </LeverageButton>
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
                <ConnectButton size="small" text={t("connectWallet")} />
              )}
              {isConnected && (
                <>
                  {!address || !marketId || !selectedAddress || !amount ? (
                    <PlaceOrderMessage />
                  ) : (
                    <>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                          marginBottom: "-4px",
                        }}
                      >
                        <Button
                          data-testid="order-input-place-order-button"
                          // $isBuy={isBuySide}
                          type="primary"
                          option="filled"
                          size="small"
                          disabled={
                            isPlacingOrder ||
                            insufficientFundsLimit ||
                            insufficientFundsMarket
                          }
                        >
                          {t("placeOrder")}
                        </Button>
                        <LoaderBar
                          style={{
                            width: "100%",
                            visibility: isPlacingOrder ? "visible" : "hidden",
                          }}
                        />
                      </div>
                      {orderType === OrderType.ORDER_TYPE_MARKET &&
                        insufficientFundsMarket && (
                          <WarnInfoText>
                            {t("insufficientBalanceInAccountMarket")}
                          </WarnInfoText>
                        )}
                      {orderType === OrderType.ORDER_TYPE_LIMIT &&
                      insufficientFundsLimit ? (
                        <WarnInfoText>
                          {t("insufficientBalanceInAccount")}
                        </WarnInfoText>
                      ) : null}
                    </>
                  )}
                </>
              )}
              <Divider />
              <Summary
                limitPrice={Number(watch("price"))}
                orderType={orderType}
                pricePerContract={pricePerContract}
                volume={Number(watch("volume"))}
                minimumVolume={minimumVolume}
              />
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Wrapper>
  );
}

export default OrderInput;

const WarnInfoText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text variant="textSmall" color="var(--primary-base)">
      {children}
    </Text>
  );
};

const FakeInput = () => {
  const { t } = useTranslation();
  const data = useLocalStreaming();
  const price = data?.p ?? 0;
  return (
    <PriceEstimation label={t("estimatedPrice")} value={formatNumber(price)} />
  );
};

const formatNumber = (arg: number): string => {
  return new Intl.NumberFormat("en-US").format(arg);
};

function sendLimitOrderToChain(
  placeLimitOrder: (params: PlaceLimitOrderInChainParams) => Promise<any>,
  address: string,
  selectedAddress: string,
  sideValue: OrderSide,
  quantity: bigint,
  price: bigint,
  leverage: bigint,
  stopLossValue: bigint | undefined,
  takeProfitValue: bigint | undefined,
  marketId: bigint,
  t: (key: string) => string
) {
  return promiseAlert(
    placeLimitOrder({
      address,
      marginAccountAddress: selectedAddress,
      orderId: BigInt(Date.now() * 1000),
      side: sideValue,
      quantity,
      price,
      leverage,
      stopLoss: stopLossValue,
      takeProfit: takeProfitValue,
      marketId: BigInt(marketId),
    }),
    {
      pending: t("waitingForApproval"),
      success: t("orderPlacedSuccess"),
      error: t("errorPlacingOrder"),
    }
    // <div>{t("waitingForApproval")}</div>,
    // () => <div>{t("orderPlacedSuccess")}</div>,
    // (txt: string) => <div>{txt}</div>
  );
}
