//import Dashboard from "views/Dashboard.jsx";

import Users from "./Users/Index";
import Teams from "./Teams/Index";
import Match from "./Match/Index";

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "pe-7s-graph",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  {
    path: "/users",
    name: "Users",
    icon: "fas fa-user",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/teams",
    name: "Teams",
    icon: "fas fa-users",
    component: Teams,
    layout: "/admin"
  },
  {
    path: "/match",
    name: "Match",
    icon: "fas fa-golf-ball",
    component: Match,
    layout: "/admin"
  }
];
export default dashboardRoutes;