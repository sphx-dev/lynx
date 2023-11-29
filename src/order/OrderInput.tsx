import React, { useState, useCallback } from "react"
import { useAppDispatch } from "../hooks"
import { placeLimitOrder } from "./api"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function OrderInput() {
  const dispatch = useAppDispatch()
  const [price, setPrice] = useState("")
  const [volume, setVolume] = useState("")

  const submitBuyOrder = () => {
    if (price && volume) {
      dispatch(placeLimitOrder({ price, volume }))
    }
  }

  const submitSellOrder = () => {
    if (price && volume) {
      dispatch(placeLimitOrder({ price, volume }))
    }
  }

  return (
    <>
      <Card data-bs-theme="dark">
        <Card.Body>
          <Row>
            <Col md={6}>
              <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                Oil / USDC
              </div>
            </Col>
          </Row>
          <Card style={{ marginTop: "1rem", marginBottom: "1rem" }}>
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
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </>
  )
}

export default OrderInput
