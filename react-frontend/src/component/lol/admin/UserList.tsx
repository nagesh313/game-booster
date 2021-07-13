import { Container, Paper } from "@material-ui/core";
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

export function UserListComponent(props: any) {
  const [userList, setUserList] = React.useState<any>([]);

  const fetchUserList = () => {
    axios
      .get("/api/v1/admin/all")
      .then((response: any) => {
        setUserList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };

  useEffect(() => {
    fetchUserList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Container>
        <Paper style={{ padding: "1rem" }}>
          <Title>List of registered Users ({userList.length})</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Username</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell>{row.firstname}</TableCell>
                  <TableCell>{row.lastname}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>{" "}
      </Container>
    </React.Fragment>
  );
}
export const UserList = withSnackbar(UserListComponent);
