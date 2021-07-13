import { Button, Container, Grid, Paper, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { failureToast, successToast } from "../../../util/util";
import Title from "../../Title";

export function RatesListComponent(props: any) {
  const [ratesList, setRatesList] = React.useState<any>([]);
  const [placementsRatesList, setPlacementsRatesList] = React.useState<any>([]);
  const [winBoostingsRatesList, setWinBoostingsRatesList] = React.useState<any>(
    []
  );

  const rateRef = React.useRef<any>();
  const placementRef = React.useRef<any>();
  const winBoostingsRef = React.useRef<any>();
  const fetchRatesList = () => {
    axios
      .get("/api/v1/config/rates")
      .then((response: any) => {
        setRatesList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const saveRatesList = () => {
    const newRatesList: any = [...ratesList];
    for (let i = 0; i < newRatesList.length; i++) {
      newRatesList[i].amount = rateRef.current.elements[i * 2].value;
    }
    axios
      .post("/api/v1/config/rates", newRatesList)
      .then((response: any) => {
        props.enqueueSnackbar("Rates Saved Successfully", successToast);
        fetchRatesList();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const fetchPlacementsList = () => {
    axios
      .get("/api/v1/config/placements")
      .then((response: any) => {
        setPlacementsRatesList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };

  const savePlacementsList = () => {
    const newRatesList: any = [...placementsRatesList];
    for (let i = 0; i < placementsRatesList.length; i++) {
      newRatesList[i].amount = placementRef.current.elements[i * 2].value;
    }
    axios
      .post("/api/v1/config/placements", newRatesList)
      .then((response: any) => {
        props.enqueueSnackbar(
          "Placements Rates Saved Successfully",
          successToast
        );
        fetchPlacementsList();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };

  const fetchWinBoostingsList = () => {
    axios
      .get("/api/v1/config/winboostings")
      .then((response: any) => {
        setWinBoostingsRatesList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };

  const saveWinBoostingsList = () => {
    const newRatesList: any = [...winBoostingsRatesList];
    for (let i = 0; i < winBoostingsRatesList.length; i++) {
      newRatesList[i].amount = winBoostingsRef.current.elements[i * 2].value;
    }
    axios
      .post("/api/v1/config/winboostings", newRatesList)
      .then((response: any) => {
        props.enqueueSnackbar(
          "Win Boostings Rates Saved Successfully",
          successToast
        );
        fetchWinBoostingsList();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };

  useEffect(() => {
    fetchRatesList();
    fetchPlacementsList();
    fetchWinBoostingsList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Container style={{ marginTop: "1rem" }}>
        <Paper style={{ padding: "1rem" }}>
          <Title>Rank Boosting Rates ({ratesList.length})</Title>
          <form ref={rateRef}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Rank From</TableCell>
                  <TableCell>Rank To</TableCell>
                  <TableCell>Tier From</TableCell>
                  <TableCell>Tier To</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ratesList.map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.rankFrom}</TableCell>
                    <TableCell>{row.rankTo}</TableCell>
                    <TableCell>{row.tierFrom}</TableCell>
                    <TableCell>{row.tierTo}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="number"
                        defaultValue={row.amount}
                        id={"amount" + row.id}
                        name={"amount" + row.id}
                        disabled={row.disabled}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </form>
          <Grid container justify="center" style={{ marginTop: "1rem" }}>
            <Grid item>
              <Button
                onClick={saveRatesList}
                variant="contained"
                color="primary"
                size="large"
              >
                SAVE RANK BOOSTING RATES
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Container style={{ marginTop: "1rem" }}>
        <Paper style={{ padding: "1rem" }}>
          <Title>Placement Rates ({placementsRatesList.length})</Title>
          <form ref={placementRef}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Rank</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {placementsRatesList.map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.rank}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="number"
                        defaultValue={row.amount}
                        id={"amount" + row.id}
                        name={"amount" + row.id}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </form>
          <Grid container justify="center" style={{ marginTop: "1rem" }}>
            <Grid item>
              <Button
                onClick={savePlacementsList}
                variant="contained"
                color="primary"
                size="large"
              >
                SAVE PLACEMENT RATES
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Container style={{ marginTop: "1rem" }}>
        <Paper style={{ padding: "1rem" }}>
          <Title>Win Boosting Rates ({placementsRatesList.length})</Title>
          <form ref={winBoostingsRef}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Rank</TableCell>
                  <TableCell>Tier</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {winBoostingsRatesList.map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.rank}</TableCell>
                    <TableCell>{row.tier}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        variant="outlined"
                        type="number"
                        defaultValue={row.amount}
                        id={"amount" + row.id}
                        name={"amount" + row.id}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </form>
          <Grid container justify="center" style={{ marginTop: "1rem" }}>
            <Grid item>
              <Button
                onClick={saveWinBoostingsList}
                variant="contained"
                color="primary"
                size="large"
              >
                SAVE WIN BOOSTING RATES
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
export const RatesList = withSnackbar(RatesListComponent);
