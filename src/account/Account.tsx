import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getAccount, account } from "./api"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"

function AccountCard() {
  const acct = useAppSelector(account)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAccount())
  }, [])

  return (
    <>
      <Card style={{ backgroundColor: "#e5e5e5" }}>
        <Card.Body>
          <Row>
            <Col>
              <div>Acccount Info</div>
            </Col>
          </Row>
          <Card style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            {/* <Card.Body>Account Info</Card.Body> */}
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
    </>
  )
}

export default AccountCard
