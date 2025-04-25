import styled from "styled-components";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "../../components";
import Positions from "./Positions/Positions";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import OrdersByAccount from "./OrdersByAccount";
import OrdersHistoryByAccount from "./OrdersHistoryByAccount";
interface TabProps {
  $isActive?: boolean;
}
const Tab = styled.button<TabProps>`
  font-family: var(--text-x-small-font-family);
  font-weight: var(--text-x-small-font-weight);
  font-size: var(--text-x-small-font-size);
  line-height: var(--text-x-small-line-height);
  color: var(--text-sub-600);
  background-color: var(--bg-strong-950);

  margin-right: -1px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--stroke-soft-200);

  padding: 3px 12px;
  display: flex;
  cursor: pointer;
  svg {
    margin-right: 4px;
  }
  &.active {
    color: var(--text-strong-900);
    background-color: var(--bg-surface-800);
  }

  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const ScrollContent = styled.div`
  width: 100%;
  position: relative;
  flex: 1;
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
  min-width: 400px;
  margin-bottom: 8px;
`;

const Container = styled.div`
  flex: 1;
  background: var(--bg-surface-900);
  padding: 8px;
  border-radius: 8px;
`;

const CONTENT = [Positions, OrdersByAccount, OrdersHistoryByAccount, Table];

const OrderTabs = () => {
  const [active, setActive] = useLocalStorage("selectedOrderTab", 0);
  const { t } = useTranslation();
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
    <Container>
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
              {/* <Icon
                // @ts-ignore
                icon={icon}
                size="normal"
                stroke={
                  active === index
                    ? "var(--table-tabs-color-active)"
                    : "var(--table-tabs-color)"
                }
              /> */}
              {t(title)}
            </>
          </Tab>
        ))}
      </Tabs>
      <ScrollContent>
        <Content key={active} {...(tabs[active]?.params || {})} />
      </ScrollContent>
    </Container>
  );
};

export default OrderTabs;
