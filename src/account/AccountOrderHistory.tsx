import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getAccount, account } from "./api"
import Card from "react-bootstrap/Card"
import Table from "react-bootstrap/Table"
import ListGroup from "react-bootstrap/ListGroup"

function AccountOrderHistory() {
  const acct = useAppSelector(account)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAccount())
  }, [acct.balance])

  return (
    <>
      <Card data-bs-theme="dark" style={{ marginTop: "3rem" }}>
        <Card.Body>
          <Card style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Instrument</th>
                  <th>Type</th>
                  <th>Entry Price</th>
                  <th>Volume</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {acct.openOrders?.map((order, i) => {
                  console.log(order)
                  return (
                    <tr key={i}>
                      <td>{order["id"]}</td>
                      <td>OIL / USDC</td>
                      <td>{order["side"].toUpperCase()}</td>
                      <td>{order["price"]}</td>
                      <td>{order["quantity"]}</td>
                      <td>{order["timestamp"]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Card>
        </Card.Body>
      </Card>
    </>
  )
}

export default AccountOrderHistory
