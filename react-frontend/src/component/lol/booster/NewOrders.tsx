import { Button } from "@material-ui/core";
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
export function NewOrdersComponent(props: any) {
  const [newOrderList, setNewOrderList] = React.useState<any>([]);

  const fetchOrderList = () => {
    axios
      .get("/api/v1/order/new")
      .then((response: any) => {
        setNewOrderList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const takeOrder = (row: any) => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    axios
      .patch("/api/v1/order/take/" + user.id + "/" + row.id+"/")
      .then((response: any) => {
        props.enqueueSnackbar(
          "Order Has been added to your Order",
          successToast
        );
        fetchOrderList();
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
      <Title>New Orders ({newOrderList.length})</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Order Details</TableCell>
            <TableCell>Extras</TableCell>
            <TableCell>Server</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newOrderList.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.type}</TableCell>

              {row.type === "Rank Boosting" && (
                <TableCell>
                  {row.currentRank + " - "}
                  {row.currentRankAmount === null
                    ? row.currentRankTier
                    : row.currentRankAmount}
                  {" > "}
                  {row.desiredRank + " - "}
                  {row.desiredRankAmount === null
                    ? row.desiredRankTier
                    : row.desiredRankAmount}
                </TableCell>
              )}

              {row.type === "Placements" && (
                <TableCell>
                  {row.currentRank + " - "}
                  {"Need " + row.wins + " Win(s)"}
                </TableCell>
              )}

              {row.type === "Win Boosting" && (
                <TableCell>
                  {row.currentRank + " - "}
                  {row.currentRankAmount === null
                    ? row.currentRankTier
                    : row.currentRankAmount}
                  {" > "}
                  {"Need " + row.wins + " Win(s)"}
                </TableCell>
              )}

              <TableCell>
                {row.appearOffline && <div>APPEAR OFFLINE ON CHAT</div>}
                {row.specificAgent && <div>SPECIFIC AGENTS</div>}
                {row.playWithBooster && <div>PLAY WITH BOOSTER</div>}
                {row.priorityOrder && <div>PRIORITY ORDER</div>}
                {row.withStreaming && <div>WITH STREAMING</div>}
              </TableCell>
              <TableCell>{row.server}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.createdDate}</TableCell>
              <TableCell>${row.totalAmount}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => {
                    takeOrder(row);
                  }}
                >
                  Take
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
export const NewOrders = withSnackbar(NewOrdersComponent);
