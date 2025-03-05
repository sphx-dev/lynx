import styled from "styled-components";
import { Link } from "react-router-dom";
import { navLinks } from "./config";
import { ConnectButton } from "../../ConnectButton";
import { MarginAccButton } from "../../MarginAccButton";
import { SmartSignButton } from "@/components/SmartSignButton";

const Wrapper = styled.nav`
  background-color: var(--background-primary);
  display: flex;
  align-items: center;
  padding: 0px 30px;
  height: 35px;
  gap: 20px;
  flex: 1;
  box-shadow: 0px 4px 8px 0px #00000040;
`;
const StyledLink = styled(Link)`
  font-family: var(--navigation-font-family);
  font-size: var(--navigation-font-size);
  font-weight: var(--navigation-font-weight);
  line-height: var(--navigation-line-height);

  color: var(--text-secondary-link);
  &.active {
    color: var(--text-primary);
  }
  text-transform: uppercase;
  text-decoration: none;
`;

const Navbar = () => {
  return (
    <Wrapper>
      {navLinks.map(({ title, path, target }) => (
        <StyledLink to={path} key={title} target={target}>
          {title}
        </StyledLink>
      ))}
      <ConnectButton size="xs" />
      <MarginAccButton size="xs" />
      <SmartSignButton />
    </Wrapper>
  );
};

export default Navbar;
