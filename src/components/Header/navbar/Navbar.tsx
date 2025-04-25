import styled from "styled-components";
import { ConnectButton } from "../../ConnectButton";
import { MarginAccButton } from "../../MarginAccButton";
import { SmartSignButton } from "@/components/SmartSignButton";

const Wrapper = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  flex: 1;
`;

const Navbar = () => {
  return (
    <Wrapper>
      <ConnectButton />
      <MarginAccButton />
      <SmartSignButton />
    </Wrapper>
  );
};

export default Navbar;
