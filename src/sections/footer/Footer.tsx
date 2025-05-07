import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useChainCosmoshub } from "@/hooks/useChainCosmoshub";
import { RiHeadphoneLine } from "@remixicon/react";
import { StatusBadge } from "@/components/Badge/StatusBadge";

const Wrapper = styled.footer`
  background-color: var(--neutral-1000);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  height: 36px;
  border-top: 1px solid var(--stroke-soft-200);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const NavItem = styled.a`
  font-family: var(--text-x-small-font-family);
  font-size: var(--text-x-small-font-size);
  font-weight: var(--text-x-small-font-weight);
  line-height: var(--text-x-small-line-height);
  color: var(--text-sub-600);
  background-color: transparent;
  text-decoration: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
`;
const Footer = () => {
  const { isConnected } = useChainCosmoshub();
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Nav>
        <NavItem href="mailto:info@sphx.io" target="_blank" rel="noopener">
          <RiHeadphoneLine style={{ width: "16px", height: "16px" }} />
          {t("support")}
        </NavItem>
        <NavItem rel="noopener">{t("stats")}</NavItem>
        <NavItem href="https://docs.sphx.io/" target="_blank" rel="noopener">
          {t("docs")}
        </NavItem>
      </Nav>
      <StatusBadge
        status={isConnected ? "completed" : "failed"}
        styleType="light"
        dot
      >
        {isConnected ? t("online") : t("offline")}
      </StatusBadge>
    </Wrapper>
  );
};

export default Footer;
