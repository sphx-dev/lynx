import styled from "styled-components";

export const LoaderBar = styled.div`
  height: 3px;
  width: 100%;
  --c: no-repeat linear-gradient(#082536 0 0);
  background: var(--c), var(--c), #0e474d;
  background-size: 60% 100%;
  animation: l16 1.8s infinite;

  @keyframes l16 {
    0% {
      background-position: -150% 0, -150% 0;
    }
    66% {
      background-position: 250% 0, -150% 0;
    }
    100% {
      background-position: 250% 0, 250% 0;
    }
  }
`;
