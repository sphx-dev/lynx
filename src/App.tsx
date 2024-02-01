import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import AccountCard from "./account/Account"
import OrderInput from "./order/OrderInput"
import OrderBook from "./orderbook/components/OrderBook"
import { TradingViewContainer } from "./chart/TradingViewContainer"
import AccountOrderHistory from "./account/AccountOrderHistory"
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
        style={{ marginTop: "2rem" }}
      >
        <Toaster position="top-right" />
        <Row>
          <Col md={3}>
            <OrderBook windowWidth={windowWidth} />
          </Col>
          <Col>
            <TradingViewContainer />
          </Col>
          <Col md={3}>
            <AccountCard />
            <OrderInput />
            <br></br>
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
