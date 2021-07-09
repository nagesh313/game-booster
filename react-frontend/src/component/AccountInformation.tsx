import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { failureToast, successToast } from "../util/util";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AccountInformationSchema = Yup.object().shape({
  lolAccount: Yup.string().required("Required"),
  lolPassword: Yup.string().required("Required"),
  summonerName: Yup.string().required("Required"),
  paypalEmail: Yup.string().required("Required"),
});

export function AccountInformationComponent(props: any) {
  const classes = useStyles();
  const [values, setValues] = React.useState<any>({
    lolAccount: "",
    lolPassword: "",
    summonerName: "",
    paypalEmail: "",
  });
  const accountInformationSubmit = (values: any) => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    axios
      .post("/api/v1/admin/account-information/" + user.id, { ...values })
      .then((response: any) => {
        props.enqueueSnackbar("Account Updated", successToast);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.message, failureToast);
      });
  };
  const fetchAccountInformation = () => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    axios
      .get("/api/v1/admin/account-information/" + user.id)
      .then((response: any) => {
        setValues(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.message, failureToast);
      });
  };

  useEffect(() => {
    fetchAccountInformation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Account Details
        </Typography>
        <br></br>
        <Formik
          enableReinitialize
          initialValues={values}
          validationSchema={AccountInformationSchema}
          onSubmit={(values: any) => {
            accountInformationSubmit(values);
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid xs={4} item>
                  <TextField
                    variant="outlined"
                    autoFocus
                    name="lolAccount"
                    margin="dense"
                    id="lolAccount"
                    label="LOL Account"
                    onChange={handleChange}
                    value={values.lolAccount}
                  />
                </Grid>
                <Grid xs={4} item>
                  <TextField
                    variant="outlined"
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
                    variant="outlined"
                    name="summonerName"
                    margin="dense"
                    id="summonerName"
                    label="Summoner Name"
                    onChange={handleChange}
                    value={values.summonerName}
                  />
                </Grid>
                <Grid xs={4} item>
                  <TextField
                    variant="outlined"
                    name="paypalEmail"
                    margin="dense"
                    id="paypalEmail"
                    label="Paypal"
                    onChange={handleChange}
                    value={values.paypalEmail}
                  />
                </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={3} justify="center">
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
export const AccountInformation = withSnackbar(AccountInformationComponent);
