import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./index";

const meta: Meta<typeof Icon> = {
  component: Icon,
  argTypes: {
    stroke: { control: "color" },
    hoverColor: { control: "color" },
  },
  args: {
    stroke: "#000000",
    icon: "HomeIcon",
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const HomeIcon: Story = {
  name: "Icons",
  render: args => <Icon {...args} />,
};
