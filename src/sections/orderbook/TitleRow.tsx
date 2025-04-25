import { FunctionComponent } from "react";
import { Container } from "./TitleRowStyle";
import { Text } from "../../components";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface TitleRowProps {
  titles: string[];
}

const Label = styled.div`
  flex: 1;
  text-align: center;
  &:first-child {
    text-align: left;
  }
  &:last-child {
    text-align: right;
  }
`;

const TitleRow: FunctionComponent<TitleRowProps> = ({ titles }) => {
  const { t } = useTranslation();
  return (
    <Container data-testid="title-row">
      {titles.map((title, index) => (
        <Label key={title}>
          <Text variant="textXSmall" color="sub600">
            {t(title)}
          </Text>
        </Label>
      ))}
    </Container>
  );
};

export default TitleRow;
