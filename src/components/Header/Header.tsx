import styled from "styled-components";
import logo from "../../assets/icons/logo-dark.svg";
import Group from "../Group";
import Nav from "./navbar";
import headerBg from "../../assets/images/header-logo-bg.svg";

const StyledHeader = styled.header<{ $url: string }>`
  position: relative;
  background-image: url("${({ $url }) => $url}");
  background-repeat: no-repeat;
  min-width: 320px;
  height: 100px;
`;

const Logo = styled.img`
  padding-top: 15px;
  margin-left: 45px;
`;

const Header = () => {
  return (
    <Group fluid spacing={0} style={{ width: "100vw" }}>
      <StyledHeader $url={headerBg}>
        <Logo src={logo} />
      </StyledHeader>
      <Nav />
    </Group>
  );
};

export default Header;
