import React, { useState, useCallback } from "react"
import { useAppDispatch } from "../hooks"
import { placeLimitOrder } from "./api"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import toast from "react-hot-toast"
import { getAccount } from "../account/api"

function OrderInput() {
  const dispatch = useAppDispatch()
  const [price, setPrice] = useState("")
  const [volume, setVolume] = useState("")

  const notify = () => toast("Order placed")

  const submitBuyOrder = () => {
    if (price && volume) {
      notify()
      dispatch(placeLimitOrder({ price, volume }))
      dispatch(getAccount())
    }
  }

  const submitSellOrder = () => {
    if (price && volume) {
      notify()
      dispatch(placeLimitOrder({ price, volume }))
    }
  }

  return (
    <>
      <Card data-bs-theme="dark">
        <Card.Body>
          <Card style={{ marginTop: "1rem" }}>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="float"
                    placeholder="0.00"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formVolume">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Amount"
                    onChange={(e) => setVolume(e.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Col md={3}>
                    <Button
                      variant="primary"
                      onClick={submitBuyOrder}
                      style={{ width: "6rem" }}
                    >
                      Buy
                    </Button>
                  </Col>
                  <Col md={3}>
                    <Button
                      variant="danger"
                      onClick={submitSellOrder}
                      style={{ width: "6rem" }}
                    >
                      Sell
                    </Button>
                  </Col>
                </Row>
              </Form>
              <hr />
              <ListGroup variant="flush">
                <ListGroup.Item>Borrow Fee: -0.0016 / Hour</ListGroup.Item>
                <ListGroup.Item>Funding Fee: -0.003% / Hour</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </>
  )
}

export default OrderInput
