import { Button, Grid, Icon, makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { failureToast } from "../../../util/util";
import Title from "../../Title";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
function Row(props: any) {
  const { row } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>{row.totalAmount}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const WaitingForBoostersOrdersComponent = (props: any) => {
  const [orderList, setOrderList] = useState<any>([]);
  // const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  // const admin = user.roles.includes("ROLE_ADMIN");
  // const [open, setOpen] = React.useState(false);
  const [ratesList, setRatesList] = React.useState<any>([]);
  const [serversList, setServersList] = React.useState<any>([]);
  const [desiredRanksList, setDesiredRanksList] = React.useState<any>([]);
  const [currentRanksList, setCurrentRanksList] = React.useState<any>([]);

  console.log(ratesList, serversList, desiredRanksList, currentRanksList);
  const history = useHistory();
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  function navigateToCreateOrder() {
    history.push("/dashboard/admin-create-order");
  }
  // const handleClose = () => {
  //   setOpen(false);
  //   fetchOrderList();
  // };
  const fetchOrderList = () => {
    const url = "/api/v1/order/new";
    axios
      .get(url)
      .then((response: any) => {
        setOrderList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const fetchServerList = () => {
    axios
      .get("/api/v1/config/servers")
      .then((response: any) => {
        setServersList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const fetchRanksList = () => {
    axios
      .get("/api/v1/config/ranks")
      .then((response: any) => {
        const currentRankList = [...response.data];
        const desiredRankList = [...response.data];
        currentRankList.splice(currentRankList.length - 1, 1);
        desiredRankList.splice(0, 1);
        setCurrentRanksList(currentRankList);
        setDesiredRanksList(desiredRankList);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
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
  useEffect(() => {
    fetchOrderList();
    fetchServerList();
    fetchRanksList();
    fetchRatesList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      {/* <AddAnOrderDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        serversList={serversList}
        desiredRanksList={desiredRanksList}
        currentRanksList={currentRanksList}
      ></AddAnOrderDialog> */}
      <Grid container>
        <Grid xs={9} item>
          <Title>Waiting for Boosters Orders ({orderList.length})</Title>
        </Grid>
        <Grid xs={3} item style={{ textAlign: "right" }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={navigateToCreateOrder}
          >
            <Icon>add</Icon>
          </Button>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((row: any) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
export const WaitingForBoostersOrders = withSnackbar(
  WaitingForBoostersOrdersComponent
);
