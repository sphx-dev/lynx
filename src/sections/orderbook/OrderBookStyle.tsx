import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-color: #263946;
  padding: 10px;
  height: 100%;
`;

export const TableContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: #bfc1c8;
`;

export const TextContainer = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-family: ${({ theme }) => theme.fonts.fontStyles.semiBold};
`;

export const Bids = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  text-align: left;
  background-color: #1b4d3a;
  transition: width 0.5s;
`;

export const Asks = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  text-align: right;
  background-color: #2f1515;
  transition: width 0.5s;
`;
