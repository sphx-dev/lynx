import React, { ReactNode, useState } from "react"
import { TabList, Tabs as BaseTabs, Tab as BaseTab, TabPanel } from "react-tabs"
import TabButton from "../TabButton"
import "react-tabs/style/react-tabs.css"

interface TabsProps {
  title: string
  content: ReactNode
}

interface Props {
  tabs: TabsProps[]
}

const Tabs = ({ tabs }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <BaseTabs selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
      <TabList className="custom-tab-list">
        {tabs.map((tab, index) => (
          <BaseTab
            className="custom-tab"
            selectedClassName="custom-tab__active"
          >
            <TabButton
              active={selectedIndex === index}
              style={{ width: "100%" }}
            >
              {tab.title}
            </TabButton>
          </BaseTab>
        ))}
      </TabList>
      {tabs.map(({ title, content }) => (
        <TabPanel key={title}>{content}</TabPanel>
      ))}
    </BaseTabs>
  )
}

export default Tabs
