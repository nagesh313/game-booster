import { Grid, Paper } from "@material-ui/core";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import Title from "../../Title";
import { NewOrdersComponent } from "./NewOrders";
import RevenueCards from "./RevenueCards";
import { YourCompletedOrders } from "./YourCompletedOrders";
import { YourRunningOrders } from "./YourRunningOrders";
function BoosterHomeComponent(props: any) {
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Title>Booster Area</Title>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <RevenueCards></RevenueCards>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            style={{ padding: "1rem", marginBottom: "1rem" }}
          >
            <YourRunningOrders></YourRunningOrders>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            style={{ padding: "1rem", marginBottom: "1rem" }}
          >
            <YourCompletedOrders></YourCompletedOrders>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            style={{ padding: "1rem", marginBottom: "1rem" }}
          >
            <NewOrdersComponent></NewOrdersComponent>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export const BoosterHome = withSnackbar(BoosterHomeComponent);
