import {
  Collapse,
  createStyles,
  List,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ContactsIcon from "@material-ui/icons/Contacts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import LayersIcon from "@material-ui/icons/Layers";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { SportsEsports } from "@material-ui/icons";
export const AdminListItems = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{roles:[]}");
  return user.roles.includes("ROLE_ADMIN") ? (
    <div>
      <ListItem button component="a" href="/#/dashboard/home">
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </div>
  ) : (
    <div>
      <ListItem button component="a" href="/#/dashboard/home">
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component="a" href="/#/dashboard/checkout">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Checkout" />
      </ListItem>
      <ListItem button component="a" href="/#/dashboard/pricing">
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Pricing" />
      </ListItem>
      <ListItem button component="a" href="/#/dashboard/album">
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Album" />
      </ListItem>{" "}
      <ListItem button component="a" href="/#/dashboard/deposits">
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="Deposits" />
      </ListItem>
    </div>
  );
};
export const MainListItems = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{roles:[]}");
  return (
    <React.Fragment>
      {user.roles.includes("ROLE_ADMIN") && (
        <div>
          <ListItem button component="a" href="/#/dashboard/home">
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button component="a" href="/#/dashboard/admin-create-order">
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Create Order" />
          </ListItem>
        </div>
      )}
      {user.roles.includes("ROLE_BOOSTER") && (
        <div>
          <ListItem button component="a" href="/#/dashboard/home">
            <ListItemIcon>
              <BookmarkBorderIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {/* <ListItem button component="a" href="/#/dashboard/new-orders">
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="New Orders" />
          </ListItem> */}
          {
            <ListItem
              button
              component="a"
              href="/#/dashboard/account-information"
            >
              <ListItemIcon>
                <SportsEsports />
              </ListItemIcon>
              <ListItemText primary="Account Info" />
            </ListItem>
          }
        </div>
      )}
      {user.roles.includes("ROLE_USER") && (
        <div>
          <ListItem button component="a" href="/#/dashboard/home">
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component="a" href="/#/dashboard/create-order">
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Create Order" />
          </ListItem>
          {/* <ListItem
            button
            component="a"
            href="/#/dashboard/account-information"
          >
            <ListItemIcon>
              <SportsEsports />
            </ListItemIcon>
            <ListItemText primary="Account Info" />
          </ListItem> */}
        </div>
      )}
      {/* <ListItem button component="a" href="/#/dashboard/checkout">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Checkout" />
      </ListItem>
      <ListItem button component="a" href="/#/dashboard/pricing">
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Pricing" />
      </ListItem>
      <ListItem button component="a" href="/#/dashboard/album">
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Album" />
      </ListItem>{" "}
      <ListItem button component="a" href="/#/dashboard/deposits">
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="Deposits" />
      </ListItem>
   */}
    </React.Fragment>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);
export const SecondaryListItems = () => {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const classes = useStyles();
  const user = JSON.parse(sessionStorage.getItem("user") || "{roles:[]}");

  return (
    <>
      {user.roles.includes("ROLE_ADMIN") && (
        <div>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                component="a"
                href="/#/dashboard/userList"
              >
                <ListItemIcon>
                  <ContactsIcon />
                </ListItemIcon>
                <ListItemText primary="User List" />
              </ListItem>
            </List>
          </Collapse>
        </div>
      )}
    </>
  );
};
