import React from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { enableModernTheme } from "../../../redux/actions/themeActions";

import BarChart from "./BarChart";
import Projects from "./Projects";
import { render } from "react-dom";

class EmployeeMetrics extends React.Component {
 

  render() {
    return (
      <Container fluid className="p-0">
    
    <h1 className="h3 mb-3">Employee Metrics Dashboard</h1>
        
        <Row>
          <Col lg="10" xl="8" className="d-flex">
            <Projects />
          </Col>
     
        </Row>
      </Container>
    );
  }
}

export default connect()(EmployeeMetrics);
