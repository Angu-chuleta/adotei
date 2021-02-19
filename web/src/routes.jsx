import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Registro from "./pages/registro/registro";
import admin from "./pages/admin/admin";
import newcase from "./pages/newCase/newcase";
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/admin" exact component={admin} />
        <Route path="/new" exact component={newcase} />
        <Route path="/registro" exact component={Registro} />
        <Route path="/*" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
