import React from "react";
import { Group, Stack, Text } from "../../components";
import { formatNumber } from "../../utils/format";
import { useSelector } from "react-redux";
import { account } from "../../state/accountSlice";

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
  const { balance } = useSelector(account);
  return (
    <Stack>
      <Label
        label="Total Fees"
        value={formatNumber({ value: 2.21, before: "$" })}
      />
      <Label label="Liquidation Price" />
      <Label label="Fill Price" />
      <Label label="Price Impact" />
      <Label
        label="Balance"
        value={formatNumber({ value: +balance, fixed: 2, before: "$" })}
      />
    </Stack>
  );
};

export default Summary;
