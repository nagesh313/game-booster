import { Button, Grid, Paper } from "@material-ui/core";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Title from "../../Title";
import { Orders } from "./Orders";
import RevenueCards from "./RevenueCards";
function UserHomeComponent(props: any) {
  const history = useHistory();

  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps
  function navigateToCreateOrder() {
    history.push("/dashboard/create-order");
  }
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={6}>
          <Title>User Area</Title>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              navigateToCreateOrder();
            }}
          >
            Create a New Order
          </Button>
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
            <Orders></Orders>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export const UserHome = withSnackbar(UserHomeComponent);
