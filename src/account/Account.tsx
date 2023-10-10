import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getAccount, account } from "./api"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
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
                <ListGroup.Item>{acct.account.Id}</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
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
