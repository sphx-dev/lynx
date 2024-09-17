import { useEffect } from "react";
import styled from "styled-components";
import { getAllMarkets } from "../utils/queryMarkets";

const MarketsPage: React.FC = () => {
  useEffect(() => {
    (async () => {
      const data = await getAllMarkets();
      console.log("ALL MARKETS", data);
    })();
  }, []);
  return (
    <Wrapper>
      <h1>Markets</h1>
    </Wrapper>
  );
};

export default MarketsPage;

const Wrapper = styled.div`
  background: linear-gradient(
    180deg,
    #083f46 0%,
    #093f46 9.35%,
    #0e3f4e 51%,
    #0a2536 100%
  );
  color: white;
  ${({ theme }) => theme.fonts.typography.textMd}
  height: 100%;
  width: 100%;
  min-height: 500px;
  padding: 20px;
`;
