import { Button, Grid, Icon, makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { failureToast } from "../../../util/util";
import Title from "../../Title";
import { AddAnOrderDialog } from "./AddAnOrderDialog";
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchOrderList();
  };
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
  useEffect(() => {
    fetchOrderList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <AddAnOrderDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      ></AddAnOrderDialog>
      <Grid container>
        <Grid xs={9} item>
          <Title>Waiting for Boosters Orders</Title>
        </Grid>
        <Grid xs={3} item style={{ textAlign: "right" }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
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
