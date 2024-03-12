import React, { useState } from "react"
import { useAppDispatch } from "../../hooks"
import toast from "react-hot-toast"
import { placeLimitOrder } from "../../state/orderSlice"
import { getAccount } from "../../state/accountSlice"
import styled from "styled-components"

const Wrapper = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.common.palette.alpha.white8};
`
const Container = styled.div`
  padding: 8px;
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

  return <Wrapper></Wrapper>
}

export default OrderInput
