import { Group, Stack, Text } from "../../components";
import { formatNumber } from "../../utils/format";

import { useBalance } from "@/hooks/useBalance";
import { useMarginAccount } from "@/hooks/useMarginAccounts";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";

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

const Summary = () => {
  const { address } = useChainCosmoshub();
  const { selectedAddress } = useMarginAccount(address);
  const { amount } = useBalance(selectedAddress);
  return (
    <Stack>
      <Label
        label="Total Fees"
        value={formatNumber({ value: 2.21, after: " USDC" })}
      />
      <Label label="Liquidation Price" />
      <Label label="Fill Price" />
      <Label label="Price Impact" />
      {/* <Label
        label="Balance"
        value={formatNumber({ value: +balance, fixed: 2, before: "$" })}
      /> */}
      <Label
        label="Available Margin"
        value={amount ? (amount / 1e6).toFixed(5) + " USDC" : ""}
      />
    </Stack>
  );
};

export default Summary;
