import AllOutIcon from "@material-ui/icons/AllOut";
import DashboardIcon from "@material-ui/icons/Dashboard";
import React from "react";
import Album from "../component/Album";
import Checkout from "../component/checkout/Checkout";
import Dashboard from "../component/Dashboard";
import Deposits from "../component/Deposits";
import { AdminHome } from "../component/lol/admin/AdminHome";
import { BoosterHome } from "../component/lol/booster/BoosterHome";
import { NewOrders } from "../component/lol/booster/NewOrders";
import { CreateAnOrder } from "../component/lol/user/CreateAnOrder";
import { UserHome } from "../component/lol/user/UserHome";
import { Orders } from "../component/Order";
import Pricing from "../component/pricing";
import { SignIn } from "../component/SignIn";
import { SignUp } from "../component/SignUp";
import { UserList } from "../component/lol/admin/UserList";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { AccountInformation } from "../component/AccountInformation";
import { AdminCreateAnOrder } from "../component/lol/admin/AdminCreateAnOrder";
import { OrderDetails } from "../component/lol/OrderDetails";
import { CreateOrderHome } from "../CreateOrderHome";
import { RatesList } from "../component/lol/admin/RatesList";
export const dashboardRoutes = [
  {
    path: "/signin",
    name: "Sign In",
    icon: <DashboardIcon></DashboardIcon>,
    component: <SignIn></SignIn>,
    layout: "/signin",
  },
  {
    path: "/SignUp",
    name: "SignUp",
    icon: <DashboardIcon></DashboardIcon>,
    component: <SignUp></SignUp>,
    layout: "/signup",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon></DashboardIcon>,
    component: <Dashboard></Dashboard>,
    layout: "/dashboard",
  },
  {
    path: "/admin",
    name: "admin",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Dashboard></Dashboard>,
    layout: "/admin",
  },
  {
    path: "/dashboard/checkout",
    name: "/dashboard/checkout",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Checkout></Checkout>,
    layout: "/admin",
  },
  {
    path: "/",
    name: "/",
    component: <CreateOrderHome></CreateOrderHome>,
    layout: "/",
  },
];
export const secondaryRoutes = [
  {
    path: "/dashboard/checkout",
    name: "/dashboard/checkout",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Checkout></Checkout>,
    layout: "/dashboard/checkout",
  },
  {
    path: "/dashboard/pricing",
    name: "/dashboard/pricing",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Pricing></Pricing>,
    layout: "/dashboard/pricing",
  },
  {
    path: "/dashboard/orders",
    name: "/dashboard/order",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Orders></Orders>,
    layout: "/dashboard/orders",
  },
  {
    path: "/dashboard/album",
    name: "/dashboard/album",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Album></Album>,
    layout: "/dashboard/album",
  },
  {
    path: "/dashboard/deposits",
    name: "/dashboard/deposits",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Deposits></Deposits>,
    layout: "/dashboard/deposits",
  },
  {
    path: "/dashboard/userlist",
    name: "/dashboard/userlist",
    icon: <AllOutIcon></AllOutIcon>,
    component: <UserList></UserList>,
    layout: "/dashboard/userlist",
  },
  {
    path: "/dashboard/ratesList",
    name: "/dashboard/ratesList",
    component: <RatesList></RatesList>,
    layout: "/dashboard/ratesList",
  },
  {
    path: "/dashboard/create-order",
    name: "/dashboard/create-order",
    icon: <AllOutIcon></AllOutIcon>,
    component: <CreateAnOrder></CreateAnOrder>,
    layout: "/dashboard/create-order",
  },
  {
    path: "/dashboard/admin-create-order",
    name: "/dashboard/admin-create-order",
    icon: <AllOutIcon></AllOutIcon>,
    component: <AdminCreateAnOrder></AdminCreateAnOrder>,
    layout: "/dashboard/admin-create-order",
  },
  {
    path: "/dashboard/order-details/:id",
    name: "/dashboard/order-details/:id",
    icon: <AllOutIcon></AllOutIcon>,
    component: <OrderDetails></OrderDetails>,
    layout: "/dashboard/order-details/:id",
  },
  {
    path: "/dashboard/new-orders",
    name: "/dashboard/new-orders",
    icon: <AllOutIcon></AllOutIcon>,
    component: <NewOrders></NewOrders>,
    layout: "/dashboard/new-orders",
  },

  {
    path: "/dashboard/home",
    name: "/dashboard/home",
    icon: <AllOutIcon></AllOutIcon>,
    component: () => {
      const user = JSON.parse(sessionStorage.getItem("user") || "{roles:[]}");
      if (user.roles.includes("ROLE_ADMIN")) {
        return <AdminHome></AdminHome>;
      } else if (user.roles.includes("ROLE_BOOSTER")) {
        return <BoosterHome></BoosterHome>;
      } else {
        return <UserHome></UserHome>;
      }
    },
    layout: "/dashboard/home",
  },
  {
    path: "/dashboard/account-information",
    name: "/dashboard/account-information",
    icon: <SportsEsportsIcon></SportsEsportsIcon>,
    component: () => {
      const user = JSON.parse(sessionStorage.getItem("user") || "{roles:[]}");
      if (user.roles.includes("ROLE_ADMIN")) {
        return <React.Fragment></React.Fragment>;
      } else if (user.roles.includes("ROLE_BOOSTER")) {
        return <React.Fragment></React.Fragment>;
      } else {
        return <AccountInformation></AccountInformation>;
      }
    },
    layout: "/dashboard/account-information",
  },
];
