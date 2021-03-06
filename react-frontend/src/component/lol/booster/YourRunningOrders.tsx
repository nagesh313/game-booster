import { IconButton, Tooltip } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { RemoveRedEye } from "@material-ui/icons";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { failureToast, successToast } from "../../../util/util";
import Title from "../../Title";
export function YourRunningOrdersComponent(props: any) {
  const [orderList, setOrderList] = React.useState<any>([]);
  const history = useHistory();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const fetchOrderList = () => {
    axios
      .get("/api/v1/order/booster/running/" + user.id)
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
  const fetchBoosterPercentage = () => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    axios
      .get("/api/v1/revenue/percentage/" + user.id)
      .then((response: any) => {
        setPercentage(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const orderComplete = (row: any) => {
    if (window.confirm("Are you sure you Want to mark order as completed?")) {
      axios
        .patch("/api/v1/order/complete/" + row.id)
        .then((response: any) => {
          props.refresh();
          props.enqueueSnackbar("Order Marked as completed", successToast);
        })
        .catch((reponse: any) => {
          props.enqueueSnackbar(reponse.error, failureToast);
        });
    }
  };
  const dropOrder = (row: any) => {
    if (window.confirm("Are you sure you Want to drop this order ?")) {
      axios
        .patch("/api/v1/order/drop/" + row.id)
        .then((response: any) => {
          props.refresh();
          props.enqueueSnackbar("Order Dropped completed", successToast);
        })
        .catch((reponse: any) => {
          props.enqueueSnackbar(reponse.error, failureToast);
        });
    }
  };
  let [percentage, setPercentage] = React.useState<any>(0);

  useEffect(() => {
    fetchOrderList();
    fetchBoosterPercentage();
  }, [props.key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Title>
        Your Running Orders (Orders Taken/Assigned) ({orderList.length})
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Order Details</TableCell>
            {/* <TableCell>Extras</TableCell> */}
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

              {/* <TableCell>
                {row.appearOffline && <div>APPEAR OFFLINE ON CHAT</div>}
                {row.specificAgent && <div>SPECIFIC AGENTS</div>}
                {row.playWithBooster && <div>PLAY WITH BOOSTER</div>}
                {row.priorityOrder && <div>PRIORITY ORDER</div>}
                {row.withStreaming && <div>WITH STREAMING</div>}
              </TableCell> */}
              <TableCell>{row.server}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.createdDate}</TableCell>
              <TableCell>
                $
                {user?.roles.includes("ROLE_BOOSTER")
                  ? ((row.totalAmount * percentage) / 100).toFixed(2)
                  : row.totalAmount.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="View Order">
                  <IconButton
                    onClick={() => {
                      viewOrder(row);
                    }}
                  >
                    <RemoveRedEye></RemoveRedEye>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Finish Order">
                  <IconButton
                    onClick={() => {
                      orderComplete(row);
                    }}
                  >
                    <AssignmentTurnedInIcon></AssignmentTurnedInIcon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Drop Order">
                  <IconButton
                    onClick={() => {
                      dropOrder(row);
                    }}
                  >
                    <CancelIcon></CancelIcon>
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
export const YourRunningOrders = withSnackbar(YourRunningOrdersComponent);
