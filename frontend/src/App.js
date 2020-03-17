import React from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import { BrowserRouter as Router, Route } from "react-router-dom";

const routes = [
  { path: "/", name: "Home", Component: Login },
  { path: "/register", name: "Login", Component: Register }
];

function App() {
  return (
    <Router>
      <div>
        {routes.map(({ path, Component, name }) => (
          <Route key={name} exact path={path} component={Component} />
        ))}
      </div>
    </Router>
  );
}

export default App;
