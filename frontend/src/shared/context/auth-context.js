import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  sessionToken: null,
  userId: null,
  login: () => {},
  logout: () => {},
});
