import React from "react"
import Container from "react-bootstrap/Container"
import { Outlet } from "react-router-dom"

const BaseTemplate = () => {
  return (
    <Container
      data-bs-theme="dark"
      fluid={true}
      style={{ marginTop: "2rem", minHeight: "100vh" }}
    >
      <Outlet />
    </Container>
  )
}

export default BaseTemplate
