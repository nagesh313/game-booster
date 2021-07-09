import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import axios from "axios";
import { withSnackbar } from "notistack";
import React, { useEffect } from "react";
import { failureToast } from "../../../util/util";
import { Placements } from "./create-order/Placements";
import { RankBoosting } from "./create-order/RankBoosting";
import { WinBoosting } from "./create-order/WinBoosting";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      item
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{ overflow: "none" }}
      {...other}
    >
      {value === index && (
        <Grid item xs={12}>
          {children}
        </Grid>
      )}
    </Grid>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function AdminCreateAnOrderComponent(props: any) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [ratesList, setRatesList] = React.useState<any>([]);
  const [boosterList, setBoosterList] = React.useState<any>([]);
  const [usersList, setUsersList] = React.useState<any>([]);

  const [serversList, setServersList] = React.useState<any>([]);
  const [desiredRanksList, setDesiredRanksList] = React.useState<any>([]);
  const [currentRanksList, setCurrentRanksList] = React.useState<any>([]);

  const fetchServerList = () => {
    axios
      .get("/api/v1/config/servers")
      .then((response: any) => {
        setServersList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const fetchRanksList = () => {
    axios
      .get("/api/v1/config/ranks")
      .then((response: any) => {
        const currentRankList = [...response.data];
        const desiredRankList = [...response.data];

        currentRankList.splice(currentRankList.length - 1, 1);
        desiredRankList.splice(0, 1);
        setCurrentRanksList(currentRankList);
        setDesiredRanksList(desiredRankList);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const fetchRatesList = () => {
    axios
      .get("/api/v1/config/rates")
      .then((response: any) => {
        setRatesList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const fetchBoosterList = () => {
    axios
      .get("/api/v1/admin/boosters")
      .then((response: any) => {
        setBoosterList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  const fetchUserList = () => {
    axios
      .get("/api/v1/admin/users")
      .then((response: any) => {
        setUsersList(response.data);
      })
      .catch((reponse: any) => {
        props.enqueueSnackbar(reponse.error, failureToast);
      });
  };
  useEffect(() => {
    fetchServerList();
    fetchRanksList();
    fetchRatesList();
    fetchBoosterList();
    fetchUserList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  console.log(ratesList);
  return (
    <React.Fragment>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Rank Boosting" {...a11yProps(0)} />
          <Tab label="Placements" {...a11yProps(1)} />
          <Tab label="Win Boosting" {...a11yProps(2)} />
        </Tabs>
      </AppBar>{" "}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <RankBoosting
              desiredRanksList={desiredRanksList}
              currentRanksList={currentRanksList}
              serversList={serversList}
              boosterList={boosterList}
              usersList={usersList}
            ></RankBoosting>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Placements
              desiredRanksList={desiredRanksList}
              currentRanksList={currentRanksList}
              serversList={serversList}
              boosterList={boosterList}
              usersList={usersList}
            ></Placements>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <WinBoosting
              desiredRanksList={desiredRanksList}
              currentRanksList={currentRanksList}
              serversList={serversList}
              boosterList={boosterList}
              usersList={usersList}
            ></WinBoosting>
          </TabPanel>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export const AdminCreateAnOrder = withSnackbar(AdminCreateAnOrderComponent);
