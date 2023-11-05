import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./modal";

const meta: Meta<typeof Modal> = {
  title: "base/Modal",
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: "Deactivate Account",
    children: (
      <p className="text-sm text-gray-500">
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed from our servers forever. This action cannot be
        undone.
      </p>
    ),
    confirmButtonText: "Deactivate",
    open: true,
    isBusy: false,
  },
};

export const Busy: Story = {
  args: {
    ...Default.args,
    isBusy: true,
  },
};
