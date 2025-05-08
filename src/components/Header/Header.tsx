import styled from "styled-components";
import logo from "../../assets/header-logo.svg";
import Nav from "./navbar";
import { navLinks } from "./navbar/config";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;

  min-height: 64px;

  background-color: var(--bg-strong-1000);
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: var(--stroke-soft-200);
`;

const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Logo = styled.img`
  height: 20px;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 24px;
  margin: 0 40px 0 40px;
  background-color: var(--stroke-soft-200);
`;

const StyledLink = styled(Link)`
  /* text-transform: uppercase; */
  text-decoration: none;

  font-family: var(--text-small-font-family);
  font-weight: var(--text-small-font-weight);
  font-size: var(--text-small-font-size);
  line-height: var(--text-small-line-height);
  letter-spacing: var(--text-small-letter-spacing);

  color: var(--text-strong-950);

  padding: 6px 16px;
  border-radius: 50px;

  &.active {
    background-color: var(--primary-alpha-6);
    color: var(--primary-base);
  }
`;

const Header = () => {
  const location = useLocation();
  return (
    <Container>
      <LeftBlock>
        <Logo src={logo} />
        <VerticalDivider />
        {navLinks.map(({ title, path, target }) => (
          <StyledLink
            to={path}
            key={title}
            target={target}
            className={location.pathname.includes(path) ? "active" : ""}
          >
            {title}
          </StyledLink>
        ))}
      </LeftBlock>
      <Nav />
    </Container>
  );
};

export default Header;
