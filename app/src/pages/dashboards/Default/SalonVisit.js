import React from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { enableModernTheme } from "../../../redux/actions/themeActions";

import BarChart from "./BarChart";
import Calendar from "./Calendar";
import Feed from "./Feed";
import Header from "./Header";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import Projects from "./Projects";
import Statistics from "./Statistics";
import { render } from "react-dom";

class SalonVisit extends React.Component {
  UNSAFE_componentWillMount() {
    const { dispatch } = this.props;
    dispatch(enableModernTheme());
  }

  render() {
    return (
      <Container fluid className="p-0">
        <Header />
        <Statistics />
        
        <Row>
          <Col lg="6" xl="8" className="d-flex">
            <Projects />
          </Col>
          <Col lg="6" xl="4" className="d-flex">
            <BarChart />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect()(SalonVisit);
