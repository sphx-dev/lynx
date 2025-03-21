import React, { ReactNode } from "react";
import {
  TabList,
  Tabs as BaseTabs,
  Tab as BaseTab,
  TabPanel,
} from "react-tabs";
import TabButton from "../TabButton";
import "react-tabs/style/react-tabs.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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
      <TabList className="custom-tab-list">
        {tabs.map((tab, index) => (
          <BaseTab
            key={index}
            className="custom-tab"
            selectedClassName="custom-tab__active"
          >
            <TabButton
              $active={selectedIndex === index}
              style={{ width: "100%" }}
            >
              {tab.title}
            </TabButton>
          </BaseTab>
        ))}
      </TabList>
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
