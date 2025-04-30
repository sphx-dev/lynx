/*
    Storybook stories for new Button component.
        - Type = "primary" | "neutral" | "error";
        - Option = "filled" | "stroke" | "lighter" | "ghost";
        - Size = "medium" | "small" | "xsmall" | "xxsmall";
        - Disabled = boolean;

*/

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    type: {
      options: ["primary", "neutral", "error"],
      control: "radio",
    },
    option: {
      options: ["filled", "stroke", "lighter", "ghost"],
      control: "radio",
    },
    size: {
      options: ["medium", "small", "xsmall", "xxsmall"],
      control: "radio",
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;
export const Primary: Story = {
  render: args => (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button {...args} type="primary" option="filled">
        Button
      </Button>
      <Button {...args} type="primary" option="stroke">
        Button
      </Button>
      <Button {...args} type="primary" option="lighter">
        Button
      </Button>
      <Button {...args} type="primary" option="ghost">
        Button
      </Button>
    </div>
  ),
};
export const Neutral: Story = {
  render: args => (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button {...args} type="neutral" option="filled">
        Button
      </Button>
      <Button {...args} type="neutral" option="stroke">
        Button
      </Button>
      <Button {...args} type="neutral" option="lighter">
        Button
      </Button>
      <Button {...args} type="neutral" option="ghost">
        Button
      </Button>
    </div>
  ),
};
export const Error: Story = {
  render: args => (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button {...args} type="error" option="filled">
        Button
      </Button>
      <Button {...args} type="error" option="stroke">
        Button
      </Button>
      <Button {...args} type="error" option="lighter">
        Button
      </Button>
      <Button {...args} type="error" option="ghost">
        Button
      </Button>
    </div>
  ),
};
