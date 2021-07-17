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
export function PaidOrdersComponent(props: any) {
  const [orderList, setOrderList] = React.useState<any>([]);
  const history = useHistory();
  const fetchOrderList = () => {
    axios
      .get("/api/v1/order/finished")
      .then((response: any) => {
        const result = response.data.filter((d: any) => {
          return d.paid === true;
        });
        setOrderList(result);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const markAsPaidToBooster = (row: any) => {
    if (window.confirm("Are you sure you paid the Booster?")) {
      axios
        .get("/api/v1/order/admin/paid/" + row.id)
        .then((response: any) => {
          props.enqueueSnackbar(
            "Payment for Order to Booster Has been Marked as Paid",
            successToast
          );
          fetchOrderList();
        })
        .catch((reponse: any) => {
          props.enqueueSnackbar(reponse.error, failureToast);
        });
    }
  };
  const deleteOrder = (row: any) => {
    if (window.confirm("Are you sure you want to Delete the Order?")) {
      axios
        .delete("/api/v1/order/admin/delete/" + row.id)
        .then((response: any) => {
          props.enqueueSnackbar("Order Deleted Successfully", successToast);
          fetchOrderList();
        })
        .catch((reponse: any) => {
          props.enqueueSnackbar(reponse.error, failureToast);
        });
    }
  };
  const viewOrder = (row: any) => {
    history.push("/dashboard/order-details/" + row.id);
  };
  useEffect(() => {
    fetchOrderList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  return (
    <React.Fragment>
      <Title>Paid Orders ({orderList.length})</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Queue</TableCell>
            <TableCell>Boost</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Completion Date</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Booster name</TableCell>
            <TableCell>Booster Price</TableCell>
            <TableCell>Booster Paypal</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.Queue}</TableCell>
              <TableCell>{row.Boost}</TableCell>
              <TableCell>{row.createdDate}</TableCell>
              <TableCell>{row.completionDate}</TableCell>
              <TableCell>
                {user?.roles.includes("ROLE_BOOSTER")
                  ? row.boosterAmount
                  : row.totalAmount}
              </TableCell>
              <TableCell>{row.assignedTo?.username}</TableCell>
              <TableCell>{row.BoosterPrice}</TableCell>
              <TableCell>{row?.assignedTo?.paypalEmail}</TableCell>
              <TableCell align="center">
                <ButtonGroup
                  size="small"
                  variant="contained"
                  color="primary"
                  aria-label="contained primary button group"
                >
                  <Button
                    color="primary"
                    onClick={() => {
                      viewOrder(row);
                    }}
                  >
                    View
                  </Button>
                  {!row.paid && (
                    <Button
                      color="primary"
                      onClick={() => {
                        markAsPaidToBooster(row);
                      }}
                    >
                      PAID
                    </Button>
                  )}
                  <Button
                    color="secondary"
                    onClick={() => {
                      deleteOrder(row);
                    }}
                  >
                    Delete
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
export const PaidOrders = withSnackbar(PaidOrdersComponent);
