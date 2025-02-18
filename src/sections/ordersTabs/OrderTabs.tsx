import styled from "styled-components";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Stack, Icon } from "../../components";
import useTheme from "../../hooks/useTheme";
// import { useAppSelector } from "../../hooks";
// import { account } from "../../state/accountSlice";
import PendingOrders from "./PendingOrders";
import OrdersHistory from "./OrdersHistory";
import Positions from "./Positions/Positions";
interface TabProps {
  $isActive?: boolean;
}
const Tab = styled.button<TabProps>`
  ${({ theme, $isActive }) => theme.fonts.typography.actionMd};
  padding: 14px 34px;
  background: none;
  border: none;
  color: ${({ theme, $isActive }) =>
    $isActive
      ? theme.colors.selectedTheme.tableTabs.colorActive
      : theme.colors.selectedTheme.tableTabs.color};
  border-right: ${({ theme }) =>
    `1px solid ${theme.colors.selectedTheme.tableTabs.border}`};
  display: flex;
  cursor: pointer;
  svg {
    margin-right: 4px;
  }
`;

const ScrollContent = styled.div`
  height: 300px;
  width: 100%;
  position: relative;
`;

const Tabs = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.selectedTheme.tableTabs.background};
  width: 100%;
  min-width: 400px;
`;
const CONTENT = [Positions, PendingOrders, OrdersHistory, Table];

const OrderTabs = () => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation();
  const { themeColors } = useTheme();
  // const { openOrders, closedOrders, positions } = useAppSelector(account);
  const Content = useMemo(() => CONTENT[active], [active]);

  const tabs = useMemo(
    () => [
      {
        title: "positions",
        icon: "PositionsIcon",
      },
      {
        title: "pending",
        icon: "PendingIcon",
      },
      {
        title: "orderHistory",
        icon: "OrdersIcon",
      },
      // {
      //   title: "trades",
      //   icon: "TradesIcon",
      // },
    ],
    []
  );

  return (
    <Stack spacing={0} style={{ flex: "0 1 auto" }}>
      <Tabs>
        {tabs.map(({ icon, title }, index) => (
          <Tab
            data-testid={`order-tab-${title}`}
            key={index}
            $isActive={active === index}
            onClick={() => setActive(index)}
          >
            <>
              <Icon
                // @ts-ignore
                icon={icon}
                size="normal"
                stroke={
                  active === index
                    ? themeColors.tableTabs.colorActive
                    : themeColors.tableTabs.color
                }
              />
              {t(title)}
            </>
          </Tab>
        ))}
      </Tabs>
      <ScrollContent>
        <Content key={active} />
      </ScrollContent>
    </Stack>
  );
};

export default OrderTabs;
