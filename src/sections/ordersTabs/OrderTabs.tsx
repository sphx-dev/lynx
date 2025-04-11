import styled from "styled-components";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table, Stack, Icon } from "../../components";
import Positions from "./Positions/Positions";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import OrdersByAccount from "./OrdersByAccount";
import OrdersHistoryByAccount from "./OrdersHistoryByAccount";
interface TabProps {
  $isActive?: boolean;
}
const Tab = styled.button<TabProps>`
  font-family: var(--action-md-font-family);
  font-size: var(--action-md-font-size);
  font-weight: var(--action-md-font-weight);
  line-height: var(--action-md-line-height);
  padding: 14px 34px;
  background: none;
  border: none;
  color: var(--table-tabs-color);
  border-right: 1px solid var(--table-tabs-border);
  display: flex;
  cursor: pointer;
  svg {
    margin-right: 4px;
  }
  &.active {
    color: var(--table-tabs-color-active);
  }
`;

const ScrollContent = styled.div`
  height: 300px;
  width: 100%;
  position: relative;
`;

const Tabs = styled.div`
  display: flex;
  background: var(--table-tabs-background);
  width: 100%;
  min-width: 400px;
`;
const CONTENT = [Positions, OrdersByAccount, OrdersHistoryByAccount, Table];

const OrderTabs = () => {
  const [active, setActive] = useLocalStorage("selectedOrderTab", 0);
  const { t } = useTranslation();
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
        params: {
          final: true,
        },
      },
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
            className={active === index ? "active" : ""}
            // $isActive={active === index}
            onClick={() => setActive(index)}
          >
            <>
              <Icon
                // @ts-ignore
                icon={icon}
                size="normal"
                stroke={
                  active === index
                    ? "var(--table-tabs-color-active)"
                    : "var(--table-tabs-color)"
                }
              />
              {t(title)}
            </>
          </Tab>
        ))}
      </Tabs>
      <ScrollContent>
        <Content key={active} {...(tabs[active]?.params || {})} />
      </ScrollContent>
    </Stack>
  );
};

export default OrderTabs;
