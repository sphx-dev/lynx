import styled from "styled-components";
import logout from "../../assets/icons/logout.svg";
import myAccount from "../../assets/icons/account.svg";
import logo from "../../assets/icons/logo-dark.svg";
import menu from "../../assets/icons/menu.svg";
import Group from "../Group";
import Nav from "../../sections/navbar";

const StyledHeader = styled.header`
  position: relative;
  background-image: url("/src/assets/images/header-bg.png");
  background-position: top;
  width: 320px;
  height: 100px;
  margin-top: -5px;
`;

const NavBar = styled.nav`
  position: absolute;
  top: 70px;
  display: flex;
  justify-content: space-evenly;
  width: 80%;
`;
const Button = styled.div`
  color: ${({ theme }) => theme.colors.common.palette.secondary["700"]};
  ${({ theme }) => theme.fonts.typography.header};
  cursor: pointer;
  display: flex;
  img {
    margin-right: 4px;
    margin-bottom: 2px;
    height: 14px;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.common.palette.secondary["100"]};
  }
`;

const Logo = styled.img`
  padding-top: 12px;
  margin-left: 64px;
`;

const Menu = styled.img`
  padding-top: 16px;
  margin-left: 16px;
`;

const Divider = styled.div`
  border-left: 1px solid #173d46;
`;
const Header = () => {
  return (
    <Group fluid spacing={0} style={{ width: "100vw" }}>
      <StyledHeader>
        {/*<Menu src={menu} />*/}
        <Logo src={logo} />
        <NavBar>
          <Button>
            <img src={myAccount} alt="my account" />
            MY ACCOUNT
          </Button>
          <Divider />
          <Button>
            <img src={logout} alt="my account" />
            LOGOUT
          </Button>
        </NavBar>
        {/*<span>Logout</span>*/}
      </StyledHeader>
      <Nav />
    </Group>
  );
};
export default Header;
