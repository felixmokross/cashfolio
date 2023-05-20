import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "components/forms/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Example",
    name: "my-input",
    value: "Text",
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    value: "",
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: "This field is required",
  },
};

export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    value: "",
    placeholder: "Placeholder text",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
