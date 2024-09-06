import { yupResolver } from "@hookform/resolvers/yup";

import { Divider, Group, Input, Stack, Switcher, Text } from "../../components";
import Surface from "../../Layouts/Surface";
import Summary from "./Summary";
import AttributionBar from "../../components/AttributionBar";
import TabButton from "../../components/TabButton";
import useTheme from "../../hooks/useTheme";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { errorAlert, successAlert } from "../../utils/alerts";
import SymbolSelect from "../../components/SymbolSelect/SymbolSelect";
import { useAppSelector } from "../../hooks";
import { selectMarketId } from "../../state/futuresSlice";
import { OrderSide, OrderType } from "../../types/order";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
import { ConnectButton } from "../../components/ConnectButton";
import { placeLimitOrderInChain, placeMarketOrderInChain } from "./placeOrder";
import { schema } from "./orderSchema";
import { Container, PlaceOrderButton, StyledButton, Wrapper } from "./style";

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

function OrderInput() {
  const { themeColors } = useTheme();
  const { account, isConnected } = useChainCosmoshub();
  const address = account?.bech32Address;

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
  const marketId = useAppSelector(selectMarketId);

  const handleSwitchOrderType = (type: MainOrderType) =>
    setValue("orderType", type);

  const isBuyPosition = watch("isBuy");
  const orderType: MainOrderType = watch("orderType");

  const handleChangeOrderSide = (value: boolean) => setValue("isBuy", value);
  const handleChangeLeverage = (value: number) => setValue("leverage", value);

  const placeOrder = async (values: MarketOrderForm) => {
    if (!address) return;

    if (values.orderType === OrderType.MARKET) {
      placeMarketOrderInChain({
        address,
        side: values.isBuy ? OrderSide.buy : OrderSide.sell,
        quantity: BigInt(values.volume * 1e5),
        price: BigInt(values.price),
        leverage: BigInt(values.leverage),
        onSuccess: successAlert,
        onError: errorAlert,
      });
    }
    if (
      values.orderType === OrderType.LIMIT &&
      values.stopLoss &&
      values.takeProfit
    ) {
      placeLimitOrderInChain({
        address,
        side: values.isBuy ? OrderSide.buy : OrderSide.sell,
        quantity: BigInt(values.volume * 1e5),
        price: BigInt(values.price),
        leverage: BigInt(values.leverage),
        stopLoss: BigInt(values.stopLoss),
        takeProfit: BigInt(values.takeProfit),
        onSuccess: successAlert,
        onError: errorAlert,
      });
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

                    <Input
                      {...register("price")}
                      label="Price"
                      rightSide="USD"
                      type="number"
                      value={watch("price")}
                      error={errors.price?.message}
                    />
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
                    {orderType !== OrderType.MARKET && (
                      <>
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
                      </>
                    )}

                    {!isConnected && (
                      <ConnectButton
                        size="sm"
                        fluid
                        text={t("connectWallet")}
                      />
                    )}
                    {isConnected && (
                      <>
                        <PlaceOrderButton $isBuy={isBuyPosition}>
                          {t("placeOrder")}
                        </PlaceOrderButton>
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
