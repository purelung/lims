import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { dashboard as dashboardRoutes, auth as authRoutes } from "./index";
import { UserContext } from "../contexts/UserContext";

import DashboardLayout from "../layouts/Dashboard";
import LandingLayout from "../layouts/Landing";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";

import ScrollToTop from "../components/ScrollToTop";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={(props) => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      <Route
        key={index}
        path={path}
        exact
        render={(props) => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );

const Routes = () => {
  const { user } = useContext(UserContext);
  const authenticated = user.authToken !== undefined;
  const redirectPath = authenticated ? "/dashboard/default" : "/auth/sign-in";

  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <Redirect to={redirectPath} />
          </Route>

          {/* {childRoutes(LandingLayout, landingRoutes)} */}

          {childRoutes(DashboardLayout, authenticated ? dashboardRoutes : [])}

          {childRoutes(AuthLayout, authRoutes)}

          <Route
            render={() => (
              <AuthLayout>
                <Page404 />
              </AuthLayout>
            )}
          />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default Routes;
