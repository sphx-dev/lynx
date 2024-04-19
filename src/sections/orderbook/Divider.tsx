import React from "react"
import styled from "styled-components"
import { getThemeColors } from "../../theme"
import { Text } from "../../components"

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border: ${({ theme }) => `1px solid ${getThemeColors(theme).border.default}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 5px 10px;
`

const Divider = () => {
  return (
    <Container>
      <Text variant="textNumMdBold" color="secondaryActive">
        $2.00
      </Text>
      <Text variant="textNumMdBold" color="secondaryActive">
        0.14%
      </Text>
    </Container>
  )
}

export default Divider
