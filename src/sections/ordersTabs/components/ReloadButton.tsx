import styled from "styled-components";

export const ReloadButton = ({ onClick }: { onClick: () => void }) => {
  return <StyledButton onClick={onClick}> &#8635; </StyledButton>;
};

const StyledButton = styled.button`
  position: absolute;
  top: 7px;
  right: 0;
  z-index: 1;

  pointer-events: all;
  background: #009982;
  padding: 0 0;
  border: 1px solid transparent;
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  border-radius: 4px;
  color: #ffffff;
  width: 25px;
  outline: none;
  cursor: pointer;
  transition: 0.2s all;
  white-space: nowrap;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:active {
    background: #00695b;
  }
`;
