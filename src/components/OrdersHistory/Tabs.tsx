import styled from "styled-components";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Stack from "../Stack";
import Table from "./Table";
import Icon from "../Icon";
import useTheme from "../../hooks/useTheme";
import { useAppSelector } from "../../hooks";
import { account } from "../../state/accountSlice";
import PendingOrders from "./PendingOrders";
interface TabProps {
  isActive?: boolean;
}
const Tab = styled.button<TabProps>`
  ${({ theme, isActive }) =>
    isActive
      ? theme.fonts.typography.actionMdBold
      : theme.fonts.typography.actionMd};
  padding: 14px 34px;
  background: none;
  border: none;
  color: ${({ theme, isActive }) =>
    isActive
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

const Tabs = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.selectedTheme.tableTabs.background};
  width: 100%;
  min-width: 400px;
`;
const CONTENT = [Table, PendingOrders, Table, Table];

const TableTabs = () => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation();
  const { themeColors } = useTheme();
  const { openOrders } = useAppSelector(account);
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
        count: openOrders.length,
      },
      {
        title: "orders",
        icon: "OrdersIcon",
      },
      {
        title: "trades",
        icon: "TradesIcon",
      },
    ],
    [openOrders]
  );

  return (
    <Stack spacing={0} style={{ flex: "0 1 auto", paddingBottom: "40px" }}>
      <Tabs>
        {tabs.map(({ icon, title, count }, index) => (
          <Tab
            key={index}
            isActive={active === index}
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
              {`${t(title)}${count ? `(${count})` : ""}`}
            </>
          </Tab>
        ))}
      </Tabs>
      <Content key={active} />
    </Stack>
  );
};
export default TableTabs;
