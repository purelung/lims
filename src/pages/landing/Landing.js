import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { enableClassicTheme } from "../../redux/actions/themeActions";

import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Media,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Row
} from "reactstrap";

import {
  Box,
  Chrome,
  Code,
  DownloadCloud,
  Mail,
  Sliders,
  Smartphone
} from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import screenshotDashboardDefaultLarge from "../../assets/img/screenshots/dashboard-default-large.png";
import screenshotDashboardAnalyticsLarge from "../../assets/img/screenshots/dashboard-analytics-large.png";

import screenshotDashboardDefault from "../../assets/img/screenshots/dashboard-default.png";
import screenshotDashboardAnalytics from "../../assets/img/screenshots/dashboard-analytics.png";
import screenshotDashboardEcommerce from "../../assets/img/screenshots/dashboard-e-commerce.png";
import screenshotDashboardSocial from "../../assets/img/screenshots/dashboard-social.png";
import screenshotDashboardCrypto from "../../assets/img/screenshots/dashboard-crypto.png";
import screenshotPageProjects from "../../assets/img/screenshots/pages-projects-list.png";

import screenshotThemeClassic from "../../assets/img/screenshots/theme-classic.png";
import screenshotThemeModern from "../../assets/img/screenshots/theme-modern.png";
import screenshotThemeCorporate from "../../assets/img/screenshots/theme-corporate.png";

import brandBootstrap from "../../assets/img/brands/bootstrap.svg";
import brandBootstrapB from "../../assets/img/brands/b.svg";
import brandSass from "../../assets/img/brands/sass.svg";
import brandWebpack from "../../assets/img/brands/webpack.svg";
import brandNpm from "../../assets/img/brands/npm.svg";
import brandReact from "../../assets/img/brands/react.svg";
import brandRedux from "../../assets/img/brands/redux.svg";

const Navigation = () => (
  <Navbar dark expand className="navbar-landing">
    <NavbarBrand href="/">
      <Box title="AppStack" />
      AppStack
    </NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem className="d-none d-md-inline-block">
        <NavLink href="/dashboard/default" target="_blank" active>
          Preview
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/docs/introduction" target="_blank" active>
          Docs
        </NavLink>
      </NavItem>
      <NavItem className="d-none d-md-inline-block">
        <NavLink href="mailto:support@bootlab.io" active>
          Support
        </NavLink>
      </NavItem>
    </Nav>
    <Button
      href="https://themes.getbootstrap.com/product/appstack-react-admin-dashboard-template/"
      target="_blank"
      rel="noopener noreferrer"
      color="primary"
      className="ml-2"
    >
      Purchase
    </Button>
  </Navbar>
);

const Intro = () => (
  <section className="landing-intro pt-5">
    <Container>
      <Row>
        <Col md="12" lg="9" xl="12" className="mx-auto">
          <Row>
            <Col xl="5">
              <Box title="AppStack" className="landing-intro-brand" />

              <h1 className="text-white my-4 font-weight-normal">
                Start creating the best possible user experience for your
                customers.
              </h1>

              <p className="text-muted lead">
                A professional package that comes with plenty of UI components,
                forms, tables, charts, dashboards, pages and svg icons. Each one
                is fully customizable, responsive and easy to use.
              </p>

              <div className="my-4">
                <Button
                  tag={Link}
                  to="/dashboard/default"
                  color="light"
                  size="lg"
                  className="mr-2"
                  target="_blank"
                >
                  Demo
                </Button>
                <Button
                  color="light"
                  size="lg"
                  outline
                  href="https://themes.getbootstrap.com/product/appstack-react-admin-dashboard-template/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Purchase
                </Button>
              </div>

              <div className="my-5">
                <div className="d-inline-block mr-3">
                  <h2 className="text-white">500+</h2>
                  <span className="text-muted">UI Components</span>
                </div>
                <div className="d-inline-block mr-3">
                  <h2 className="text-white">1500+</h2>
                  <span className="text-muted">SVG Icons</span>
                </div>
                <div className="d-inline-block">
                  <h2 className="text-white">45+</h2>
                  <span className="text-muted">Demo Pages</span>
                </div>
              </div>

              <div className="my-5">
                <img
                  src={brandBootstrap}
                  alt="Bootstrap"
                  width="40"
                  className="align-middle mr-2"
                />
                <img
                  src={brandSass}
                  alt="Sass"
                  width="40"
                  className="align-middle mr-2"
                />
                <img
                  src={brandWebpack}
                  alt="Webpack"
                  width="40"
                  className="align-middle mr-2"
                />
                <img
                  src={brandNpm}
                  alt="NPM"
                  width="40"
                  className="align-middle mr-2"
                />
                <img
                  src={brandReact}
                  alt="React"
                  width="40"
                  className="align-middle mr-2"
                />
                <img
                  src={brandRedux}
                  alt="Redux"
                  width="36"
                  className="align-middle mr-2"
                />
              </div>
            </Col>
            <Col xl="6" className="ml-auto d-none d-xl-block">
              <div className="landing-intro-img">
                <img
                  src={screenshotDashboardDefaultLarge}
                  className="landing-intro-img-default img-fluid"
                  alt="Dashboard Default"
                />
                <img
                  src={screenshotDashboardAnalyticsLarge}
                  className="landing-intro-img-analytics img-fluid"
                  alt="Dashboard Analytics"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

const Styles = () => (
  <section className="py-6">
    <Container>
      <Row>
        <Col md="12" className="mx-auto text-center">
          <Row>
            <Col lg="10" xl="9" className="mx-auto">
              <div className="mb-4">
                <h2 className="mb-3">Multiple Layouts</h2>
                <p className="text-muted font-size-lg">
                  3 Pre-built color schemes available to make this template your
                  very own. All the color schemes can take variation in color
                  and styling, that can easily be modified using Sass variables.
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md="4" className="py-3">
              <Link
                to="/layouts/theme-classic"
                target="_blank"
                className="d-block mb-3 shadow-lg"
              >
                <img
                  src={screenshotThemeClassic}
                  alt="Classic Bootstrap 4 ReactJS Dashboard Theme"
                  className="img-fluid rounded-lg landing-img"
                />
              </Link>
              <h4>Classic</h4>
            </Col>

            <Col md="4" className="py-3">
              <Link
                to="/layouts/theme-modern"
                target="_blank"
                className="d-block mb-3 shadow-lg"
              >
                <img
                  src={screenshotThemeModern}
                  alt="Modern Bootstrap 4 ReactJS Dashboard Theme"
                  className="img-fluid rounded-lg landing-img"
                />
              </Link>
              <h4>
                Modern{" "}
                <sup>
                  <Badge color="primary" tag="small">
                    New
                  </Badge>
                </sup>
              </h4>
            </Col>

            <Col md="4" className="py-3">
              <Link
                to="/layouts/theme-corporate"
                target="_blank"
                className="d-block mb-3 shadow-lg"
              >
                <img
                  src={screenshotThemeCorporate}
                  alt="Corporate Bootstrap 4 ReactJS Dashboard Theme"
                  className="img-fluid rounded-lg landing-img"
                />
              </Link>
              <h4>
                Corporate{" "}
                <sup>
                  <Badge color="primary" tag="small">
                    New
                  </Badge>
                </sup>
              </h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

const Dashboards = () => (
  <section className="py-6 bg-white">
    <Container>
      <Row>
        <Col md="12" className="mx-auto text-center">
          <Row>
            <Col lg="10" xl="9" className="mx-auto">
              <div className="mb-4">
                <h2 className="mb-3">Multiple Dashboards</h2>
                <p className="text-muted font-size-lg">
                  5 Dashboards and 40+ Pages featuring various components,
                  giving you the freedom of choosing and combining. All
                  components can take variation in color and styling, that can
                  easily be modified using Sass.
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md="6" lg="4" className="py-3">
              <Link
                to="/dashboard/default"
                target="_blank"
                className="d-block mb-3 shadow-lg"
              >
                <img
                  src={screenshotDashboardDefault}
                  alt="Bootstrap 4 Dashboard Theme"
                  className="img-fluid rounded-lg landing-img"
                />
              </Link>
              <h4>Default Dashboard</h4>
            </Col>
            <Col md="6" lg="4" className="py-3">
              <Link
                to="/dashboard/analytics"
                target="_blank"
                className="d-block mb-3 shadow-lg"
              >
                <img
                  src={screenshotDashboardAnalytics}
                  alt="Analytics Bootstrap 4 Dashboard Theme"
                  className="img-fluid rounded-lg landing-img"
                />
              </Link>
              <h4>Analytics Dashboard</h4>
            </Col>
            <Col md="6" lg="4" className="py-3">
              <Link
                to="/dashboard/e-commerce"
                target="_blank"
                className="d-block mb-3 shadow-lg"
              >
                <img
                  src={screenshotDashboardEcommerce}
                  alt="E-commerce Bootstrap 4 Dashboard Theme"
                  className="img-fluid rounded-lg landing-img"
                />
              </Link>
              <h4>E-commerce Dashboard</h4>
            </Col>
            <Col md="6" lg="4" className="py-3">
              <Link
                to="/dashboard/social"
                target="_blank"
                className="d-block mb-3 shadow-lg"
              >
                <img
                  src={screenshotDashboardSocial}
                  alt="Social Bootstrap 4 Dashboard Theme"
                  className="img-fluid rounded-lg landing-img"
                />
              </Link>
              <h4>Social Dashboard</h4>
            </Col>
            <Col md="6" lg="4" className="py-3">
              <Link
                to="/dashboard/crypto"
                target="_blank"
                className="d-block mb-3 shadow-lg"
              >
                <img
                  src={screenshotDashboardCrypto}
                  alt="Crypto Bootstrap 4 Dashboard Theme"
                  className="img-fluid rounded-lg landing-img"
                />
              </Link>
              <h4>
                Crypto Dashboard{" "}
                <sup>
                  <Badge color="primary" tag="small">
                    New
                  </Badge>
                </sup>
              </h4>
            </Col>
            <Col md="6" lg="4" className="py-3">
              <Link
                to="/pages/projects"
                target="_blank"
                className="d-block mb-3 shadow-lg"
              >
                <img
                  src={screenshotPageProjects}
                  alt="Projects Bootstrap 4 Dashboard Theme"
                  className="img-fluid rounded-lg landing-img"
                />
              </Link>
              <h4>
                Projects Page{" "}
                <sup>
                  <Badge color="primary" tag="small">
                    New
                  </Badge>
                </sup>
              </h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

const Features = () => (
  <section className="py-6">
    <Container>
      <Row>
        <Col md="10" className="mx-auto text-center">
          <div className="mb-5">
            <h2>Features you'll love</h2>
            <p className="text-muted text-lg">
              A responsive dashboard built for everyone who wants to create
              webapps on top of Bootstrap.
            </p>
          </div>

          <Row className="text-left">
            <Col md="6">
              <Media className="py-3">
                <div className="landing-feature">
                  <Sliders />
                </div>
                <Media body>
                  <h4 className="mt-0">Customizable</h4>
                  <p className="font-size-lg">
                    You don't need to be an expert to customize our themes. Our
                    code is very readable and well documented.
                  </p>
                </Media>
              </Media>
            </Col>
            <Col md="6">
              <Media className="py-3">
                <div className="landing-feature">
                  <Smartphone />
                </div>
                <Media body>
                  <h4 className="mt-0">Fully Responsive</h4>
                  <p className="font-size-lg">
                    With mobile, tablet & desktop support it doesn't matter what
                    device you're using. AdminKit is responsive in all browsers.
                  </p>
                </Media>
              </Media>
            </Col>
            <Col md="6">
              <Media className="py-3">
                <div className="landing-feature">
                  <Mail />
                </div>
                <Media body>
                  <h4 className="mt-0">Quick Support</h4>
                  <p className="font-size-lg">
                    Our themes are supported by specialists who provide quick
                    and effective support. Usually an email reply takes &lt;24h.
                  </p>
                </Media>
              </Media>
            </Col>
            <Col md="6">
              <Media className="py-3">
                <div className="landing-feature">
                  <Chrome />
                </div>
                <Media body>
                  <h4 className="mt-0">Cross Browser</h4>
                  <p className="font-size-lg">
                    Our themes are working perfectly with: Chrome, Firefox,
                    Safari, Opera and IE 10+. We're working hard to support
                    them.
                  </p>
                </Media>
              </Media>
            </Col>
            <Col md="6">
              <Media className="py-3">
                <div className="landing-feature">
                  <Code />
                </div>
                <Media body>
                  <h4 className="mt-0">Clean Code</h4>
                  <p className="font-size-lg">
                    We strictly follow Bootstrap's guidelines to make your
                    integration as easy as possible. All code is handwritten.
                  </p>
                </Media>
              </Media>
            </Col>
            <Col md="6">
              <Media className="py-3">
                <div className="landing-feature">
                  <i data-feather="download-cloud"></i>
                  <DownloadCloud />
                </div>
                <Media body>
                  <h4 className="mt-0">Regular Updates</h4>
                  <p className="font-size-lg">
                    From time to time you'll receive an update containing new
                    components, improvements and bugfixes.
                  </p>
                </Media>
              </Media>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

const Testimonials = () => (
  <section className="py-6 bg-white">
    <Container>
      <div className="mb-5 text-center">
        <h2>Developers love AppStack</h2>
        <p className="text-muted text-lg">
          Here's what some of our 2,500 customers have to say about working with
          our products.
        </p>
      </div>

      <Row>
        <Col md={6} lg={4}>
          <Card tag="blockquote" className="border">
            <CardBody className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <img
                    src={brandBootstrapB}
                    width="48"
                    height="48"
                    alt="Bootstrap"
                  />
                </div>
                <div className="pl-3">
                  <h5 className="mb-1 mt-2">Nikita</h5>
                  <small className="d-block text-muted h5 font-weight-normal">
                    Bootstrap Themes
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                “We are totally amazed with a simplicity and the design of the
                template. Probably saved us hundreds of hours of development. We
                are absolutely amazed with the support Bootlab has provided us.”
              </p>

              <div className="landing-stars">
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card tag="blockquote" className="border">
            <CardBody className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <img
                    src={brandBootstrapB}
                    width="48"
                    height="48"
                    alt="Bootstrap"
                  />
                </div>
                <div className="pl-3">
                  <h5 className="mb-1 mt-2">Alejandro</h5>
                  <small className="d-block text-muted h5 font-weight-normal">
                    Bootstrap Themes
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                “Everything is so properly set up that any new additions I'd
                make would feel like a native extension of the theme versus a
                simple hack. I definitely feel like this will save me hundredths
                of hours I'd otherwise spend on designing.”
              </p>

              <div className="landing-stars">
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card tag="blockquote" className="border">
            <CardBody className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <img
                    src={brandBootstrapB}
                    width="48"
                    height="48"
                    alt="Bootstrap"
                  />
                </div>
                <div className="pl-3">
                  <h5 className="mb-1 mt-2">Jordi</h5>
                  <small className="d-block text-muted h5 font-weight-normal">
                    Bootstrap Themes
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                “I ran into a problem and contacted support. Within 24 hours, I
                not only received a response but even an updated version that
                solved my problem and works like a charm. Fantastic customer
                service!”
              </p>

              <div className="landing-stars">
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card tag="blockquote" className="border">
            <CardBody className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <img
                    src={brandBootstrapB}
                    width="48"
                    height="48"
                    alt="Bootstrap"
                  />
                </div>
                <div className="pl-3">
                  <h5 className="mb-1 mt-2">Jason</h5>
                  <small className="d-block text-muted h5 font-weight-normal">
                    Bootstrap Themes
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                “As a DB guy, this template has made my life easy porting over
                an old website to a new responsive version. I can focus more on
                the data and less on the layout.”
              </p>

              <div className="landing-stars">
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card tag="blockquote" className="border">
            <CardBody className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <img
                    src={brandBootstrapB}
                    width="48"
                    height="48"
                    alt="Bootstrap"
                  />
                </div>
                <div className="pl-3">
                  <h5 className="mb-1 mt-2">Richard</h5>
                  <small className="d-block text-muted h5 font-weight-normal">
                    Bootstrap Themes
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                “This template was just what we were after; its modern, works
                perfectly and is visually beautiful , we couldn't be happier.
                The support really is excellent, I look forward to working with
                these guys for a long time to come!”
              </p>

              <div className="landing-stars">
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card tag="blockquote" className="border">
            <CardBody className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <img
                    src={brandBootstrapB}
                    width="48"
                    height="48"
                    alt="Bootstrap"
                  />
                </div>
                <div className="pl-3">
                  <h5 className="mb-1 mt-2">Martin</h5>
                  <small className="d-block text-muted h5 font-weight-normal">
                    Bootstrap Themes
                  </small>
                </div>
              </div>
              <p className="lead mb-2">
                “I just began to test and use this theme and I can find that it
                cover my expectatives. Good support from the developer.”
              </p>

              <div className="landing-stars">
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />{" "}
                <FontAwesomeIcon icon={faStar} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
);

const Footer = () => (
  <section className="py-5">
    <Container className="text-center">
      <Row>
        <Col md="9" lg="8" xl="6" className="mx-auto">
          <h2 className="h1 mb-3">
            Join over 2,500 developers who are already working with our products
          </h2>
          <Button
            color="primary"
            size="lg"
            href="https://themes.getbootstrap.com/product/appstack-react-admin-dashboard-template/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Purchase
          </Button>
        </Col>
      </Row>
    </Container>
  </section>
);

class Landing extends React.Component {
  UNSAFE_componentWillMount() {
    const { dispatch } = this.props;
    dispatch(enableClassicTheme());
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Intro />
        <Styles />
        <Dashboards />
        <Features />
        <Testimonials />
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect()(Landing);
