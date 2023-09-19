import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Image from "react-bootstrap/Image"
import logo from "./static/logo.png"

function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} height="60" />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Account Balance: $254,679 USDC</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
