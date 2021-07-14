import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Form, Formik } from "formik";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { failureToast, successToast } from "../util/util";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

const AccountInformationSchema = Yup.object().shape({
  lolAccount: Yup.string().required("Required"),
  lolPassword: Yup.string().required("Required"),
  summonerName: Yup.string().required("Required"),
});

export function AccountInformationComponent(props: any) {
  // const classes = useStyles();
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
        if (response.data != null && response.data !== "") {
          setValues(response.data);
        }
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.message, failureToast);
      });
  };

  useEffect(() => {
    fetchAccountInformation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  return (
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
            <Grid xs={6} item>
              <TextField
                variant="outlined"
                name="lolAccount"
                margin="dense"
                label="VLRNT Account"
                onChange={handleChange}
                value={values.lolAccount}
              />
            </Grid>
            <Grid xs={6} item>
              <TextField
                variant="outlined"
                name="lolPassword"
                margin="dense"
                label="VLRNT Password"
                onChange={handleChange}
                value={values.lolPassword}
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                variant="outlined"
                name="summonerName"
                margin="dense"
                label="Summoner Name"
                onChange={handleChange}
                value={values.summonerName}
              />
            </Grid>
            {user?.roles?.includes("ROLE_BOOSTER") && (
              <Grid xs={12} item>
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
            )}
          </Grid>
          <br></br>
          <Grid
            container
            spacing={3}
            justify="center"
            style={{ marginBottom: "1px" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Save
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
export const AccountInformation = withSnackbar(AccountInformationComponent);
