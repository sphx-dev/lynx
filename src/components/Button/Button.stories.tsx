import type { Meta, StoryObj } from "@storybook/react"
import Button from "./index"

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    size: {
      options: ["xs", "sm", "lg"],
      control: "radio",
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: (args) => (
    <Button {...args} variant="primary">
      Button
    </Button>
  ),
}
export const Secondary: Story = {
  render: (args) => (
    <Button {...args} variant="secondary">
      Button
    </Button>
  ),
}

export const Pill: Story = {
  render: (args) => (
    <Button {...args} variant="secondary" pill>
      Button
    </Button>
  ),
}
