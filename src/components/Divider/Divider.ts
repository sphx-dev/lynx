import styled from "styled-components";
import { getThemeColors } from "../../theme";

const Divider = styled.div`
  background-color: ${({ theme }) => getThemeColors(theme).divider.primary};
  height: 1px;
`;
export default Divider;
