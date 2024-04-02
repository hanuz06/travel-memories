import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;

const useAuth = () => {
  const [sessionToken, setSessionToken] = useState(null);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setSessionToken(token);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, sessionToken: token, expiration: tokenExpirationDate.toISOString() }),
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setSessionToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (sessionToken && tokenExpirationDate) {
      const remaingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remaingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [sessionToken, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.sessionToken && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.sessionToken);
    }
  }, [login]);

  return { sessionToken, login, logout, userId };
};

export default useAuth;
