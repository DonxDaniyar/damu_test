import { axios, setToken } from "@/config/axios";
import { User } from "@/models/User";
import { LoadingOverlay } from "@mantine/core";
import { ReactNode, createContext } from "react";
import { useAuthHeader, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useQuery } from "react-query";

interface UserTypes {
  user: User | null | undefined;
  isLoading: boolean;
  error: null | string | unknown;
}

export const UserContext = createContext<UserTypes>({
  user: null,
  isLoading: false,
  error: null,
} as UserTypes);

function UserProvider({ children }: { children: ReactNode }) {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const authHeader = useAuthHeader();
  if (authHeader) {
    setToken(authHeader());
  }
  const {
    isLoading,
    isError,
    error,
    data: user,
  } = useQuery(
    "me",
    async (): Promise<User> => {
      const res = await axios.get("/user/me");
      return res.data;
    },
    {
      enabled: isAuthenticated(),
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <LoadingOverlay visible={true} overlayBlur={2} />;
  if (isError) {
    signOut();
    location.replace("/");
  }
  if (error) return "An error has occurred: " + error?.message;

  return (
    <UserContext.Provider value={{ user: user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
