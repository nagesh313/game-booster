import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { failureToast } from "../../../util/util";
import Title from "../../Title";
import { NewOrders } from "./NewOrders";
import RevenueCards from "./RevenueCards";
import { YourCompletedOrders } from "./YourCompletedOrders";
import { YourRunningOrders } from "./YourRunningOrders";
function BoosterHomeComponent(props: any) {
  let [counter, setCounter] = React.useState<any>(0);
  let [pendingRevenue, setPendingRevenue] = React.useState<any>(0);
  let [totalRevenue, setTotalRevenue] = React.useState<any>(0);
  const fetchUserRevenue = () => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    axios
      .get("/api/v1/revenue/" + user.id)
      .then((response: any) => {
        setPendingRevenue(response.data.pendingRevenue);
        setTotalRevenue(response.data.totalRevenue);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  
  useEffect(() => {
    fetchUserRevenue();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const refresh = () => {
    setCounter(counter + 1);
    console.log(counter);
    fetchUserRevenue();
    return counter;
  };
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Title>Booster Area</Title>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <RevenueCards
            pendingRevenue={pendingRevenue}
            totalRevenue={totalRevenue}
          ></RevenueCards>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            style={{ padding: "1rem", marginBottom: "1rem" }}
          >
            <YourRunningOrders
              key={counter}
              refresh={refresh}
            ></YourRunningOrders>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            style={{ padding: "1rem", marginBottom: "1rem" }}
          >
            <YourCompletedOrders key={counter}></YourCompletedOrders>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            style={{ padding: "1rem", marginBottom: "1rem" }}
          >
            <NewOrders key={counter} refresh={refresh}></NewOrders>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export const BoosterHome = withSnackbar(BoosterHomeComponent);
