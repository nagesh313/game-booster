import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Accessibility,
  Adjust,
  FlashOn,
  PeopleAlt,
  PersonAdd,
  PersonAddDisabled,
  Videocam,
  VpnKey,
} from "@material-ui/icons";
import GamepadIcon from "@material-ui/icons/Gamepad";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { failureToast, successToast } from "../../util/util";
import Title from "../Title";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

function OrderDetailsComponent(props: any) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<any>();
  const { params }: any = useRouteMatch();
  const history = useHistory();
  const navigateToDashboard = () => {
    history.push("/dashboard/home");
  };
  const fetchOrderDetails = () => {
    axios
      .get("/api/v1/order/" + params.id)
      .then((response: any) => {
        setOrder(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  useEffect(() => {
    fetchOrderDetails();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  const dropOrder = (row: any) => {
    axios
      .patch("/api/v1/order/drop/" + row.id)
      .then((response: any) => {
        navigateToDashboard();
        props.enqueueSnackbar("Order Dropped", successToast);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const finishOrder = (row: any) => {
    axios
      .patch("/api/v1/order/complete/" + row.id)
      .then((response: any) => {
        navigateToDashboard();
        props.enqueueSnackbar("Order Marked as completed", successToast);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  return (
    <React.Fragment>
      {order &&
        order.status !== "FINISHED" &&
        (user?.roles?.includes("ROLE_BOOSTER") ||
          user?.roles?.includes("ROLE_ADMIN")) && (
          <Grid container spacing={2} style={{ marginBottom: "1rem" }}>
            <Title>
              Order ID : {order.id}{" "}
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => finishOrder(order)}
                style={{ marginLeft: "1rem" }}
              >
                FINISH
              </Button>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => dropOrder(order)}
                style={{ marginLeft: "1rem" }}
              >
                DROP
              </Button>
            </Title>
          </Grid>
        )}
      {order && (
        <Grid container spacing={2} style={{ marginBottom: "1rem" }}>
          <Grid item xs={12} md={3}>
            <Paper style={{ padding: "1rem", textAlign: "center" }}>
              <Grid
                container
                justify="center"
                alignItems="center"
                alignContent="center"
              >
                <Grid item xs={4}>
                  <Accessibility style={{ fontSize: 50 }}></Accessibility>
                </Grid>
                <Grid item xs={8}>
                  <Typography component="h5" variant="h5">
                    USERNAME
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {order.lolAccount}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper style={{ padding: "1rem", textAlign: "center" }}>
              <Grid
                container
                justify="center"
                alignItems="center"
                alignContent="center"
              >
                <Grid item xs={4}>
                  <VpnKey style={{ fontSize: 50 }}></VpnKey>
                </Grid>
                <Grid item xs={8}>
                  <Typography component="h5" variant="h5">
                    PASSWORD
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {order.lolPassword}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper style={{ padding: "1rem", textAlign: "center" }}>
              <Grid
                container
                justify="center"
                alignItems="center"
                alignContent="center"
              >
                <Grid item xs={4}>
                  <Adjust style={{ fontSize: 50 }}></Adjust>
                </Grid>
                <Grid item xs={8}>
                  <Typography component="h5" variant="h5">
                    SUMMONER
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {order.summonerName}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper style={{ padding: "1rem", textAlign: "center" }}>
              <Grid
                container
                justify="center"
                alignItems="center"
                alignContent="center"
              >
                <Grid item xs={3}>
                  <Adjust style={{ fontSize: 50 }}></Adjust>
                </Grid>
                <Grid item xs={8}>
                  <Typography component="h5" variant="h5">
                    SERVER
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {order.server}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
      {order && (
        <Card className={classes.root}>
          <CardHeader
            avatar={<GamepadIcon></GamepadIcon>}
            title={order.type}
            subheader={order.createdDate}
          />
          <hr></hr>
          <CardContent>
            <Grid item xs={12}>
              <Typography>
                <b>{"Order Created By : "}</b>
                {order.userName}
              </Typography>
            </Grid>
            <Typography>
              <b>{"Orders' User Email : "}</b>
              {order.userEmail}
            </Typography>

            {order.currentRank !== null && order.currentRank !== "" && (
              <Grid xs={12}>
                <Typography>
                  <b>{"Current Rank : "}</b> {order.currentRank}
                </Typography>
              </Grid>
            )}
            {order.currentRankAmount !== null &&
              order.currentRankAmount !== "" && (
                <Grid xs={12}>
                  <Typography>
                    <b>{"Current Rank Amount: "}</b> {order.currentRankAmount}
                  </Typography>
                </Grid>
              )}
            {order.currentRankTier !== null && order.currentRankTier !== "" && (
              <Grid xs={12}>
                <Typography>
                  <b>{"Current Rank Tier: "}</b> {order.currentRankTier}
                </Typography>
              </Grid>
            )}
            {order.desiredRank !== null && order.desiredRank !== "" && (
              <Grid xs={12}>
                <Typography>
                  <b>{"Desired Rank : "}</b> {order.desiredRank}
                </Typography>
              </Grid>
            )}
            {order.desiredRankAmount !== null &&
              order.desiredRankAmount !== "" && (
                <Grid xs={12}>
                  <Typography>
                    <b>{"Current Rank Amount : "}</b> {order.desiredRankAmount}
                  </Typography>
                </Grid>
              )}
            {order.desiredRankTier !== null && order.desiredRankTier !== "" && (
              <Grid xs={12}>
                <Typography>
                  <b>{"Desired Rank Tier : "}</b> {order.desiredRankTier}
                </Typography>
              </Grid>
            )}
            {order.wins !== null && order.wins !== "" && (
              <Grid xs={12}>
                <Typography>
                  <b>{"Wins : "}</b> {order.wins}
                </Typography>
              </Grid>
            )}
            <Grid xs={12}>
              <Typography>
                <b>{"ORDER STATUS : "}</b> {order.status}
              </Typography>
            </Grid>

            <Grid xs={12}>
              <Typography>
                <b>{"ORDER ID : "}</b>
                {order.id}
              </Typography>
            </Grid>
          </CardContent>
          <hr></hr>
          <CardContent>
            <Grid
              xs={12}
              item
              container
              alignContent="center"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Switch size="small" checked={order.appearOffline} disabled />
                }
                label=""
              />
              <PersonAddDisabled
                style={{ marginRight: "15px" }}
              ></PersonAddDisabled>
              APPEAR OFFLINE ON CHAT (FREE)
            </Grid>
            <Grid
              xs={12}
              item
              container
              alignContent="center"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Switch size="small" checked={order.specificAgent} disabled />
                }
                label=""
              />
              <PeopleAlt style={{ marginRight: "15px" }}></PeopleAlt>
              SPECIFIC AGENTS (FREE)
            </Grid>
            <Grid
              xs={12}
              item
              container
              alignContent="center"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={order.playWithBooster}
                    disabled
                  />
                }
                label=""
              />
              <PersonAdd style={{ marginRight: "15px" }}></PersonAdd>
              PLAY WITH BOOSTER AT (+40%)
            </Grid>
            <Grid
              xs={12}
              item
              container
              alignContent="center"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Switch size="small" checked={order.priorityOrder} disabled />
                }
                label=""
              />
              <FlashOn style={{ marginRight: "15px" }}></FlashOn>
              PRIORITY ORDER AT (+20%)
            </Grid>
            <Grid
              xs={12}
              item
              container
              alignContent="center"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Switch size="small" checked={order.withStreaming} disabled />
                }
                label=""
              />
              <Videocam style={{ marginRight: "15px" }}></Videocam>
              WITH STREAMING AT (+15%)
            </Grid>
          </CardContent>
        </Card>
      )}
      {/* {order && (
          <Card
            className={classes.root}
            style={{ marginLeft: "3rem", minWidth: "500px" }}
          >
            <CardHeader
              avatar={<Chat></Chat>}
              // action={
              //   <IconButton aria-label="settings">
              //     <MoreVertIcon />
              //   </IconButton>
              // }
              // title={order.type}
              // subheader={order.createdDate}
            />
            <hr></hr>
            <CardContent>
              <Typography>CHAT WIP</Typography>
            </CardContent>
          </Card>
        )} */}
    </React.Fragment>
  );
}
export const OrderDetails = withSnackbar(OrderDetailsComponent);
