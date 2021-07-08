import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { failureToast } from "../../../util/util";
import Title from "../../Title";
export function FinishedOrdersComponent(props: any) {
  const [userList, setOrderList] = React.useState<any>([]);

  const fetchOrderList = () => {
    axios
      .get("/api/v1/order/finished")
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
      <Title>Finished Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Queue</TableCell>
            <TableCell>Boost</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Completion Date</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Summoner name</TableCell>
            <TableCell>Booster name</TableCell>
            <TableCell>Booster Price</TableCell>
            <TableCell>Booster Paypal</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.Queue}</TableCell>
              <TableCell>{row.Boost}</TableCell>
              <TableCell>{row.createdDate}</TableCell>
              <TableCell>{row.completionDate}</TableCell>
              <TableCell>{row.totalAmount}</TableCell>
              <TableCell>{row.SummonerName}</TableCell>
              <TableCell>{row.assignedTo?.username}</TableCell>
              <TableCell>{row.BoosterPrice}</TableCell>
              <TableCell>{row?.assignedTo?.paypalEmail}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
export const FinishedOrders = withSnackbar(FinishedOrdersComponent);
