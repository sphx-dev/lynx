import { useTranslation } from "react-i18next";
import { Title } from "./styled";
import styled from "styled-components";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import config, { getChain } from "@/config";
import { getThemeColors } from "@/theme";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";
import { Link } from "react-router-dom";
import { LoaderBar } from "@/components/LoaderBar";
import { Button } from "@/components/ButtonV2/Button";

export const Faucet = () => {
  const { t } = useTranslation();
  const { address } = useChainCosmoshub();
  const [selectedAddress, setSelectedAddress] = useState(address);
  const [txHash, setTxHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!selectedAddress || selectedAddress === "") {
      setSelectedAddress(address);
    }
  }, [selectedAddress, address]);

  const mutation = useMutation({
    mutationFn: async () => {
      setErrorMessage("");
      setTxHash("");

      return await fetch(config.VITE_FAUCET_URL + "/send_funds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "Ujem5Y8uRGqKSQEM4X2CVF3ADx6vhLWn",
        },
        body: JSON.stringify({
          chain: getChain().chainId,
          address: selectedAddress,
          walletAddress: selectedAddress,
          denom: "usdc",
          amount: ["1000000"],
        }),
      }).then(res => {
        return res.json();
      });
    },
    onError: (error: any) => {
      setErrorMessage(error?.message || t("faucetError"));
    },
    onSuccess: data => {
      if (data.error) {
        setErrorMessage(data.error);
      }
      setTxHash(data.txHash);
    },
  });

  return (
    <div>
      <Title>{t("faucet")}</Title>

      <DefaultContainer>
        <BlockWrapper>
          <MessageBox>{t("faucetMessage")}</MessageBox>
          <Row>
            <Input
              placeholder={t("enterAddress")}
              label={t("address")}
              style={{ width: "400px" }}
              inputStyle={{ textAlign: "left" }}
              value={selectedAddress}
              onChange={e => {
                setErrorMessage("");
                const target = e.target as HTMLInputElement;
                setSelectedAddress(target.value);
              }}
            />
          </Row>
          <Row>
            <Button
              style={{ width: "400px" }}
              disabled={mutation.isLoading}
              onClick={() => {
                if (
                  !selectedAddress ||
                  selectedAddress.length < 40 ||
                  !selectedAddress.startsWith("sphx")
                ) {
                  setErrorMessage(t("invalidAddress"));
                  return;
                }
                setErrorMessage("");
                mutation.mutate();
              }}
            >
              {t("getTokens")}
            </Button>
          </Row>
          <Row>
            <LoaderBar
              style={{
                width: "400px",
                visibility: mutation.isLoading ? "visible" : "hidden",
              }}
            />
          </Row>
          <Row>
            <ErrorMessageBox>{errorMessage}</ErrorMessageBox>
          </Row>
          <Row>
            {txHash && (
              <span>
                {t("fundsDeposited")}{" "}
                <StyledLink
                  to={config.VITE_EXPLORER_URL + "/transactions/" + txHash}
                  target="_blank"
                >
                  {t("checkTransaction")}
                </StyledLink>
              </span>
            )}
          </Row>
        </BlockWrapper>
      </DefaultContainer>
    </div>
  );
};

const DefaultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-wrap: wrap;
  width: 550px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const MessageBox = styled.div`
  line-height: 1.5rem;
  width: 100%;
  padding-bottom: 0.8rem;
`;

const ErrorMessageBox = styled.div`
  line-height: 1.5rem;
  width: 400px;
  padding-bottom: 0.8rem;
  color: ${({ theme }) => `${getThemeColors(theme).text.error}`};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => `${getThemeColors(theme).text.secondaryLink}`};
  text-decoration: unset;
  &:hover {
    text-decoration: underline;
  }
`;
