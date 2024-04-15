import React, { useEffect, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import OrderInput from "../sections/order/OrderInput"
import { TradingViewContainer } from "../sections/chart/TradingViewContainer"
import OrderBook from "../sections/orderbook/OrderBook"
import AccountOrderHistory from "../sections/account/AccountOrderHistory"
import Footer from "../sections/footer"
import OrdersHistory from "../components/OrdersHistory"
import { Stack } from "../components"
import PriceBorder from "../sections/PriceBorder"

const Futures = () => {
  const [windowWidth, setWindowWidth] = useState(0)

  // Window width detection
  useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.innerWidth)
    }
    setWindowWidth(() => window.innerWidth)
  }, [])

  return (
    <Row>
      <Col md={3} style={{ maxWidth: "320px" }}>
        <OrderInput />
        {/*<AccountCard />*/}
        <br></br>
      </Col>
      <Col>
        <Stack>
          <PriceBorder />
          <TradingViewContainer />
          <OrdersHistory />
        </Stack>
      </Col>
      <Col md={3} style={{ maxWidth: "320px" }}>
        <OrderBook windowWidth={windowWidth} />
      </Col>
      <Row>
        <Footer />
      </Row>
    </Row>
  )
}

export default Futures
