import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  NavLink,
} from "react-router-dom";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import FetchSequentially from "./FetchSequentially";
import CreateBoat from "./CreateBoat"
import NoMatch from "./NoMatch";

function UserHeader(props) {
  const { loggedIn, logout, validateAccess } = props;
  return (
    <div>
      <Header
        validateAccess={validateAccess}
        logout={logout}
        loggedIn={loggedIn}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {validateAccess === "user" ? (
          <Route path="/fetch-sequentially">
            <FetchSequentially />
          </Route>
        ) : (
          ""
        )}
        {validateAccess === "admin" ? (
          <Route path="/create-boat">
            <CreateBoat />
          </Route>
        ) : (
          ""
        )}
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default UserHeader;
