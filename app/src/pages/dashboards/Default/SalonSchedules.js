import React from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { enableModernTheme } from "../../../redux/actions/themeActions";


import Projects from "./Projects";
import { render } from "react-dom";

import { MultiSelect } from 'primereact/multiselect';

class SalonSchedules extends React.Component {
 

  render() {
    return (
      <Container fluid className="p-0">
    
    <h1 className="h3 mb-3">Salon Schedules Dashboard</h1>
        
        <Row>
          <Col lg="6" xl="8" className="d-flex">
            <Projects />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect()(SalonSchedules);
