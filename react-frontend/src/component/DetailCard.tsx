import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
export function DetailCard(props: any) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent style={{ textAlign: "left" }}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.icon}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.header}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          &nbsp;
        </Typography>
        <Typography variant="body2" component="p">
          {props.text}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
