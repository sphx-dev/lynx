import styled from "styled-components";

export const RightWrapper = styled.div`
  margin-top: -50px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const Container = styled.div`
  background: linear-gradient(180deg, #0a2536 0%, #14494f 100%);
  width: 99%;
  height: calc(100vh - 100px);
  padding: 16px;
  overflow-y: auto;
`;

export const Title = styled.h2`
  font-family: var(--text-lg-font-family);
  font-size: var(--text-lg-font-size);
  font-weight: var(--text-lg-font-weight);
  line-height: var(--text-lg-line-height);
  color: var(--primary-100);
  margin-bottom: 16px;
`;
