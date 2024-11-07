import React, { FunctionComponent } from "react";
import { Container } from "./TitleRowStyle";
import { Text } from "../../components";
import styled from "styled-components";

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
  return (
    <Container data-testid="title-row">
      {titles.map((title, index) => (
        <Label key={title}>
          <Text variant="textXs" color="secondaryLink">
            {title}
          </Text>
        </Label>
      ))}
    </Container>
  );
};

export default TitleRow;
