import { Group, Stack, Text } from "../../components";
import { formatDollars } from "@/utils/format";

import { useBalance } from "@/hooks/useBalance";
import { useMarginAccount } from "@/hooks/useMarginAccounts";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";
import { PRECISION } from "@/constants";
import { useTranslation } from "react-i18next";
import { useLocalStreaming } from "../chart/localStreaming";
import { OrderType } from "proto-codecs/codegen/sphx/order/order";

interface Label {
  label: string;
  value?: string;
}

// eslint-disable-next-line
const Label = ({ label, value }: Label) => {
  return (
    <Group position="apart">
      <Text variant="textSm">{label}:</Text>
      <Text variant="textSm">{value || "-"}</Text>
    </Group>
  );
};

const Summary = ({
  orderType,
  limitPrice,
  pricePerContract,
  volume,
  minimumVolume,
}: {
  orderType: OrderType;
  limitPrice: number;
  pricePerContract: number;
  volume: number;
  minimumVolume: number;
}) => {
  const { t } = useTranslation();
  const { address } = useChainCosmoshub();
  const { selectedAddress } = useMarginAccount(address);
  const { amount } = useBalance(selectedAddress);

  const data = useLocalStreaming();
  const lastPrice = data?.p ?? 0;

  const price =
    orderType === OrderType.ORDER_TYPE_LIMIT ? limitPrice : lastPrice;

  const notional = price * pricePerContract * Math.max(volume, minimumVolume);

  return (
    <Stack>
      <Label
        label={t("pricePerContract")}
        value={formatDollars(pricePerContract)}
      />
      <Label label={t("notionalValue")} value={formatDollars(notional)} />
      {/* <Label
        label="Total Fees"
        value={formatNumber({ value: 2.21, after: " USD" })}
      />
      <Label label="Liquidation Price" />
      <Label label="Fill Price" />
      <Label label="Price Impact" /> */}
      {/* <Label
        label="Balance"
        value={formatNumber({ value: +balance, fixed: 2, before: "$" })}
      /> */}
      <Label
        label="Available Margin"
        value={amount ? formatDollars(amount / PRECISION) : ""}
      />
    </Stack>
  );
};

export default Summary;
