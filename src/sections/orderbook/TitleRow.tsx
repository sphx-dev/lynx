import React, { FunctionComponent } from "react"
import { Container } from "./TitleRowStyle"
import { MOBILE_WIDTH } from "../../constants"
import { Text } from "../../components"
import styled from "styled-components"

interface TitleRowProps {
  reversedFieldsOrder?: boolean
  windowWidth: number
}

const Label = styled.div`
  flex: 1;
`

const TitleRow: FunctionComponent<TitleRowProps> = ({
  reversedFieldsOrder = false,
  windowWidth,
}) => {
  return (
    <Container data-testid="title-row">
      <Label>
        <Text variant="textXs" color="secondaryLink">
          PRICE ETH
        </Text>
      </Label>
      <Label>
        <Text variant="textXs" color="secondaryLink">
          AMOUNT
        </Text>
      </Label>
      <Label>
        <Text variant="textXs" color="secondaryLink">
          TOTAL
        </Text>
      </Label>
    </Container>
  )
}

export default TitleRow
