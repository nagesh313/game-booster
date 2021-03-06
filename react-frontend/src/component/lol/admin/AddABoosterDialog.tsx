import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import React from "react";
import { failureToast, successToast } from "../../../util/util";
import Title from "../../Title";

// const OrderSchema = Yup.object().shape({
//   username: Yup.string().required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
//   password: Yup.string().required("Required"),
//   paypalEmail: Yup.string()
//     .email("Invalid paypalEmail email")
//     .required("Required"),
//   rank: Yup.string().required("Required"),
//   percentage: Yup.string().required("Required"),
// });

const AddABoosterDialogComponent = (props: any) => {
  const submitBooster = (data: any) => {
    const payload: any = {
      ...data,
      passwordFromFE: data.password,
    };
    payload.id = props.editBoosterData?.id;
    axios
      .post("/api/v1/admin/booster/create/", payload)
      .then((response: any) => {
        console.log(response);
        props.enqueueSnackbar("Booster Saved Successfully", successToast);
        props.handleClose();
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  let values: any;
  if (props.editBoosterData) {
    values = {
      id: props.editBoosterData.username,
      username: props.editBoosterData.username,
      email: props.editBoosterData.email,
      password: props.editBoosterData.password,
      paypalEmail: props.editBoosterData.paypalEmail,
      rank: props.editBoosterData.rank,
      percentage: props.editBoosterData.percentage,
    };
  } else {
    values = {
      username: "",
      email: "",
      password: "",
      paypalEmail: "",
      rank: "",
      percentage: "",
    };
  }

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <Formik
          initialValues={values}
          // validationSchema={OrderSchema}
          onSubmit={(values: any) => {
            submitBooster(values);
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <DialogContent style={{ padding: "24px" }}>
                <Title>Add a Booster</Title>
                <Grid container>
                  <Grid xs={6} item>
                    <TextField
                      autoComplete="no"
                      variant="outlined"
                      autoFocus
                      name="username"
                      margin="dense"
                      id="username"
                      label="Username"
                      onChange={handleChange}
                      value={values.username}
                      helperText={touched.username && errors.username}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <TextField
                      autoComplete="no"
                      variant="outlined"
                      name="email"
                      margin="dense"
                      id="email"
                      label="Email"
                      onChange={handleChange}
                      value={values.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                </Grid>
                {!values.id && (
                  <Grid container>
                    <Grid xs={6} item>
                      <TextField
                        variant="outlined"
                        name="password"
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        onChange={handleChange}
                        value={values.password}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    <Grid xs={6} item>
                      <TextField
                        variant="outlined"
                        name="confirmPassword"
                        margin="dense"
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        onChange={handleChange}
                        value={values.confirmPassword}
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                    </Grid>
                  </Grid>
                )}
                <Grid container spacing={3}>
                  <Grid xs={6} item>
                    <TextField
                      autoComplete="new-password"
                      variant="outlined"
                      name="paypalEmail"
                      margin="dense"
                      id="paypalEmail"
                      label="Paypal Email"
                      onChange={handleChange}
                      value={values.paypalEmail}
                      helperText={touched.paypalEmail && errors.paypalEmail}
                    />
                  </Grid>
                  <Grid xs={3} item>
                    <TextField
                      autoComplete="new-password"
                      variant="outlined"
                      name="rank"
                      margin="dense"
                      id="rank"
                      label="Rank"
                      onChange={handleChange}
                      value={values.rank}
                      helperText={touched.rank && errors.rank}
                    />
                  </Grid>
                  <Grid xs={3} item>
                    <TextField
                      autoComplete="new-password"
                      variant="outlined"
                      name="percentage"
                      margin="dense"
                      id="percentage"
                      label="Percentage"
                      onChange={handleChange}
                      value={values.percentage}
                      type="number"
                      helperText={touched.percentage && errors.percentage}
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
export const AddABoosterDialog = withSnackbar(AddABoosterDialogComponent);
