import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import { Badge, Collapse } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { Box } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import { dashboard } from "../routes/index";
import avatar from "../assets/img/avatars/avatar.jpg";

const sidebarRoutes = dashboard.filter((r) => !["Dashboard"].includes(r.name));

const SidebarCategory = withRouter(
  ({
    name,
    badgeColor,
    badgeText,
    icon: Icon,
    isOpen,
    children,
    onClick,
    location,
    to,
  }) => {
    const getSidebarItemClass = (path) => {
      return location.pathname.indexOf(path) !== -1 ||
        (location.pathname === "/" && path === "/dashboard")
        ? "active"
        : "";
    };

    return (
      <li className={"sidebar-item " + getSidebarItemClass(to)}>
        <span
          data-toggle="collapse"
          className={"sidebar-link " + (!isOpen ? "collapsed" : "")}
          onClick={onClick}
          aria-expanded={isOpen ? "true" : "false"}
        >
          <Icon size={18} className="align-middle mr-3" />
          <span className="align-middle">{name}</span>
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className="sidebar-badge">
              {badgeText}
            </Badge>
          ) : null}
        </span>
        <Collapse isOpen={isOpen}>
          <ul id="item" className={"sidebar-dropdown list-unstyled"}>
            {children}
          </ul>
        </Collapse>
      </li>
    );
  }
);

const SidebarItem = withRouter(
  ({ name, badgeColor, badgeText, icon: Icon, location, to }) => {
    const getSidebarItemClass = (path) => {
      return location.pathname === path ? "active" : "";
    };

    return (
      <li className={"sidebar-item " + getSidebarItemClass(to)}>
        <NavLink to={to} className="sidebar-link" activeClassName="active">
          {Icon ? <Icon size={18} className="align-middle mr-3" /> : null}
          {name}
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className="sidebar-badge">
              {badgeText}
            </Badge>
          ) : null}
        </NavLink>
      </li>
    );
  }
);

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle = (index) => {
    // Collapse all elements
    Object.keys(this.state).forEach(
      (item) =>
        this.state[index] ||
        this.setState(() => ({
          [item]: false,
        }))
    );

    // Toggle selected element
    this.setState((state) => ({
      [index]: !state[index],
    }));
  };

  UNSAFE_componentWillMount() {
    /* Open collapse element that matches current url */
    const pathName = this.props.location.pathname;

    sidebarRoutes.forEach((route, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === "/" ? true : false;

      this.setState(() => ({
        [index]: isActive || isOpen || isHome,
      }));
    });
  }

  render() {
    const { sidebar, layout } = this.props;

    return (
      <nav
        className={
          "sidebar" +
          (!sidebar.isOpen ? " toggled" : "") +
          (sidebar.isSticky ? " sidebar-sticky" : "")
        }
      >
        <div className="sidebar-content">
          <PerfectScrollbar>
            <a className="sidebar-brand" href="/">
              <Box className="align-middle text-primary" size={24} />{" "}
              <span className="align-middle">ZeeReporting</span>
            </a>

            <ul className="sidebar-nav">
              {sidebarRoutes.map((category, index) => {
                return (
                  <React.Fragment key={index}>
                    {category.header ? (
                      <li className="sidebar-header">{category.header}</li>
                    ) : null}

                    {category.children ? (
                      <SidebarCategory
                        name={category.name}
                        badgeColor={category.badgeColor}
                        badgeText={category.badgeText}
                        icon={category.icon}
                        to={category.path}
                        isOpen={this.state[index]}
                        onClick={() => this.toggle(index)}
                      >
                        {category.children
                          .filter((c) => c.name !== "Edit User")
                          .map((route, index) => (
                            <SidebarItem
                              key={index}
                              name={route.name}
                              to={route.path}
                              badgeColor={route.badgeColor}
                              badgeText={route.badgeText}
                            />
                          ))}
                      </SidebarCategory>
                    ) : (
                      <SidebarItem
                        name={category.name}
                        to={category.path}
                        icon={category.icon}
                        badgeColor={category.badgeColor}
                        badgeText={category.badgeText}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </ul>

            {/* {!layout.isBoxed && !sidebar.isSticky ? (
              <div className="sidebar-bottom d-none d-lg-block">
                <div className="media">
                  <img
                    className="rounded-circle mr-3"
                    src={avatar}
                    alt="Chris Wood"
                    width="40"
                    height="40"
                  />
                  <div className="media-body">
                    <h5 className="mb-1">Chris Wood</h5>
                    <div>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="text-success"
                      />{" "}
                      Online
                    </div>
                  </div>
                </div>
              </div>
            ) : null} */}
          </PerfectScrollbar>
        </div>
      </nav>
    );
  }
}

export default withRouter(
  connect((store) => ({
    sidebar: store.sidebar,
    layout: store.layout,
  }))(Sidebar)
);
