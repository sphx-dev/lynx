import styled from "styled-components";

interface PriceLevelContainerProps {
  $isRight: boolean;
}

export const PriceLevelContainer = styled.div<PriceLevelContainerProps>`
  display: flex;
  position: relative;
  padding-left: 8px;
  padding-right: 8px;

  &:after {
    background-color: ${props => (props.$isRight ? "#113534" : "#3d1e28")};
    background-position: center;
    height: 100%;
    padding: 0.3em 0;
    display: block;
    content: "";
    position: absolute;
    left: 0;
    right: unset;
    z-index: 0;

    @media only screen and (min-width: 800px) {
      left: ${props => (props.$isRight ? "unset" : 0)};
      right: ${props => (props.$isRight ? 0 : "unset")};
    }
  }

  span {
    z-index: 1;
    min-width: 54px;
  }

  .price {
    color: ${props => (props.$isRight ? "#118860" : "#bb3336")};
  }
`;

export const PriceLevelRowContainer = styled.div`
  padding: 0;
  cursor: pointer;
  position: relative;
  /* &:hover {
    background-color: #91919147;
  } */
  border-radius: 4px;
`;
