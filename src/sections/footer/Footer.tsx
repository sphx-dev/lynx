import styled from "styled-components";
import { getThemeColors } from "../../theme";
import { useTranslation } from "react-i18next";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";

const Wrapper = styled.footer`
  background-color: ${({ theme }) => getThemeColors(theme).background.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 30px;
`;

interface IStatusProps {
  $isConnected?: boolean;
}

const Status = styled.div<IStatusProps>`
  ${({ theme }) => theme.fonts.typography.navigation}

  color: ${({ $isConnected }) =>
    $isConnected ? `var(--secondary-700)` : `var(--negative2)`};
  text-transform: uppercase;
  text-decoration: none;
  display: flex;
  align-items: center;
  .status-icon {
    background-color: ${({ $isConnected }) =>
      $isConnected ? `var(--secondary-700)` : `var(--negative2)`};
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
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Status $isConnected={isConnected}>
        <div className="status-icon" />
        {isConnected ? t("online") : t("offline")}
      </Status>
      <Nav>
        <NavItem rel="noopener">{t("stats")}</NavItem>
        <NavItem href="https://docs.sphx.io/" target="_blank" rel="noopener">
          {t("docs")}
        </NavItem>
        <NavItem href="mailto:info@sphx.io" target="_blank" rel="noopener">
          {t("support")}
        </NavItem>
      </Nav>
    </Wrapper>
  );
};

export default Footer;
