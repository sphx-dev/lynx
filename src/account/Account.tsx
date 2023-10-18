import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getAccount, account } from "./api"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"

function AccountCard() {
  const acct = useAppSelector(account)
  const dispatch = useAppDispatch()
  // const [account, setAccount] = useState({})

  useEffect(() => {
    dispatch(getAccount())
  }, [])

  return (
    <>
      <Card style={{ backgroundColor: "#e5e5e5" }}>
        <Card.Body>
          <Card style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Card.Body>Account Info</Card.Body>
            {acct ? (
              <>
                <ListGroup>
                  <ListGroup.Item>ID: {acct.id}</ListGroup.Item>
                  <ListGroup.Item>
                    USDC Balance: {acct.balance.toString()}
                  </ListGroup.Item>
                </ListGroup>
              </>
            ) : (
              <></>
            )}
          </Card>
        </Card.Body>
      </Card>
      <br></br>
      <Card style={{ backgroundColor: "#e5e5e5" }}>
        <Card.Body>
          <Card style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Card.Body>Orders</Card.Body>
            {acct && acct.openOrders?.length !== 0 ? (
              <>
                <ListGroup>
                  {acct.openOrders?.map((order, i) => {
                    console.log(order)
                    // Return the element. Also pass key
                    return (
                      <ListGroup.Item key={i}>
                        ID: {order?.id}, Price: {order?.price}, Volume:{" "}
                        {order?.quantity}
                      </ListGroup.Item>
                    )
                  })}
                </ListGroup>
              </>
            ) : (
              <></>
            )}
          </Card>
        </Card.Body>
      </Card>
    </>
  )
}

export default AccountCard
