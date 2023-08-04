import { Decorator } from "@storybook/react";

export const withRootLayout: Decorator = (Story) => (
  <div className="mx-auto min-h-screen max-w-screen-sm">
    <Story />
  </div>
);
