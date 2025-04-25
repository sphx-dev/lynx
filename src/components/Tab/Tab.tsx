import React, { ReactNode } from "react";
import {
  TabList,
  Tabs as BaseTabs,
  Tab as BaseTab,
  TabPanel,
} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import styled from "styled-components";

interface TabsProps {
  title: string;
  content: ReactNode;
}

interface Props {
  id: string;
  tabs: TabsProps[];
}

const Tabs = ({ id, tabs }: Props) => {
  const [selectedIndex, setSelectedIndex] = useLocalStorage(id, 0);
  return (
    <BaseTabs selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
      <TabList className="custom-tab-list" style={{ gap: "6px" }}>
        {tabs.map((tab, index) => (
          <BaseTab
            key={index}
            className="custom-tab"
            selectedClassName="custom-tab__active"
          >
            {/* <TabButton
              $active={selectedIndex === index}
              style={{ width: "100%" }}
            >
              {tab.title}
            </TabButton> */}
            <Button $active={selectedIndex === index} style={{ width: "100%" }}>
              {tab.title}
            </Button>
          </BaseTab>
        ))}
      </TabList>
      <HorizontalDivider />
      {tabs.map(({ title, content }, index) => (
        <TabPanel
          className={
            selectedIndex === index ? "tabs-content__active" : undefined
          }
          key={title}
        >
          {content}
        </TabPanel>
      ))}
    </BaseTabs>
  );
};

export default Tabs;

const Button = styled.button<{ $active?: boolean }>`
  ${({ $active }) =>
    $active
      ? `
    background-color: var(--bg-surface-800);
    border: 1px solid var(--stroke-strong-950);
  `
      : `
    background-color: var(--bg-surface-900);
    border: 1px solid var(--stroke-sub-300);
  `}
  color: var(--text-strong-950);
  border-radius: 6px;

  /* font text-small */
  font-family: var(--text-small-font-family);
  font-size: var(--text-small-font-size);
  font-weight: var(--text-small-font-weight);
  line-height: var(--text-small-line-height);
  text-align: center;

  height: 32px;
`;

const HorizontalDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--stroke-sub-300);
  margin: 8px 0;
`;
