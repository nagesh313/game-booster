import { Grid, Paper } from "@material-ui/core";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import Title from "../../Title";
import { Boosters } from "./Boosters";
import { FinishedOrders } from "./FinishedOrders";
import { RunningOrders } from "./RunningOrders";
import { WaitingForBoostersOrders } from "./WaitingForBoostersOrders";
function AdminHomeComponent(props: any) {
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Title>Admin Area</Title>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            style={{ padding: "1rem", marginBottom: "1rem" }}
          >
            <FinishedOrders></FinishedOrders>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            style={{ padding: "1rem", marginBottom: "1rem" }}
          >
            <RunningOrders></RunningOrders>
          </Paper>
          <Paper
            elevation={3}
            style={{ padding: "1rem", marginBottom: "1rem" }}
          >
            <WaitingForBoostersOrders></WaitingForBoostersOrders>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            style={{ padding: "1rem", marginBottom: "1rem" }}
          >
            <Boosters></Boosters>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export const AdminHome = withSnackbar(AdminHomeComponent);
