import React from "react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  //height: calc(100vh - 28px - 95px);
`
const BaseTemplate = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  )
}

export default BaseTemplate
