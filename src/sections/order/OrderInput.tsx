import React, { useState } from "react"
import { useAppDispatch } from "../../hooks"
import toast from "react-hot-toast"
import { placeLimitOrder } from "../../state/orderSlice"
import { getAccount } from "../../state/accountSlice"
import styled from "styled-components"
import {
  Button,
  ConnectButton,
  Group,
  Input,
  Stack,
  Switcher,
  Text,
} from "../../components"
import TakeProfitStopLossSelect from "../../components/Select"
import { getThemeColors } from "../../theme"

const Wrapper = styled.div`
  height: 100%;
  background: ${({ theme }) =>
    getThemeColors(theme).background.gradientPrimary};
  padding: 20px;
  width: 320px;
`
const Container = styled.div`
  padding: 8px;
`
const StyledButton = styled(Button)`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`

function OrderInput() {
  const dispatch = useAppDispatch()
  const [price, setPrice] = useState("")
  const [volume, setVolume] = useState("")

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
    <Wrapper>
      <Stack spacing={20}>
        <form>
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
          </Stack>
        </form>
        <ConnectButton />
      </Stack>
    </Wrapper>
  )
}

export default OrderInput
