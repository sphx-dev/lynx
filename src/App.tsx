import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import AccountCard from "./account/Account"
import OrderInput from "./orderbook/OrderInput"
import OrderBook from "./orderbook/OrderBook"
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
      <Container style={{ marginTop: "5rem" }}>
        <Row>
          <Col>
            <AccountCard />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <OrderInput />
          </Col>
        </Row>
        <Row>
          <OrderBook windowWidth={windowWidth} />
        </Row>
      </Container>
    </>
  )
}

export default App
