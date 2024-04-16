import React from "react"
import { Group, Stack, Text } from "../../components"
import { formatNumber } from "../../utils/format"

interface Label {
  label: string
  value?: string
}
const Label = ({ label, value }: Label) => {
  return (
    <Group position="apart">
      <Text variant="textXs">{label}:</Text>
      <Text variant="textXs">{value || "-"}</Text>
    </Group>
  )
}

const Summary = () => {
  return (
    <Stack>
      <Label
        label="Total Fees"
        value={formatNumber({ value: 2.21, before: "$" })}
      />
      <Label label="Liquidation Price" />
      <Label label="Fill Price" />
      <Label label="Price Impact" />
    </Stack>
  )
}

export default Summary
