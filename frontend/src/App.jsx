import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewLocation from "./locations/pages/NewLocation";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserLocations from "./locations/pages/UserLocations";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path='/' exact>
            <Users />
          </Route>
          <Route path='/:userId/locations' exact>
            <UserLocations />
          </Route>
          <Route path='/locations/new' exact>
            <NewLocation />
          </Route>
          <Redirect to='/' />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
