import { FC } from "react"
import styled from "styled-components"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FlexDivCol } from "../components/Flex"
import logo from "../assets/logo.png"
// import WalletButtons from "./WalletButtons"

const Header: FC = () => {
  return (
    <FlexDivCol>
      <Container>
        <LogoNav>
          <img src={logo} height="60" alt="header-logo" />
        </LogoNav>
        <ConnectButton />
      </Container>
    </FlexDivCol>
  )
}

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`

const LogoNav = styled.div`
  display: flex;
  align-items: center;
`

export default Header
