import styled from "styled-components";
import logo from "../../assets/icons/logo-dark.svg";
import Group from "../Group";
import Nav from "../../sections/navbar";
import headerBg from "../../assets/images/header-logo-bg.svg";

const StyledHeader = styled.header`
  position: relative;
  background-image: url(${headerBg});
  background-repeat: no-repeat;
  //background-position: top;
  width: 320px;
  height: 100px;
`;

const Logo = styled.img`
  padding-top: 15px;
  margin-left: 45px;
`;

const Header = () => {
  return (
    <Group fluid spacing={0} style={{ width: "100vw" }}>
      <StyledHeader>
        <Logo src={logo} />
        {/*<span>Logout</span>*/}
      </StyledHeader>
      <Nav />
    </Group>
  );
};
export default Header;
