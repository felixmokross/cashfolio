import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import invariant from "tiny-invariant";
import type { ExtendedUserDto } from "~/users/types";

const UserContext = createContext<ExtendedUserDto | undefined>(undefined);

export type UserProviderProps = PropsWithChildren<{
  user: ExtendedUserDto;
}>;

export function UserProvider({ user, children }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const user = useContext(UserContext);
  invariant(user, "useUser must be used within a UserProvider");
  return user;
}
