import React from "react"
import styled from "styled-components"
import { Group } from "../../components"
import { getThemeColors } from "../../theme"
import { NavLink } from "react-router-dom"
import { navLinks } from "./config"
import Icon from "../../components/Icon"
import useTheme from "../../hooks/useTheme"

const Wrapper = styled.nav`
  background-color: ${({ theme }) => getThemeColors(theme).background.primary};
  display: flex;
  align-items: center;
  padding: 8px 30px;
  gap: 20px;
  flex: 1;
  box-shadow: 0px 4px 8px 0px #00000040;
`
const StyledLink = styled(NavLink)`
  ${({ theme }) => theme.fonts.typography.navigation}
  color: ${({ theme }) => getThemeColors(theme).text.secondaryLink};
  &.active {
    color: ${({ theme }) => getThemeColors(theme).text.primary};
  }
  text-transform: uppercase;
  text-decoration: none;
`

const Navbar = () => {
  const { themeColors } = useTheme()
  return (
    <Wrapper>
      <Icon icon="HomeIcon" stroke={themeColors.text.secondaryLink} />
      {navLinks.map(({ title, path }) => (
        <StyledLink to={path} key={title}>
          {title}
        </StyledLink>
      ))}
    </Wrapper>
  )
}

export default Navbar
