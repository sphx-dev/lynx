import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./index";
import { themes } from "../../theme";
import { ThemeProvider } from "styled-components";
import { store } from "../../state/store";
import { Provider } from "react-redux";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components/Input",
  argTypes: {
    label: { control: "text" },
    variant: { control: "text" },
    rightSide: { control: "text" },
  },
  args: {
    label: "Name",
    variant: "primary",
    rightSide: "USD",
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  render: args => (
    <Provider store={store}>
      <ThemeProvider theme={themes["dark"]}>
        <Input {...args} />
      </ThemeProvider>
    </Provider>
  ),
  args: {
    label: "Name",
    variant: "primary",
    rightSide: "",
  },
};

export const NumberInput: Story = {
  render: args => (
    <Provider store={store}>
      {/* <ThemeProvider theme={themes["dark"]}> */}
      <Input {...args} type="number" min={10} max={100} />
      {/* </ThemeProvider> */}
    </Provider>
  ),
};
