import styled from "styled-components"
import { getThemeColors } from "../theme"

const Surface = styled.div`
  background: ${({ theme }) =>
    getThemeColors(theme).background.gradientSurface};
    height: 100%;
`

export default Surface
