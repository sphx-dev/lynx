import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import Text from "../components/Text"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Text",
  component: Text,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Body: Story = {
  args: {
    variant: "body",
    children: "Text",
    color: "red",
  },
}

export const Sub1: Story = {
  args: {
    variant: "sub1",
    children: "Text",
    color: "green",
  },
}
