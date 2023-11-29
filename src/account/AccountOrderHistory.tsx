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
      <Card style={{ backgroundColor: "#e5e5e5", marginTop: "3rem" }}>
        <Card.Body>
          <Card style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {acct.openOrders?.map((order, i) => {
                  // Return the element. Also pass key
                  return (
                    <tr key={i}>
                      <td>{order["id"]}</td>
                      <td>BUY</td>
                      <td>{order["price"]}</td>
                      <td>{order["quantity"]}</td>
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
