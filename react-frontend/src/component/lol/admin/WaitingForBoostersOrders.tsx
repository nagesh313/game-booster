import { Button, ButtonGroup, Grid, makeStyles } from "@material-ui/core";
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
  const history = useHistory();
  const { row } = props;
  const classes = useRowStyles();
  const viewOrder = (row: any) => {
    history.push("/dashboard/order-details/" + row.id);
  };
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>{row.totalAmount}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell align="center">
          <ButtonGroup
            size="small"
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button color="primary" onClick={() => viewOrder(row)}>
              View
            </Button>
          </ButtonGroup>
        </TableCell>
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
  const [ranksList, setDesiredRanksList] = React.useState<any>([]);

  console.log(ratesList, serversList, ranksList);
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
        setDesiredRanksList(response.data);
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
        ranksList={ranksList}
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
            Add New Order
          </Button>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center"></TableCell>
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
