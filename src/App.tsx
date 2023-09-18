import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import OrderInput from "./OrderInput"
import "./App.css"

function App() {
  return (
    <>
      <Container style={{ marginTop: "5rem" }}>
        <Row>
          <OrderInput />
        </Row>
      </Container>
    </>
  )
}

export default App
