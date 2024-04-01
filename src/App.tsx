import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import AccountCard from "./sections/account/Account"
import OrderInput from "./sections/order/OrderInput"
import OrderBook from "./sections/orderbook/OrderBook"
import { TradingViewContainer } from "./sections/chart/TradingViewContainer"
import AccountOrderHistory from "./sections/account/AccountOrderHistory"
import { Toaster } from "react-hot-toast"
import "./App.css"

function App() {
  const [windowWidth, setWindowWidth] = useState(0)

  // Window width detection
  useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.innerWidth)
    }
    setWindowWidth(() => window.innerWidth)
  }, [])

  return (
    <>
      <Container
        data-bs-theme="dark"
        fluid={true}
        style={{ marginTop: "2rem", minHeight: "100vh" }}
      >
        <Toaster position="top-right" />
        <Row>
          <Col md={3}>
            <OrderInput />
            <AccountCard />
            <br></br>
          </Col>
          <Col>
            <TradingViewContainer />
          </Col>
          <Col md={3}>
            <OrderBook windowWidth={windowWidth} />
          </Col>
          <Row>
            <Col />
            <Col md={11}>
              <AccountOrderHistory />
            </Col>
            <Col />
          </Row>
        </Row>
      </Container>
    </>
  )
}

export default App
