import {
  FormControl,
  FormControlLabel,

  Radio,
  RadioGroup
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import React from "react";
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
  server: Yup.string().required("Required"),
  summonerName: Yup.string().required("Required"),
  accountName: Yup.string().required("Required"),
  accountPassword: Yup.string().required("Required"),
});
export function AccountInformationComponent(props: any) {
  const classes = useStyles();
  const accountInformationSubmit = (values: any) => {
    axios
      .post("/api/account-information", { ...values })
      .then((response: any) => {
        props.enqueueSnackbar(response.message, successToast);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.message, failureToast);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            server: "",
            summonerName: "",
            accountName: "",
            accountPassword: "",
            acccountType: "user",
          }}
          validationSchema={AccountInformation}
          onSubmit={(values: any) => {
            accountInformationSubmit(values);
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            // obj: any
            <Form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="server"
                    name="server"
                    variant="outlined"
                    fullWidth
                    id="server"
                    label="First Name"
                    autoFocus
                    onChange={handleChange}
                    value={values.server}
                    error={errors.server && touched.server ? true : false}
                    helperText={touched.server && errors.server}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="summonerName"
                    label="Last Name"
                    name="summonerName"
                    autoComplete="summonerName"
                    onChange={handleChange}
                    value={values.summonerName}
                    error={
                      errors.summonerName && touched.summonerName ? true : false
                    }
                    helperText={touched.summonerName && errors.summonerName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="accountName"
                    label="Username"
                    name="accountName"
                    onChange={handleChange}
                    value={values.accountName}
                    error={
                      errors.accountName && touched.accountName ? true : false
                    }
                    helperText={touched.accountName && errors.accountName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="accountPassword"
                    label="Password"
                    type="accountPassword"
                    id="accountPassword"
                    autoComplete="current-accountPassword"
                    onChange={handleChange}
                    value={values.accountPassword}
                    error={
                      errors.accountPassword && touched.accountPassword
                        ? true
                        : false
                    }
                    helperText={
                      touched.accountPassword && errors.accountPassword
                    }
                  />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="position"
                      defaultValue="user"
                      name="acccountType"
                      id="acccountType"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="user"
                        control={<Radio color="primary" />}
                        label="User"
                      />
                      <FormControlLabel
                        value="booster"
                        control={<Radio color="primary" />}
                        label="Booster"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/#/signIn" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
export const AccountInformation = withSnackbar(AccountInformationComponent);
