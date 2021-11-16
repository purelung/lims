import async from "../components/Async";

import {
  PieChart as PieChartIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon,
} from "react-feather";

// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Dashboards
const Landing = async(() => import("../pages/dashboards/Landing"));
const SalonMetrics = async(() => import("../pages/dashboards/SalonMetrics"));
const MetricsDetail = async(() => import("../pages/dashboards/MetricsDetail"));
const EmployeeMetrics = async(() =>
  import("../pages/dashboards/EmployeeMetrics")
);
const SalonSchedules = async(() =>
  import("../pages/dashboards/SalonSchedules")
);

// Reports
const SalonRankings = async(() => import("../pages/reports/SalonRankings"));
const EmployeeRankings = async(() =>
  import("../pages/reports/EmployeeRankings")
);
const BusinessPerformance = async(() =>
  import("../pages/reports/BusinessPerformance")
);
const ScheduleAudit = async(() => import("../pages/reports/ScheduleAudit"));
const AVGGuests = async(() => import("../pages/reports/AVGGuests"));

// Store Admin
const Users = async(() => import("../pages/store-admin/users"));
const AddUser = async(() => import("../pages/store-admin/add-user"));

const dashboardRoutes = (user) => {
  return {
    path: "/dashboard",
    name: "Dashboards",
    header: "Pages",
    icon: SlidersIcon,
    containsHome: true,
    children: [
      {
        path: "/dashboard/default",
        name: "Home",
        hidden: true,
        component: Landing,
      },

      {
        path: "/dashboard/salon-metrics",
        name: "Salon Metrics",
        component: SalonMetrics,
      },
      {
        path: "/dashboard/metrics-detail",
        name: "Metrics Detail",
        authorized: user.userRoleId > 3,
        component: MetricsDetail,
      },
      {
        path: "/dashboard/employee-metrics",
        name: "Employee Metrics",
        authorized: user.userRoleId > 3,
        component: EmployeeMetrics,
      },
      {
        path: "/dashboard/salon-schedules",
        name: "Salon Schedules",
        component: SalonSchedules,
      },
    ],
  };
};

const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  badgeColor: "secondary",
  badgeText: "Special",
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
};

const reportRoutes = (user) => {
  return {
    path: "/reports",
    name: "Reports",
    icon: PieChartIcon,
    children: [
      {
        path: "/reports/avg-guests",
        name: "Average Guests",
        component: AVGGuests,
      },
      {
        path: "/reports/business-performance",
        name: "Business Performance",
        component: BusinessPerformance,
      },
      {
        path: "/reports/employee-rankings",
        name: "Employee Rankings",
        component: EmployeeRankings,
      },
      {
        path: "/reports/salon-rankings",
        name: "Salon Rankings",
        component: SalonRankings,
      },
      {
        path: "/reports/schedule-audit",
        name: "Schedule Audit",
        component: ScheduleAudit,
      },
    ],
  };
};

const storeAdminRoutes = (user) => {
  return {
    path: "/store-admin",
    name: "Store Admin",
    authorized: user.userRoleId > 3,
    icon: UsersIcon,
    children: [
      {
        path: "/store-admin/users",
        name: "Manage Users",
        component: Users,
      },
      {
        path: "/store-admin/add-user",
        name: "Add User",
        component: AddUser,
      },
      {
        path: "/store-admin/edit-user",
        name: "Edit User",
        component: AddUser,
      },
    ],
  };
};

// Dashboard specific routes (these get rendered on sidebar except for dashboard)
export const getSidebarRoutes = (user) => {
  return getAuthorizedRoutes(user)
    .filter((cat) => !cat.hidden)
    .map((cat) => {
      return {
        ...cat,
        children: cat.children.filter((subCat) => !subCat.hidden),
      };
    });
};

export const getAuthorizedRoutes = (user) => {
  const temp = [
    dashboardRoutes(user),
    reportRoutes(user),
    storeAdminRoutes(user),
  ];

  return temp
    .filter((cat) => !cat.authorized)
    .map((cat) => {
      return {
        ...cat,
        children: cat.children.filter((subCat) => !subCat.authorized),
      };
    });
};

// Auth specific routes for route guard redirect
export const getAuthRoutes = () => {
  return [authRoutes];
};
