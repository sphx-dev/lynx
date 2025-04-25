import styled from "styled-components";
import { getThemeColors } from "@/theme";

const DepthVisualizer = styled.div`
  height: 98%;
  transition: width 0.5s;
  width: var(--depth);
  top: 0;
  left: 0;
  position: absolute;
  transform: translateX(1%);
  z-index: 0;
  border-radius: 4px;

  &:after {
    content: "";
    display: block;
    height: 100%;
    width: var(--filled);
    top: 0;
    right: 0;
    position: absolute;
    z-index: 1;
  }
`;

export const DepthVisualizerBid = styled(DepthVisualizer)`
  background-color: var(--cyan-alpha-10);
  /* background-color: ${({ theme }) => getThemeColors(theme).positive};
  :hover > & {
    background-color: ${({ theme }) => getThemeColors(theme).positive};
  }
  &:after {
    background-color: ${({ theme }) => getThemeColors(theme).positive2};
  }
  :hover > &:after {
    background-color: ${({ theme }) => getThemeColors(theme).positive2};
  } */
`;

export const DepthVisualizerAsk = styled(DepthVisualizer)`
  background-color: var(--red-alpha-10);

  /* background-color: ${({ theme }) => getThemeColors(theme).negative};
  :hover > & {
    background-color: ${({ theme }) => getThemeColors(theme).negative};
  }
  &:after {
    background-color: ${({ theme }) => getThemeColors(theme).negative2};
  }
  :hover > &:after {
    background-color: ${({ theme }) => getThemeColors(theme).negative2};
  } */
`;
