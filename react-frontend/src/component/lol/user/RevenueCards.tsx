import { Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import React from "react";
import { AccountInformation } from "../../AccountInformation";

export default function RevenueCards() {
  return (
    <Grid container spacing={2} style={{ marginBottom: "1rem" }}>
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: "1rem", textAlign: "center" }}>
          <Grid
            container
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item xs={4}>
              <AccountBalanceWalletIcon
                style={{ fontSize: 150 }}
              ></AccountBalanceWalletIcon>
            </Grid>
            <Grid item xs={8}>
              <Typography component="h4" variant="h4">
                TBD
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                TBD
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: "1rem", textAlign: "center" }}>
          <Grid
            container
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid item xs={4}>
              <WatchLaterIcon style={{ fontSize: 150 }}></WatchLaterIcon>
            </Grid>
            <Grid item xs={8}>
              <Typography component="h4" variant="h4">
                TBD
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                TBD
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: "1rem", textAlign: "center" }}>
          <AccountInformation></AccountInformation>
        </Paper>
      </Grid>
    </Grid>
  );
}
