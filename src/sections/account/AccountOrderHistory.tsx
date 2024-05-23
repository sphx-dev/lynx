import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { getAccount, account } from "../../state/accountSlice";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

function AccountOrderHistory() {
  const acct = useAppSelector(account);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAccount());
  }, [acct.balance, dispatch]);

  const getRandomArbitrary = (min: any, max: any) => {
    return (Math.random() * (max - min) + min).toFixed(2);
  };

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
                  <th>PnL</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {acct.openOrders?.map((order, i) => {
                  console.log(order);
                  let pnl = getRandomArbitrary(4, 20);
                  let color = "green";
                  let status = "ACTIVE";
                  if (i % 2 === 0) {
                    pnl = -pnl;
                    color = "red";
                  }
                  if (i > 2) {
                    pnl = "";
                    status = "PENDING";
                  }
                  return (
                    <tr key={i}>
                      <td>{order["id"]}</td>
                      <td>OIL / USDC</td>
                      {/* <td>{order["side"].toUpperCase()}</td> */}
                      <td>BUY</td>
                      <td>{order["price"]}</td>
                      <td>{order["quantity"]}</td>
                      <td style={{ color: color }}>{pnl}%</td>
                      <td>
                        <Badge bg="primary">{status}</Badge>
                      </td>
                      <td>{order["timestamp"]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </Card.Body>
      </Card>
    </>
  );
}

export default AccountOrderHistory;
