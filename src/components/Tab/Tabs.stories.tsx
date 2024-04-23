import type { Meta, StoryObj } from "@storybook/react"
import Tab from "./index"
import "../../App.css"

const tabs = [
  {
    title: "Tab1",
    content: <h2 style={{ color: "white" }}>Tab1</h2>,
  },
  {
    title: "Tab2",
    content: <h2 style={{ color: "white" }}>Tab2</h2>,
  },
]

const meta: Meta<typeof Tab> = {
  component: Tab,
  args: {
    tabs,
  },
}

export default meta

type Story = StoryObj<typeof Tab>

export const Tabs: Story = {
  render: (args) => <Tab {...args} />,
}
