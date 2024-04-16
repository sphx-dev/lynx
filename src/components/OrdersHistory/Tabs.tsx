import styled from "styled-components"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import Stack from "../Stack"
import Table from "./Table"
import Icon from "../Icon"
import { icons } from "../../assets/icons"
import useTheme from "../../hooks/useTheme"
interface TabProps {
  isActive?: boolean
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
  svg {
    margin-right: 4px;
  }
`

const Tabs = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.selectedTheme.tableTabs.background};
  width: 100%;
  min-width: 400px;
`
const tabsContent: { title: string; icon: keyof typeof icons }[] = [
  {
    title: "positions",
    icon: "PositionsIcon",
  },
  {
    title: "pending",
    icon: "PendingIcon",
  },
  {
    title: "orders",
    icon: "OrdersIcon",
  },
  {
    title: "trades",
    icon: "TradesIcon",
  },
]

const TableTabs = () => {
  const [active, setActive] = useState(0)
  const { t } = useTranslation()
  const { themeColors } = useTheme()

  return (
    <Stack>
      <Tabs>
        {tabsContent.map(({ icon, title }, index) => (
          <Tab
            key={index}
            isActive={active === index}
            onClick={() => setActive(index)}
          >
            <>
              <Icon
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
      <Table />
    </Stack>
  )
}
export default TableTabs
