import { Decorator } from "@storybook/react";

export const withRootFrame: Decorator = (Story) => {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto min-h-screen max-w-screen-sm bg-white sm:border-x sm:border-gray-200 sm:shadow-xl">
        <Story />
      </div>
    </div>
  );
};
