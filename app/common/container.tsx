import type { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto min-h-screen max-w-screen-sm bg-white sm:border-x sm:border-gray-200 sm:shadow-xl">
      {children}
    </div>
  );
}
