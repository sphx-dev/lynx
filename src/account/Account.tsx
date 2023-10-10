import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getAccount, account } from "./api"
import Card from "react-bootstrap/Card"
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
              <ListGroup>
                <ListGroup.Item>ID: {acct.id}</ListGroup.Item>
                <ListGroup.Item>
                  Balance: {acct.balance.toString()}
                </ListGroup.Item>
              </ListGroup>
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
