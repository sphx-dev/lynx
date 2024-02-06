import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { getAccount, account } from "./api"
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import { FaEthereum, FaBitcoin, FaDollarSign } from "react-icons/fa6"

function AccountCard() {
  const acct = useAppSelector(account)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAccount())
  }, [account])

  return (
    <>
      <Card data-bs-theme="dark" style={{ marginBottom: "2rem" }}>
        <Card.Body>
          <Card style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            {acct ? (
              <>
                <ListGroup>
                  <ListGroup.Item>Account ID: {acct.id}</ListGroup.Item>
                  <ListGroup.Item>
                    USDC ( <FaDollarSign /> ): {acct.balance.toString()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    BTC ( <FaBitcoin /> ): 4.2849
                  </ListGroup.Item>
                  <ListGroup.Item>
                    ETH ( <FaEthereum /> ): 24.5963
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
