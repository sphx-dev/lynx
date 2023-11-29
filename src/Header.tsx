import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Dropdown from "react-bootstrap/Dropdown"
import Badge from "react-bootstrap/Badge"
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
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                DemoAccount <Badge bg="danger">2</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Wallet</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Reports</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <ReadMe />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
