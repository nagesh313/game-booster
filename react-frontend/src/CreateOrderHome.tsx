import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import { CreateAnOrder } from "./component/lol/user/CreateAnOrder";
export function CreateOrderHome() {
  const history = useHistory();
  const userActive = () => {
    history.push("/dashboard/home");
  };
  const userInactive = () => {
    sessionStorage.removeItem("user");
    sessionStorage.setItem("orderCreatedWithoutLogin", "true");
    history.push("/");
  };
  useEffect(() => {
    sessionStorage.removeItem("orderCreatedWithoutLogin");
    axios
      .get("/api/v1/admin")
      .then((response: any) => {
        userActive();
      })
      .catch((reponse: any) => {
        sessionStorage.removeItem("user");
        userInactive();
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Container style={{ marginTop: "40px", textAlign: "center" }}>
      <img
        alt="valorant"
        src="./images/valorant.png"
        style={{ marginBottom: "20px", height: "80px", width: "80px" }}
      ></img>
      <Grid justify="center">
        <CreateAnOrder></CreateAnOrder>
      </Grid>
    </Container>
  );
}
