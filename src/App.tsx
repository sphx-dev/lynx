import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import OrderInput from "./OrderInput"
import OrderBook from "./orderbook/OrderBook"
import "./App.css"

function App() {
  return (
    <>
      <Container style={{ marginTop: "5rem" }}>
        <Row>
          <OrderInput />
          <br />
          <br />
          <OrderBook />
        </Row>
      </Container>
    </>
  )
}

export default App
