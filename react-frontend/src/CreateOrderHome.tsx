import {
  AppBar,
  Button,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import { CreateAnOrder } from "./component/lol/user/CreateAnOrder";
const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

export function CreateOrderHome() {
  const classes = useStyles();
  const history = useHistory();
  const userActive = () => {
    history.push("/dashboard/home");
  };
  function navigateToLogin() {
    history.push("/signin");
  }
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
    <React.Fragment>
      <AppBar position="static">
        <Toolbar variant="dense">
          <img
            alt="Site logo"
            src="images/logo-icon.png"
            width="50"
            height="50"
            style={{ cursor: "pointer" }}
          ></img>
          <Typography
            variant="h6"
            color="inherit"
            style={{ color: "white", cursor: "pointer", marginLeft: "5px" }}
          >
            VALORANT BOOSTING
          </Typography>
          <div className={classes.grow} />
          <Button
            variant="outlined"
            onClick={() => {
              navigateToLogin();
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "40px", textAlign: "center" }}>
        <img
          alt="valorant"
          src="./images/valorant.png"
          style={{ marginBottom: "20px", height: "80px", width: "80px" }}
        ></img>

        <Grid container justify="center">
          <CreateAnOrder></CreateAnOrder>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
