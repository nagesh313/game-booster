import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import React from "react";
import * as Yup from "yup";
import { failureToast, successToast } from "../../../util/util";

const OrderSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  lolAccount: Yup.string().required("Required"),
  lolPassword: Yup.string().required("Required"),
  summonerName: Yup.string().required("Required"),
  server: Yup.string().required("Required"),
  startLeague: Yup.string().required("Required"),
  desiredLeague: Yup.string().required("Required"),
  boostType: Yup.string().required("Required"),
  startDivsion: Yup.string().required("Required"),
  desiredDivsion: Yup.string().required("Required"),
  duoBoost: Yup.string().required("Required"),
  wins: Yup.number().required("Required"),
  flash: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
});

const AddAnOrderDialogComponent = (props: any) => {
  const submitNewOrder = (data: any) => {
    const payload: any = {
      ...data,
    };
    axios
      .post("/api/v1/order/create/", payload)
      .then((response: any) => {
        console.log(response);
        props.enqueueSnackbar("Order Saved Successfully", successToast);
        props.handleClose();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const values: any = {
    username: "user",
    email: "email@email.com",
    password: "password",
    lolAccount: "lolAccount",
    lolPassword: "lolPassword",
    summonerName: "summonerName",
    server: "server",
    startLeague: "startLeague",
    desiredLeague: "desiredLeague",
    boostType: "boostType",
    startDivsion: "startDivsion",
    desiredDivsion: "desiredDivsion",
    duoBoost: "duoBoost",
    wins: 32,
    flash: "flash",
    price: 32.3,
  };

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Add an Order</DialogTitle>
        <Formik
          initialValues={values}
          validationSchema={OrderSchema}
          onSubmit={(values: any) => {
            submitNewOrder(values);
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid xs={4} item>
                    <TextField
                      autoFocus
                      name="username"
                      margin="dense"
                      id="username"
                      label="Username"
                      onChange={handleChange}
                      value={values.username}
                    />
                  </Grid>
                  <Grid xs={4} item>
                    <TextField
                      name="email"
                      margin="dense"
                      id="email"
                      label="Email"
                      type="email"
                      onChange={handleChange}
                      value={values.email}
                    />
                  </Grid>
                  <Grid xs={4} item>
                    <TextField
                      name="password"
                      margin="dense"
                      id="password"
                      label="Password"
                      onChange={handleChange}
                      value={values.password}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid xs={3} item>
                    <TextField
                      autoFocus
                      name="lolAccount"
                      margin="dense"
                      id="lolAccount"
                      label="LOL Account"
                      onChange={handleChange}
                      value={values.lolAccount}
                    />
                  </Grid>
                  <Grid xs={3} item>
                    <TextField
                      autoFocus
                      name="lolPassword"
                      margin="dense"
                      id="lolPassword"
                      label="LOL Password"
                      onChange={handleChange}
                      value={values.lolPassword}
                    />
                  </Grid>
                  <Grid xs={4} item>
                    <TextField
                      name="summonerName"
                      margin="dense"
                      id="summonerName"
                      label="Summoner Name"
                      onChange={handleChange}
                      value={values.summonerName}
                    />
                  </Grid>
                  <Grid xs={2} item>
                    <TextField
                      name="server"
                      margin="dense"
                      id="server"
                      label="Server"
                      onChange={handleChange}
                      value={values.server}
                    />
                  </Grid>
                </Grid>{" "}
                <Grid container spacing={3}>
                  <Grid xs={4} item>
                    <TextField
                      name="startLeague"
                      margin="dense"
                      id="startLeague"
                      label="Start League"
                      onChange={handleChange}
                      value={values.startLeague}
                    />
                  </Grid>
                  <Grid xs={4} item>
                    <TextField
                      name="desiredLeague"
                      margin="dense"
                      id="desiredLeague"
                      label="Desired League"
                      onChange={handleChange}
                      value={values.desiredLeague}
                    />
                  </Grid>
                  <Grid xs={4} item>
                    <TextField
                      name="boostType"
                      margin="dense"
                      id="boostType"
                      label="Boost Type"
                      onChange={handleChange}
                      value={values.boostType}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid xs={4} item>
                    <TextField
                      name="startDivsion"
                      margin="dense"
                      id="startDivsion"
                      label="Start Divsion"
                      onChange={handleChange}
                      value={values.startDivsion}
                    />
                  </Grid>
                  <Grid xs={4} item>
                    <TextField
                      name="desiredDivsion"
                      margin="dense"
                      id="desiredDivsion"
                      label="Desired Divsion"
                      onChange={handleChange}
                      value={values.desiredDivsion}
                    />
                  </Grid>
                  <Grid xs={4} item>
                    <TextField
                      name="duoBoost"
                      margin="dense"
                      id="duoBoost"
                      label="Duo Boost"
                      onChange={handleChange}
                      value={values.duoBoost}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid xs={4} item>
                    <TextField
                      name="wins"
                      margin="dense"
                      id="wins"
                      label="Wins"
                      type="number"
                      onChange={handleChange}
                      value={values.wins}
                    />
                  </Grid>
                  <Grid xs={4} item>
                    <TextField
                      name="flash"
                      margin="dense"
                      id="flash"
                      label="Flash"
                      onChange={handleChange}
                      value={values.flash}
                    />
                  </Grid>
                  <Grid xs={4} item>
                    <TextField
                      name="price"
                      margin="dense"
                      id="price"
                      label="Price"
                      type="number"
                      onChange={handleChange}
                      value={values.price}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                  Cancel
                </Button>
                <Button color="primary" type="submit" variant="contained">
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};
export const AddAnOrderDialog = withSnackbar(AddAnOrderDialogComponent);
