import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"

function OrderInput() {
  return (
    <>
      <Card style={{ backgroundColor: "#e5e5e5" }}>
        <Card.Body>
          <Card style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Long (USDC) Oil</Form.Label>
                  <Form.Control type="float" placeholder="0.00" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="number" placeholder="Long amount" />
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
