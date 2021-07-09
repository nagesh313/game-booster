import {
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import React from "react";
import { useHistory } from "react-router-dom";
import { failureToast, successToast } from "../../../../util/util";
function RankBoostingComponent(props: any) {
  const [desiredRank, setDesiredRank] = React.useState<any>("");
  const [currentRank, setCurrentRank] = React.useState<any>("");

  const [currentRankTier, setCurrentRankTier] = React.useState<any>("");
  const [desiredRankTier, setDesiredRankTier] = React.useState<any>("");

  const [currentRankTiers, setCurrentRankTiers] = React.useState<any>("");
  const [desiredRankTiers, setDesiredRankTiers] = React.useState<any>("");
  const [totalAmount, setTotalAmount] = React.useState<any>(100);
  console.log(setTotalAmount);
  const [server, setServer] = React.useState<any>("EU-WEST");
  const [summonerName, setSummonerName] = React.useState<any>("");
  const [lolAccount, setLolAccount] = React.useState<any>("");
  const [lolPassword, setLolPassword] = React.useState<any>("");

  const [currentRankAmount, setCurrentRankAmount] = React.useState<any>("0-20");
  const [desiredRankAmount, setDesiredRankAmount] = React.useState<any>("0-20");

  const [appearOffline, setAppearOffline] = React.useState<boolean>(false);
  const [specificAgent, setSpecificAgent] = React.useState<boolean>(false);
  const [playWithBooster, setPlayWithBooster] = React.useState<boolean>(false);
  const [priorityOrder, setPriorityOrder] = React.useState<boolean>(false);
  const [withStreaming, setWithStreaming] = React.useState<boolean>(false);
  const history = useHistory();
  function navigateTohome() {
    history.push("/dashboard/home");
  }
  const boostNow = (data: any) => {
    const payload = {
      type: "Rank Boosting",
      server: server,

      currentRank: currentRank,
      desiredRank: desiredRank,
      currentRankTier: currentRankTier,
      desiredRankTier: desiredRankTier,

      currentRankAmount: currentRankTier ? null : currentRankAmount,
      desiredRankAmount: desiredRankAmount ? null : desiredRankAmount,
      appearOffline: appearOffline,
      specificAgent: specificAgent,
      playWithBooster: playWithBooster,
      priorityOrder: priorityOrder,
      withStreaming: withStreaming,
      totalAmount: totalAmount,
    };
    // const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (summonerName === "" || lolAccount === "" || lolPassword === "") {
      alert("Please add Summoner Name/LOL Account/LOL Password");
    } else {
      axios
        .post(
          "/api/v1/order/admin/create/" +
            summonerName +
            "/" +
            lolAccount +
            "/" +
            lolPassword,
          payload
        )
        .then((response: any) => {
          // setServersList(response.data);
          props.enqueueSnackbar("Order Created Successfully", successToast);
          navigateTohome();
        })
        .catch((reponse: any) => {
          console.log(reponse);
          props.enqueueSnackbar(reponse.error, failureToast);
        });
    }
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
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    console.log(data);
    axios
      .get("/api/v1/order/create/" + user.id)
      .then((response: any) => {
        props.enqueueSnackbar("Order Successfully Created", successToast);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar("Order Creation Failed", failureToast);
      });
  };
  console.log(paymentFailed, paymentSuccess);

  return (
    <Grid container style={{ marginTop: "1rem" }} spacing={2}>
      <Grid item xs={12} md={6}>
        <Grid container>
          <Grid item xs={12}>
            <Paper style={{ marginTop: "1rem", padding: "1rem" }}>
              <Grid xs={12} item>
                <Typography component="h4" variant="h4" color="primary">
                  Current Rank
                </Typography>
              </Grid>
              <Grid xs={12} item>
                Please select your current Rank and Division
              </Grid>
              <Grid xs={12} item style={{ marginTop: "1rem" }}>
                <Grid container spacing={2} justify="center">
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
                          setCurrentRankTiers(rank.tiers);
                          setCurrentRankTier("");
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
                  {(currentRank === "Immortal" ||
                    currentRank === "Radiant") && (
                    <Grid xs={12} item style={{ textAlign: "center" }}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        size="small"
                        style={{ marginTop: "1rem", textAlign: "center" }}
                      >
                        <InputLabel id="rank-amount-selection">
                          Current Rank Amount
                        </InputLabel>
                        <Select
                          labelId="rank-amount-selection"
                          id="rank-amount"
                          onChange={(event: any, value: any) => {
                            console.log(value?.props?.value);
                            setCurrentRankAmount(value?.props?.value);
                          }}
                          variant="outlined"
                          fullWidth
                          value={currentRankAmount}
                          label="Current Rank Amount"
                        >
                          <MenuItem value={"0-20"}>0-20</MenuItem>
                          <MenuItem value={"21-40"}>21-40</MenuItem>
                          <MenuItem value={"41-60"}>41-60</MenuItem>
                          <MenuItem value={"61-80"}>61-80</MenuItem>
                          <MenuItem value={"81-100"}>81-100</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
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
                  style={{ textAlign: "center" }}
                >
                  <InputLabel id="server-selection">Server</InputLabel>
                  <Select
                    labelId="server-selection-label"
                    id="server-selection"
                    onChange={(event: any, value: any) => {
                      setServer(value?.props?.value);
                    }}
                    label="Server"
                    value={server}
                  >
                    {props?.serversList?.map((server: any) => {
                      return (
                        <MenuItem value={server.id} key={server.id}>
                          {server.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Paper>
            <Paper style={{ marginTop: "1rem", padding: "1rem" }}>
              <Grid xs={12} item>
                <Typography component="h4" variant="h4" color="primary">
                  Desired Rank
                </Typography>
              </Grid>
              <Grid xs={12} item>
                Please select your Desired Rank and Division
              </Grid>
              <Grid xs={12} item style={{ marginTop: "1rem" }}>
                <Grid container spacing={2} justify="center">
                  {props?.desiredRanksList?.map((rank: any) => {
                    return (
                      <Chip
                        key={rank.id}
                        label={rank.name}
                        clickable
                        color="primary"
                        variant={
                          desiredRank === rank.name ? "default" : "outlined"
                        }
                        onClick={() => {
                          setDesiredRank(rank.name);
                          setDesiredRankTiers(rank.tiers);
                          setDesiredRankTier("");
                        }}
                        style={{ marginLeft: ".5rem", marginTop: ".5rem" }}
                      />
                    );
                  })}
                </Grid>
              </Grid>
              <Grid xs={12} item style={{ marginTop: "1rem" }}>
                <Grid container spacing={2} justify="center">
                  {desiredRankTiers !== "" &&
                    desiredRankTiers.split(",")?.map((tier: any) => {
                      return (
                        <Chip
                          key={tier}
                          label={tier}
                          clickable
                          color="secondary"
                          variant={
                            desiredRankTier === tier ? "default" : "outlined"
                          }
                          onClick={() => {
                            setDesiredRankTier(tier);
                          }}
                          style={{ marginLeft: ".5rem", marginTop: ".5rem" }}
                        />
                      );
                    })}
                  {(desiredRank === "Immortal" ||
                    desiredRank === "Radiant") && (
                    <Grid xs={12} item style={{ textAlign: "center" }}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        size="small"
                        style={{ marginTop: "1rem", textAlign: "center" }}
                      >
                        <InputLabel id="desired-rank-amount-selection">
                          Desired Rank Amount
                        </InputLabel>
                        <Select
                          labelId="desired-rank-amount-selection"
                          id="desired-rank-amount"
                          onChange={(event: any, value: any) => {
                            setDesiredRankAmount(value?.props?.value);
                          }}
                          variant="outlined"
                          fullWidth
                          value={desiredRankAmount}
                          label="Desired Rank Amount"
                        >
                          <MenuItem value={"0-20"}>0-20</MenuItem>
                          <MenuItem value={"21-40"}>21-40</MenuItem>
                          <MenuItem value={"41-60"}>41-60</MenuItem>
                          <MenuItem value={"61-80"}>61-80</MenuItem>
                          <MenuItem value={"81-100"}>81-100</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
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
                  value={priorityOrder}
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
          <Grid xs={12} item>
            <TextField
              fullWidth
              variant="outlined"
              autoComplete="unset"
              margin="dense"
              label="LOL Account"
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
              label="LOL Password"
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

          {/*     <Grid xs={12} item style={{ marginTop: "1rem", textAlign: "center" }}>
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
          </Grid> */}

          <Grid xs={12} item style={{ marginTop: ".5rem" }}>
            <Button
              fullWidth
              variant="contained"
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
export const RankBoosting = withSnackbar(RankBoostingComponent);
