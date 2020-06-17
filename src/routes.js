import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Empresa from "./pages/empresa";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/empresas/:id" component={Empresa} />
    </Switch>
  </BrowserRouter>
);

export default Routes;