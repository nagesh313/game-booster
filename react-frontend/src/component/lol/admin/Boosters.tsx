import { Button, ButtonGroup, Grid, makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { failureToast, successToast } from "../../../util/util";
import Title from "../../Title";
import { AddABoosterDialog } from "./AddABoosterDialog";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
function Row(props: any) {
  const classes = useRowStyles();

  const { row } = props;
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.rank}</TableCell>
        <TableCell>{row?.paypalEmail}</TableCell>
        <TableCell align="center">{row.percentage}</TableCell>
        <TableCell align="center">
          <ButtonGroup
            size="small"
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button color="primary" onClick={() => props.editBooster(row)}>
              Edit
            </Button>
            <Button color="secondary" onClick={() => props.deleteBooster(row)}>
              Delete
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
const BoostersComponent = (props: any) => {
  const [boosterList, setBoostersList] = useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [editBoosterData, setEditBoosterData] = React.useState<any>();

  const editBooster = (row: any) => {
    setEditBoosterData(row);
    setOpen(true);
  };
  const deleteBooster = (row: any) => {
    axios
      .delete("/api/v1/admin/user/delete/" + row.id)
      .then((response: any) => {
        console.log(response);
        props.enqueueSnackbar("Boster Deleted Successfully", successToast);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditBoosterData(null);
    fetchBoosterList();
  };
  const fetchBoosterList = () => {
    const url = "/api/v1/admin/boosters";
    axios
      .get(url)
      .then((response: any) => {
        setBoostersList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  useEffect(() => {
    fetchBoosterList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <AddABoosterDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        editBoosterData={editBoosterData}
      ></AddABoosterDialog>
      <Grid container>
        <Grid xs={9} item>
          <Title>Boosters ({boosterList.length})</Title>
        </Grid>
        <Grid xs={3} item style={{ textAlign: "right" }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            Add a Booster
          </Button>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell>Paypal</TableCell>
            <TableCell align="center">Percentage</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {boosterList.map((row: any) => (
            <Row
              key={row.id}
              row={row}
              enqueueSnackbar={props.enqueueSnackbar}
              editBooster={editBooster}
              deleteBooster={deleteBooster}
            />
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
export const Boosters = withSnackbar(BoostersComponent);
