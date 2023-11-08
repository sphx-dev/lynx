import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import ReadMe from "./ReadMe"
import logo from "./static/logo.png"

function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid={true}>
          <Navbar.Brand href="#home">
            <img src={logo} height="60" alt="header-logo" />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <ReadMe />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
