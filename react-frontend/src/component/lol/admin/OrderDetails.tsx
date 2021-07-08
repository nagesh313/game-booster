import { Grid, Paper } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import React from "react";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 151,
    },
  })
);

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
    </Grid>
  );
}
