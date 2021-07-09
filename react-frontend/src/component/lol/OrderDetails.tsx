import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Chat,
  FlashOn,
  PeopleAlt,
  PersonAdd,
  PersonAddDisabled,
  Videocam
} from "@material-ui/icons";
import GamepadIcon from "@material-ui/icons/Gamepad";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { failureToast } from "../../util/util";
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
  useEffect(() => {
    fetchOrderDetails();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  return (
    <React.Fragment>
      {order && (
        <Card className={classes.root}>
          <CardHeader
            avatar={<GamepadIcon></GamepadIcon>}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={order.type}
            subheader={order.createdDate}
          />
          <hr></hr>
          <CardContent>
            <Grid xs={12}>
              <Typography>
                <b>{"LOL SUMMONNER NAME : "}</b>
                {order?.accountInformation?.summonerName}
              </Typography>
            </Grid>
            <Typography>
              <b>{"LOL ACCOUNT : "}</b>
              {order?.accountInformation?.lolAccount}
            </Typography>

            <Grid xs={12}>
              <Typography>
                <b>{"LOL PASSWORD : "}</b>
                {order?.accountInformation?.lolPassword}
              </Typography>
            </Grid>
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
      )}{" "}
      {order && (
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
      )}
    </React.Fragment>
  );
}
export const OrderDetails = withSnackbar(OrderDetailsComponent);
