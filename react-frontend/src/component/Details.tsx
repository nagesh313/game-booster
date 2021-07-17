import { Grid } from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import LocalPlayIcon from "@material-ui/icons/LocalPlay";
import React from "react";
import { DetailCard } from "./DetailCard";
const header1 = "+10 Years of Expertise in LOL boosting";
const header2 = "Challenger LOL ELO boosting team";
const header3 = "Best & Highly Customizable ELO boosting experience";
const text1 =
  "BoostRoyal has been operating in the lol elo boost market for more than five years. Throughout this time the company amassed an incredible amount of experience in elo boosting. We continue to gather experience to this day and continue to improve our lol boost services to stay ahead of the competition in all aspects of the services that we provide. Every new buyer and new order adds to this experience and helps our organization to grow and perform even better in the future. Staying customer oriented and being agile to the different changes in the lol elo boosting environment is a crucial factor for our success.";
const text2 =
  "The company is known for employing the top LoL boosters, who are playing at the highest levels of the game. The minimum requirement to boost at BoostRoyal, is reaching the challenger tier and high prior experience in lol boosting. By employing and managing the best lol boosting team available, we are able to provide the highest win-rates and top quality performances. To make this possible, we never stop manage our lol boosters, who have to go through a strict selection process. By having increased control over the lol elo booster team, it allows us to get the most performance out of our players and provide a seamless boosting experience for all of our users.";
const text3 =
  "We provide the widest range of lol elo boosting related services in the boosting industry. Our service portfolio is designed with the ultimate goal of providing maximum user satisfaction. We believe, that having a high number of services are required in the field of lol elo boosting as each LoL player has different goals in the game. To help in reaching these goals, BoostRoyal does not only offer a high selection of different lol elo boosting methods, such as solo queue, duoe queue or placement matches, but additional customizability features for each of these boost types. We offer add-on options, such as priority delivery, specific champions or coaching.";
const icon1 = <AcUnitIcon style={{ fontSize: "60" }}></AcUnitIcon>;
const icon2 = <EmojiEventsIcon style={{ fontSize: "60" }}> </EmojiEventsIcon>;
const icon3 = <LocalPlayIcon style={{ fontSize: "60" }}></LocalPlayIcon>;

export function Details() {
  return (
    <Grid container spacing={4} style={{ marginTop: "4rem" }}>
      <Grid item xs={12} md={4}>
        <DetailCard header={header1} text={text1} icon={icon1}></DetailCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <DetailCard header={header2} text={text2} icon={icon2}></DetailCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <DetailCard header={header3} text={text3} icon={icon3}></DetailCard>
      </Grid>
    </Grid>
  );
}
