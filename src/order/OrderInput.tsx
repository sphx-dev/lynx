import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function OrderInput() {
  return (
    <>
      <Card style={{ backgroundColor: "#e5e5e5" }}>
        <Card.Body>
          <Row>
            <Col xs={10}>
              <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                Oil / USDC
              </div>
            </Col>
            <Col>
              <ButtonGroup aria-label="long-short">
                <Button variant="primary">Long</Button>
                <Button variant="secondary">Short</Button>
              </ButtonGroup>
            </Col>
          </Row>

          <Card style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="float" placeholder="0.00" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formVolume">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="number" placeholder="Amount" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Place my trade
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </>
  )
}

export default OrderInput
