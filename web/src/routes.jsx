import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Registro from "./pages/registro/registro";
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/admin" exact component={Home} />
        <Route path="/registro" component={Registro} />
      </Switch>
    </BrowserRouter>
  );
}
