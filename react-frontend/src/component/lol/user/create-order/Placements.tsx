import {
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import VideocamIcon from "@material-ui/icons/Videocam";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { calculatePlacementRateFromBackend } from "../../../../util/rate";
import { failureToast, successToast } from "../../../../util/util";
import { PayPalComponent } from "../../../Paypal";
function valuetext(value: number) {
  return `${value}°C`;
}
function PlacementsComponent(props: any) {
  const [wins, setWins] = React.useState<any>(5);
  const [currentRank, setCurrentRank] = React.useState<any>("");
  const [currentRankTier, setCurrentRankTier] = React.useState<any>("");
  const [currentRankTiers, setCurrentRankTiers] = React.useState<any>("");
  const [totalAmount, setTotalAmount] = React.useState<any>(100);
  const [server, setServer] = React.useState<any>("EU-WEST");

  const [summonerName, setSummonerName] = React.useState<any>("");
  const [lolAccount, setLolAccount] = React.useState<any>("");
  const [lolPassword, setLolPassword] = React.useState<any>("");

  const [appearOffline, setAppearOffline] = React.useState<boolean>(false);
  const [specificAgent, setSpecificAgent] = React.useState<boolean>(false);
  const [playWithBooster, setPlayWithBooster] = React.useState<boolean>(false);
  const [priorityOrder, setPriorityOrder] = React.useState<boolean>(false);
  const [withStreaming, setWithStreaming] = React.useState<boolean>(false);
  const history = useHistory();
  console.log(setTotalAmount);
  useEffect(() => {
    const result = calculatePlacementRateFromBackend(props.placementRatesList, {
      appearOffline,
      specificAgent,
      playWithBooster,
      priorityOrder,
      withStreaming,
      currentRank,
      wins,
    });
    setTotalAmount(result);
  }, [
    appearOffline,
    specificAgent,
    playWithBooster,
    priorityOrder,
    withStreaming,
    currentRank,
    wins,
    props.placementRatesList,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  function navigateTohome() {
    history.push("/dashboard/home");
  }
  function singin() {
    history.push("/signin");
  }
  const paymentSuccess = (orderDetails: any) => {
    props.enqueueSnackbar("Paymentment Successful", successToast);
    const payload = {
      type: "Placements",
      server: server,
      currentRank: currentRank,
      wins: wins,
      appearOffline: appearOffline,
      specificAgent: specificAgent,
      playWithBooster: playWithBooster,
      priorityOrder: priorityOrder,
      withStreaming: withStreaming,
      totalAmount: totalAmount,
      summonerName,
      lolAccount,
      lolPassword,
      orderCreateTime: orderDetails.create_time,
      paymentId: orderDetails.id,
      payer: JSON.stringify(orderDetails.payer),
      paymentStatus: orderDetails.status,
    };
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    axios
      .post("/api/v1/order/create/" + user.id, payload)
      .then((response: any) => {
        // setServersList(response.data);
        props.enqueueSnackbar("Order Created Successfully", successToast);
        navigateTohome();
      })
      .catch((reponse: any) => {
        console.log(reponse);
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  // const paymentSuccess = (orderDetails: any) => {
  //   // const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  //   // axios
  //   //   .get("/api/v1/order/create/" + user.id)
  //   //   .then((response: any) => {
  //   //     // setServersList(response.data);
  //   //     // props.enqueueSnackbar("Order Created Successfully", successToast);
  //   props.enqueueSnackbar("Payment Success", successToast);
  //   // })
  //   // .catch((reponse: any) => {
  //   //   props.enqueueSnackbar(reponse.error, failureToast);
  //   //   props.enqueueSnackbar("Payment Failed", failureToast);
  //   // });
  // };
  const paymentFailed = (data: any) => {
    // console.log(data);
    // const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    // axios
    //   .get("/api/v1/order/create/" + user.id)
    //   .then((response: any) => {
    //     // setServersList(response.data);
    props.enqueueSnackbar("Payment Failed", failureToast);
    // })
    // .catch((reponse: any) => {
    //   props.enqueueSnackbar("Payment Failed", failureToast);
    // });
  };
  const user = sessionStorage.getItem("user");

  console.log(paymentFailed, paymentSuccess, navigateTohome);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Grid container>
          <Grid item xs={12}>
            <Paper style={{ marginTop: "1rem", padding: "1rem" }}>
              <Grid xs={12} item>
                <Typography component="h4" variant="h4" color="primary">
                  Season End Rank
                </Typography>
              </Grid>
              <Grid xs={12} item>
                Please select your season End Rank and Division
              </Grid>
              <Grid xs={12} item style={{ marginTop: "1rem" }}>
                <Grid container spacing={2} justify="center">
                  <Chip
                    label={"Unranked"}
                    clickable
                    color="primary"
                    variant={
                      currentRank === "Unranked" ? "default" : "outlined"
                    }
                    onClick={() => {
                      setCurrentRank("Unranked");
                      setCurrentRankTiers("");
                    }}
                    style={{ marginLeft: ".5rem", marginTop: ".5rem" }}
                  />
                  {props?.ranksList?.map((rank: any) => {
                    return (
                      <Chip
                        key={rank.id}
                        label={rank.name}
                        clickable
                        color="primary"
                        variant={
                          currentRank === rank.name ? "default" : "outlined"
                        }
                        onClick={() => {
                          setCurrentRank(rank.name);
                          setCurrentRankTiers(rank.tiers);
                        }}
                        style={{ marginLeft: ".5rem", marginTop: ".5rem" }}
                      />
                    );
                  })}
                </Grid>
                <Grid
                  xs={12}
                  item
                  style={{ marginTop: "1rem", textAlign: "center" }}
                >
                  <Grid container spacing={2} justify="center">
                    {currentRankTiers !== "" &&
                      currentRankTiers.split(",")?.map((tier: any) => {
                        return (
                          <Chip
                            key={tier}
                            label={tier}
                            clickable
                            color="secondary"
                            variant={
                              currentRankTier === tier ? "default" : "outlined"
                            }
                            onClick={() => {
                              setCurrentRankTier(tier);
                            }}
                            style={{ marginLeft: ".5rem", marginTop: ".5rem" }}
                          />
                        );
                      })}
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                xs={12}
                item
                style={{ marginTop: "1rem", textAlign: "center" }}
              >
                <FormControl
                  variant="outlined"
                  fullWidth
                  size="small"
                  style={{ marginTop: "1rem", textAlign: "center" }}
                >
                  <InputLabel id="server-selection">Server</InputLabel>
                  <Select
                    labelId="server-selection-label"
                    id="server-selection"
                    onChange={(event: any, value: any) => {
                      setServer(value?.props?.value);
                    }}
                    value={server}
                    label="Server"
                  >
                    {props?.serversList?.map((server: any) => {
                      return (
                        <MenuItem value={server.id} key={server.id}>
                          {server.name}{" "}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Paper>
            <Paper style={{ marginTop: "1rem", padding: "1rem" }}>
              <Typography
                component="h4"
                variant="h4"
                color="primary"
                style={{ textAlign: "center" }}
              >
                {wins + " Win(s)"}
              </Typography>
              <Grid xs={12} item>
                <Slider
                  defaultValue={5}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  onChange={(event: object, value: number | number[]) => {
                    console.log(value);
                    setWins(value);
                  }}
                  step={1}
                  marks
                  min={1}
                  max={5}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={5}>
        <Paper style={{ marginTop: "1rem", padding: "1rem" }}>
          <Grid xs={12} item>
            <Typography component="h4" variant="h4" color="primary">
              Checkout
            </Typography>
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
                  value={appearOffline}
                  onChange={(event: any, value: any) => {
                    setAppearOffline(value);
                  }}
                />
              }
              label=""
            />
            <PersonAddDisabledIcon
              style={{ marginRight: "15px" }}
            ></PersonAddDisabledIcon>
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
                <Switch
                  value={specificAgent}
                  onChange={(event: any, value: any) => {
                    setSpecificAgent(value);
                  }}
                />
              }
              label=""
            />
            <PeopleAltIcon style={{ marginRight: "15px" }}></PeopleAltIcon>
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
                  value={playWithBooster}
                  onChange={(event: any, value: any) => {
                    setPlayWithBooster(value);
                  }}
                />
              }
              label=""
            />
            <PersonAddIcon style={{ marginRight: "15px" }}></PersonAddIcon>
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
                <Switch
                  value={setPriorityOrder}
                  onChange={(event: any, value: any) => {
                    setPriorityOrder(value);
                  }}
                />
              }
              label=""
            />
            <FlashOnIcon style={{ marginRight: "15px" }}></FlashOnIcon>
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
                <Switch
                  value={withStreaming}
                  onChange={(event: any, value: any) => {
                    setWithStreaming(value);
                  }}
                />
              }
              label=""
            />
            <VideocamIcon style={{ marginRight: "15px" }}></VideocamIcon>
            WITH STREAMING AT (+15%)
          </Grid>
          <Grid
            xs={12}
            item
            style={{ textAlign: "center", marginTop: ".5rem" }}
          >
            <Typography component="h5" variant="h5" color="textPrimary">
              $ {totalAmount}
            </Typography>
          </Grid>
          {user !== null && (
            <React.Fragment>
              {" "}
              <Grid xs={12} item>
                <TextField
                  fullWidth
                  variant="outlined"
                  autoComplete="unset"
                  margin="dense"
                  label="VLRNT Account"
                  onChange={(event: any) => {
                    setLolAccount(event.target.value);
                  }}
                  value={lolAccount}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  label="VLRNT Password"
                  onChange={(event: any) => {
                    setLolPassword(event.target.value);
                  }}
                  value={lolPassword}
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  label="Summoner Name"
                  onChange={(event: any) => {
                    setSummonerName(event.target.value);
                  }}
                  value={summonerName}
                />
              </Grid>
            </React.Fragment>
          )}

          {user !== null && (
            <Grid
              xs={12}
              item
              style={{ textAlign: "center", marginTop: ".5rem" }}
            >
              <PayPalComponent
                amount={totalAmount}
                paymentSuccess={paymentSuccess}
                paymentFailed={paymentFailed}
              ></PayPalComponent>
            </Grid>
          )}
          {user === null && (
            <Grid xs={12} item style={{ marginTop: ".5rem" }}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={singin}
              >
                Sign In To Boost
              </Button>
            </Grid>
          )}
          {user !== null && (
            <Grid container justify="center" style={{ marginTop: ".5rem" }}>
              Make sure your game Credentials are saved on Home before creating
              an order
            </Grid>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export const Placements = withSnackbar(PlacementsComponent);
