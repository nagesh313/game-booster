import { IconButton } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { failureToast, successToast } from "../../../util/util";
import Title from "../../Title";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";
export function OrdersComponent(props: any) {
  const history = useHistory();
  const [orderList, setOrderList] = React.useState<any>([]);

  const fetchOrderList = () => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    axios
      .get("/api/v1/order/user/" + user.id)
      .then((response: any) => {
        setOrderList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const viewOrder = (row: any) => {
    history.push("/dashboard/order-details/" + row.id);
  };

  const pauseOrder = (row: any) => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    axios
      .patch("/api/v1/order/pause/" + user.id + "/" + row.id)
      .then((response: any) => {
        props.enqueueSnackbar("Order Paused Successfully", successToast);
        fetchOrderList();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const resumeOrder = (row: any) => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    axios
      .patch("/api/v1/order/resume/" + user.id + "/" + row.id)
      .then((response: any) => {
        props.enqueueSnackbar("Order Resumed Successfully", successToast);
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
      <Title>Your Orders ({orderList.length})</Title>
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
          {orderList.map((row: any) => (
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
                <IconButton
                  onClick={() => {
                    viewOrder(row);
                  }}
                >
                  <VisibilityIcon></VisibilityIcon>
                </IconButton>
                <IconButton
                  onClick={() => {
                    pauseOrder(row);
                  }}
                >
                  <PauseCircleFilledIcon></PauseCircleFilledIcon>
                </IconButton>
                <IconButton
                  onClick={() => {
                    resumeOrder(row);
                  }}
                >
                  <PlayCircleFilledIcon></PlayCircleFilledIcon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
export const Orders = withSnackbar(OrdersComponent);
