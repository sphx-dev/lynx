import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Text from "../Text";

const Container = styled.div`
  white-space: pre-line;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const OnlyDesktopMessage = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Text variant={"textNumLg"}>{t("onlyDesktopScreen")}</Text>
    </Container>
  );
};

export default OnlyDesktopMessage;
