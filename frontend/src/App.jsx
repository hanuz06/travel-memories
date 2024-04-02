import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";

import { AuthContext } from "./shared/context/auth-context";

import Users from "./user/pages/Users";
import NewLocation from "./locations/pages/NewLocation";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserLocations from "./locations/pages/UserLocations";
import UpdateLocation from "./locations/pages/UpdateLocation";
import Auth from "./user/pages/Auth";
import useAuth from "./shared/hooks/auth-hook";

function App() {
  const { sessionToken, login, logout, userId } = useAuth();

  let routes;

  if (sessionToken) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/locations" exact>
          <UserLocations />
        </Route>
        <Route path="/locations/new" exact>
          <NewLocation />
        </Route>
        <Route path="/locations/:locationId">
          <UpdateLocation />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/locations" exact>
          <UserLocations />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!sessionToken, sessionToken, userId, login, logout }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
