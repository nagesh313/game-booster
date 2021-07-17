import { Button, ButtonGroup } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { failureToast, successToast } from "../../../util/util";
import Title from "../../Title";
export function RunningOrdersComponent(props: any) {
  const [runningOrderList, setRunningOrderList] = React.useState<any>([]);
  const history = useHistory();
  const fetchRunningOrderList = () => {
    axios
      .get("/api/v1/order/running")
      .then((response: any) => {
        setRunningOrderList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const dropOrder = (row: any) => {
    axios
      .patch("/api/v1/order/drop/" + row.id)
      .then((response: any) => {
        fetchRunningOrderList();
        props.enqueueSnackbar("Order Dropped", successToast);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const viewOrder = (row: any) => {
    history.push("/dashboard/order-details/" + row.id);
  };

  useEffect(() => {
    fetchRunningOrderList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  return (
    <React.Fragment>
      <Title>Running Orders ({runningOrderList.length})</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Booster</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {runningOrderList.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                {user?.roles.includes("ROLE_BOOSTER")
                  ? row.boosterAmount
                  : row.totalAmount}
              </TableCell>
              <TableCell>{row?.assignedTo?.username}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <ButtonGroup
                  size="small"
                  variant="contained"
                  color="primary"
                  aria-label="contained primary button group"
                >
                  <Button color="primary" onClick={() => viewOrder(row)}>
                    View
                  </Button>
                  <Button color="secondary" onClick={() => dropOrder(row)}>
                    Drop
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
export const RunningOrders = withSnackbar(RunningOrdersComponent);
