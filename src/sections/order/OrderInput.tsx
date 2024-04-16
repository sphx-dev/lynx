import React, { useState } from "react"
import { useAppDispatch } from "../../hooks"
import toast from "react-hot-toast"
import { placeLimitOrder } from "../../state/orderSlice"
import { getAccount } from "../../state/accountSlice"
import styled from "styled-components"
import {
  Button,
  ConnectButton,
  Divider,
  Group,
  Input,
  Stack,
  Switcher,
  Text,
} from "../../components"
import TakeProfitStopLossSelect from "../../components/Select"
import Surface from "../../Layouts/Surface"
import Summary from "./Summary"
import AttributionBar from "../../components/AttributionBar"
import TradingOptions from "../../components/Tabs/Tabs"
import TradingPairSelector from "../../components/TraidingPairSelector"
import TabButton from "../../components/TabButton"
import useTheme from "../../hooks/useTheme"

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.common.palette.alpha.white5};
  padding: 16px 0;
`
const Container = styled.div`
  padding: 0px 16px;
`
const StyledButton = styled(Button)`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`

enum PositionType {
  LONG = "LONG",
  SHORT = "SHORT",
}

function OrderInput() {
  const dispatch = useAppDispatch()
  const [price, setPrice] = useState("")
  const [volume, setVolume] = useState("")
  const [position, setPosition] = useState(PositionType.LONG)
  const { themeColors } = useTheme()
  const notify = () => toast("Order placed")

  const submitBuyOrder = () => {
    const isBuy = false
    if (price && volume) {
      notify()
      dispatch(placeLimitOrder({ price, volume, isBuy }))
      setTimeout(() => {
        dispatch(getAccount())
      }, 250)
    }
  }

  const submitSellOrder = () => {
    const isBuy = false
    if (price && volume) {
      notify()
      dispatch(placeLimitOrder({ price, volume, isBuy }))
      setTimeout(() => {
        dispatch(getAccount())
      }, 250)
    }
  }

  const options = [
    {
      label: "Market",
      value: "market",
    },
    {
      label: "Limit",
      value: "limit",
    },
    {
      label: "Stop",
      value: "stop",
    },
  ]

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
              <Stack spacing={2}>
                <Text variant="text2Xs">No wallet connected</Text>
                <Text variant="text2Xs" color="primaryLink">
                  Connect wallet to deposit margin
                </Text>
              </Stack>
              <ConnectButton size="small" />
            </Group>
          </Container>
          <Stack spacing={20}>
            <form>
              <Stack spacing={20}>
                <Group spacing={0}>
                  <TabButton
                    active={position === PositionType.LONG}
                    onClick={() => setPosition(PositionType.LONG)}
                    type="button"
                    style={{ flex: 1 }}
                  >
                    LONG
                  </TabButton>
                  <TabButton
                    active={position === PositionType.SHORT}
                    onClick={() => setPosition(PositionType.SHORT)}
                    type="button"
                    style={{ flex: 1 }}
                  >
                    SHORT
                  </TabButton>
                </Group>
                <Container>
                  <Stack spacing={20}>
                    <Switcher options={options} name="orderType" />
                    <div style={{ position: "relative" }}>
                      <Input label="Margin" />
                      <Group style={{ position: "absolute", top: 0, right: 0 }}>
                        <Button size="xs" pill>
                          10%
                        </Button>
                        <Button size="xs" pill>
                          20%
                        </Button>
                        <Button size="xs" pill>
                          50%
                        </Button>
                        <Button size="xs" pill>
                          100%
                        </Button>
                      </Group>
                    </div>
                    <div style={{ position: "relative" }}>
                      <Input label="Size" rightSide="USD" />
                    </div>
                    <div style={{ position: "relative" }}>
                      <Group align="end">
                        <Input style={{ minWidth: "60px" }} label="Leverage" />
                        <Group align="end" style={{ flex: 1 }}>
                          <StyledButton>2x</StyledButton>
                          <StyledButton>5x</StyledButton>
                          <StyledButton>25x</StyledButton>
                          <StyledButton>50x</StyledButton>
                        </Group>
                      </Group>
                    </div>
                    <TakeProfitStopLossSelect />
                    <ConnectButton />
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
  )
}

export default OrderInput
