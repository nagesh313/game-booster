import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { LoaderComponent } from "./component/Loader";
import { ParticlesComponent } from "./component/Particles";
import { dashboardRoutes } from "./routes/routes";
export function App() {
  return (
    <>
      <ParticlesComponent></ParticlesComponent>
      <LoaderComponent></LoaderComponent>
      <Switch>
        {dashboardRoutes.map((route: any) => {
          return (
            <Route path={route.path} key={route.path}>
              {route.component}
            </Route>
          );
        })}
      </Switch>
    </>
  );
}
