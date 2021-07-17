import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Rating } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(7),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: "Anonymous",
    price: "0",
    description: ["Reliable service with great professionals"],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Anonymous",
    subheader: "TTTT",
    price: "15",
    description: [
      "Amazing experience could not have asked for better service.",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Anonymous",
    price: "30",
    description: ["Good company and very nice people to work with"],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];

export default function Pricing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container style={{ marginTop: "4rem" }}>
        <Grid item xs={12}>
          <Typography
            component="h5"
            variant="h5"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            CUSTOMERS VOICE
          </Typography>
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            className="secondcolor"
          >
            Excellent 4.80 Rating
          </Typography>
          <Typography
            align="center"
            style={{ color: "white !important", marginTop: ".5rem" }}
          >
            6316 Reviews
          </Typography>
        </Grid>
      </Grid>
      {/* <Parallax
        blur={10}
        bgImage="/images/vlrnt/1/jp/"
        bgImageAlt="the cat"
        strength={200}
      > */}
      <Container maxWidth="md" component="main" style={{ marginTop: "1rem" }}>
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  // subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    {/* <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography> */}
                    {/* <Typography variant="h6">/mo</Typography> */}
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Typography style={{ margin: "auto" }}>
                    <Rating name="read-only" value={4} readOnly />
                  </Typography>

                  {/* <Button fullWidth color="primary">
                    {tier.buttonText}
                  </Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
