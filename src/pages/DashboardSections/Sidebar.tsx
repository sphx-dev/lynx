import { Divider } from "@/components";
import SymbolSelect from "@/components/SymbolSelect/SymbolSelect";
import { ROUTES } from "@/routes";
import Surface from "@/ui/Layouts/Surface";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <Surface
      style={{
        paddingBottom: "32px",
        borderTop: `1px solid var(--border-default)`,
      }}
    >
      <Wrapper>
        <SymbolSelectContainer>
          <SymbolSelect />
        </SymbolSelectContainer>
        <Divider />
        <SymbolSelectContainer>
          <List>
            <ListItem>
              <NavLink to={"/" + ROUTES.dashboard}>{t("overview")}</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to={ROUTES.dashboardFaucet}>{t("faucet")}</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to={ROUTES.dashboardFunding}>{t("funding")}</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to={ROUTES.dashboardOrders}>{t("orderbook")}</NavLink>
            </ListItem>
            <ListItem>
              {/* <NavLink to={ROUTES.dashboardTransfers}>Transfers</NavLink> */}
            </ListItem>
            <ListItem>{/* <span>Comunity</span> */}</ListItem>
          </List>

          {/* TODO: bottom of the sidebar with call to actions */}
          {/* <Button>Deposit</Button>
          <Button>Withdraw</Button> */}
        </SymbolSelectContainer>
      </Wrapper>
    </Surface>
  );
};

export const Wrapper = styled.div`
  background: var(--alpha-white5);
  padding: 16px 0;
  width: 320px;
  position: sticky;
`;

const SymbolSelectContainer = styled.div`
  padding: 0 16px 16px 16px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-family: var(--action-md-font-family);
  font-size: var(--action-md-font-size);
  font-weight: var(--action-md-font-weight);
  line-height: var(--action-md-line-height);
  padding: 8px 0;
`;

const NavLink = styled(Link)`
  width: 100%;
  display: inline-block;
  height: 100%;

  color: var(--text-primary);
  text-decoration: none;
  &:hover {
    color: var(--blue2);
  }
`;
