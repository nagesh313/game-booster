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
import React from "react";
import { useHistory } from "react-router-dom";
import { failureToast, successToast } from "../../../../util/util";
function valuetext(value: number) {
  return `${value}°C`;
}
function PlacementsComponent(props: any) {
  const [wins, setWins] = React.useState<any>(5);
  const [currentRank, setCurrentRank] = React.useState<any>("");
  const [totalAmount, setTotalAmount] = React.useState<any>(100);
  const [server, setServer] = React.useState<any>("EU-WEST");
  const [forBooster, setForBooster] = React.useState<any>("");
  const [forUser, setForUser] = React.useState<any>("");

  const [appearOffline, setAppearOffline] = React.useState<boolean>(false);
  const [specificAgent, setSpecificAgent] = React.useState<boolean>(false);
  const [playWithBooster, setPlayWithBooster] = React.useState<boolean>(false);
  const [priorityOrder, setPriorityOrder] = React.useState<boolean>(false);
  const [withStreaming, setWithStreaming] = React.useState<boolean>(false);
  const history = useHistory();
  console.log(setTotalAmount);
  function navigateTohome() {
    history.push("/dashboard/home");
  }
  const boostNow = (data: any) => {
    console.log(data);
    const payload = {
      type: "Placements",
      server: server,
      currentRank: currentRank,
      wins: wins,
      // currentRankTier: currentRankTier,
      // desiredRankTier: desiredRankTier,

      // currentRankAmount: currentRankTier ? null : currentRankAmount,
      // desiredRankAmount: desiredRankAmount ? null : desiredRankAmount,

      appearOffline: appearOffline,
      specificAgent: specificAgent,
      playWithBooster: playWithBooster,
      priorityOrder: priorityOrder,
      withStreaming: withStreaming,

      totalAmount: totalAmount,
    };
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    axios
      .post("/api/v1/order/create/" + user.id, payload)
      .then((response: any) => {
        // setServersList(response.data);
        props.enqueueSnackbar("Order Created Successfully", successToast);
        // navigateTohome();
      })
      .catch((reponse: any) => {
        console.log(reponse);
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const paymentSuccess = (data: any) => {
    // console.log(data);
    // const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    // axios
    //   .get("/api/v1/order/create/" + user.id)
    //   .then((response: any) => {
    //     // setServersList(response.data);
    //     // props.enqueueSnackbar("Order Created Successfully", successToast);
    props.enqueueSnackbar("Payment Success", successToast);
    // })
    // .catch((reponse: any) => {
    //   props.enqueueSnackbar(reponse.error, failureToast);
    //   props.enqueueSnackbar("Payment Failed", failureToast);
    // });
  };
  const paymentFailed = (data: any) => {
    // console.log(data);
    // const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    // axios
    //   .get("/api/v1/order/create/" + user.id)
    //   .then((response: any) => {
    //     // setServersList(response.data);
    props.enqueueSnackbar("Payment Success", successToast);
    // })
    // .catch((reponse: any) => {
    //   props.enqueueSnackbar("Payment Failed", failureToast);
    // });
  };
  console.log(paymentFailed, paymentSuccess, navigateTohome);
  return (
    <Grid container style={{ marginTop: "1rem" }} spacing={2}>
      <Grid item xs={12} md={6}>
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
                    }}
                    style={{ marginLeft: ".5rem", marginTop: ".5rem" }}
                  />
                  {props?.currentRanksList?.map((rank: any) => {
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
                        }}
                        style={{ marginLeft: ".5rem", marginTop: ".5rem" }}
                      />
                    );
                  })}
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
      <Grid item xs={12} md={6}>
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
          <Grid xs={12} item style={{ marginTop: "1rem", textAlign: "center" }}>
            <FormControl
              variant="outlined"
              fullWidth
              size="small"
              style={{ marginTop: "1rem", textAlign: "center" }}
            >
              <InputLabel id="booster-selection">For Booster</InputLabel>
              <Select
                labelId="booster-selection-label"
                id="booster-selection"
                onChange={(event: any, value: any) => {
                  setForBooster(value?.props?.value);
                }}
                value={forBooster}
                label="For Booster"
              >
                {props?.boosterList?.map((booster: any) => {
                  return (
                    <MenuItem value={booster.id} key={booster.id}>
                      {booster?.accountInformations?.accountName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12} item style={{ marginTop: "1rem", textAlign: "center" }}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="user-selection">For User</InputLabel>
              <Select
                labelId="user-selection-label"
                id="user-selection"
                onChange={(event: any, value: any) => {
                  setForUser(value?.props?.value);
                }}
                value={forUser}
                label="For User"
              >
                {props?.usersList?.map((user: any) => {
                  return (
                    <MenuItem value={user.id} key={user.id}>
                      {user?.username}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12} item style={{ marginTop: ".5rem" }}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={boostNow}
            >
              CREATE ORDER
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export const Placements = withSnackbar(PlacementsComponent);
