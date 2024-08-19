import styled from "styled-components";
import { getThemeColors } from "../../theme";
import { useTranslation } from "react-i18next";
import useTheme from "../../hooks/useTheme";
import { useChainCosmoshub } from "../../hooks/useChainCosmoshub";
const Wrapper = styled.footer`
  background-color: ${({ theme }) => getThemeColors(theme).background.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 30px;
`;

interface IStatusProps {
  color?: string;
}

const Status = styled.div<IStatusProps>`
  ${({ theme }) => theme.fonts.typography.navigation}
  color: ${({ theme, color }) =>
    color || getThemeColors(theme).text.secondaryLink};
  text-transform: uppercase;
  text-decoration: none;
  display: flex;
  align-items: center;
  .status-icon {
    background-color: ${({ theme, color }) =>
      color || getThemeColors(theme).text.secondaryLink};
    width: 8px;
    height: 8px;
    margin-right: 6px;
    border-radius: 50%;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const NavItem = styled.a`
  color: ${({ theme }) => getThemeColors(theme).text.tertiary};
  background-color: transparent;
  text-decoration: none;
  ${({ theme }) => theme.fonts.typography.actionSmBold};
  cursor: pointer;
`;
const Footer = () => {
  const { isConnected } = useChainCosmoshub();
  const { themeColors } = useTheme();
  const color = !isConnected ? themeColors.negative2 : "";
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Status color={color}>
        <div className="status-icon" />
        {isConnected ? t("online") : t("offline")}
      </Status>
      <Nav>
        <NavItem>{t("stats")}</NavItem>
        <NavItem>{t("docs")}</NavItem>
        <NavItem>{t("support")}</NavItem>
      </Nav>
    </Wrapper>
  );
};

export default Footer;
