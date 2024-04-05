import { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = lazy(() => {
  return import("./user/pages/Users");
});
const NewLocation = lazy(() => {
  return import("./locations/pages/NewLocation");
});
const UserLocations = lazy(() => {
  return import("./locations/pages/UserLocations");
});
const UpdateLocation = lazy(() => {
  return import("./locations/pages/UpdateLocation");
});
const Auth = lazy(() => {
  return import("./user/pages/Auth");
});

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
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
