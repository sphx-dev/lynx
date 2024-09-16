import styled from "styled-components";
import { Button, Input, Stack } from "../components";
import { ConnectButton } from "../components/ConnectButton";
import { useChainCosmoshub } from "../hooks/useChainCosmoshub";
import { useMarginAccount } from "../hooks/useMarginAccounts";
import { useEffect, useState } from "react";
import { getBalance } from "../utils/getBalance";
import { Coin } from "@cosmjs/proto-signing";
import { sendTokens } from "../utils/sendTokens";
import { errorAlert, infoAlert, successAlert } from "../utils/alerts";

const MarginAccountsPage = () => {
  const { address, reconnect } = useChainCosmoshub();
  const {
    status,
    isReady,
    marginAccounts,
    createAccount,
    selectedAddress,
    selectedIndex,
    setSelectedIndex,
  } = useMarginAccount(address);

  const [balance, setBalance] = useState<Coin | null>(null);
  useEffect(() => {
    (async () => {
      if (address) {
        const currentBalance = await getBalance(address, "uusdc");
        console.log("currentBalance", currentBalance);
        setBalance(currentBalance);
      }
    })();
  }, [address]);

  const [balances, setBalances] = useState<any[]>([]);
  useEffect(() => {
    if (marginAccounts && marginAccounts.length) {
      const promises = marginAccounts.map(account =>
        getBalance(account.address, "uusdc")
      );
      Promise.all(promises).then(balances => {
        setBalances(balances);
      });
    } else {
      setBalances([]);
    }
  }, [marginAccounts]);

  const [sendAmount, setSendAmount] = useState<string>("");
  const [canSend, setCanSend] = useState<boolean>(true);

  return (
    <Wrapper data-test="margin-accounts-page">
      <h1 style={{ color: "white" }}>
        Margin Accounts <span style={{ fontSize: "12px" }}>{status}</span>
      </h1>

      <Stack
        fullHeight
        // justify="center"
        // align="center"
        // style={{ minHeight: "calc(100vh - 98px - 25px)" }}
      >
        <RowContainer>
          <ConnectButton />
        </RowContainer>
        {address ? (
          <RowContainer>
            <label>Address:</label>
            <label>{address}</label>
            <label>
              {balance && <>({Number(balance.amount) / 1e6} usdc</>})
            </label>
            <Button onClick={() => reconnect()}>Reconnect</Button>
          </RowContainer>
        ) : (
          <RowContainer>
            <label>Select a wallet and click connect</label>
          </RowContainer>
        )}
        {address && (
          <>
            <RowContainer>
              <h3>Margin Accounts (#{selectedIndex})</h3>
            </RowContainer>
            <RowContainer>
              <h4>Using: {selectedAddress}</h4>
              {isReady ? (
                <Button onClick={createAccount}>
                  Create new Margin Account
                </Button>
              ) : (
                <Button disabled>Creating...</Button>
              )}
              <Input
                placeholder="10usdc"
                type="number"
                value={sendAmount}
                onChange={event => {
                  setSendAmount((event.target as HTMLInputElement).value);
                }}
              />
              <label>{sendAmount} usdc</label>
              <Button
                disabled={!canSend}
                onClick={() => {
                  const amount = Number(sendAmount) * 1e6;
                  if (!isNaN(amount) && amount > 0) {
                    setCanSend(false);
                    sendTokens(
                      {
                        from: address,
                        to: marginAccounts[selectedIndex].address,
                        amount: amount,
                        denom: "uusdc",
                        memo:
                          "Send funds to margin account #" +
                          marginAccounts[selectedIndex].id?.number,
                      },
                      () => {
                        successAlert("Funds sent successfully");
                        setCanSend(true);
                        setSendAmount("");
                      },
                      error => {
                        errorAlert(error.message);
                        setCanSend(true);
                      }
                    );
                  }
                }}
              >
                Send
              </Button>
            </RowContainer>
          </>
        )}
        {marginAccounts &&
          balances &&
          marginAccounts.map((account, index) => (
            <RowContainer
              key={account.id?.number}
              className={selectedIndex === index ? "selected" : ""}
            >
              <AccountContainer>
                <Button onClick={() => setSelectedIndex(index)}>Select</Button>
                <div>#{account?.id?.number}</div>
                <div title="Send funds" style={{ minWidth: "600px" }}>
                  {account.address}
                </div>
                <div>Positions: {account.perpertualPositions.length}</div>
                <div style={{ minWidth: "70px" }}>
                  {balances[index]
                    ? balances[index].amount / 1e6
                    : "Loading..."}{" "}
                  usdc
                </div>
                <Button onClick={() => infoAlert("TODO")}>Withdraw</Button>
              </AccountContainer>
            </RowContainer>
          ))}
      </Stack>
    </Wrapper>
  );
};

export default MarginAccountsPage;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
  min-height: calc(100vh - 28px - 100px);
  color: white;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const AccountContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  align-items: center;

  .selected & {
    text-decoration: underline;
  }
`;
