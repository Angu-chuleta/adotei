import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Registro from "./pages/registro/registro";
import admin from "./pages/admin/admin";
import newCase from "./pages/newCase/newCase";
import perfil from "./pages/perfil/perfil";
import GuardedRoute from "./services/guardedRoutes";
import QuemSomos from "./pages/quemSomos/quemsomos";

export default function Routes() {
  let storage = JSON.parse(localStorage.getItem("adotei@token") | {});
  function estaAutenticado() {
    return storage.token !== "";
  }
  let autenticado = estaAutenticado();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/quemsomos" exact component={QuemSomos} />
        <Route path="/registro" exact component={Registro} />
        <GuardedRoute path="/admin" component={admin} auth={autenticado} />
        <GuardedRoute path="/perfil" component={perfil} auth={autenticado} />
        <GuardedRoute path="/new" component={newCase} auth={autenticado} />
        <Route path="/*" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
