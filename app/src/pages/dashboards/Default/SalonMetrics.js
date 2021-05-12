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

import { MultiSelect } from 'primereact/multiselect';


const citySelectItems = [
  {label: 'New York', value: 'NY'},
  {label: 'Rome', value: 'RM'},
  {label: 'London', value: 'LDN'},
  {label: 'Istanbul', value: 'IST'},
  {label: 'Paris', value: 'PRS'}
];
const cities = [
  {name: 'New York', code: 'NY'},
  {name: 'Rome', code: 'RM'},
  {name: 'London', code: 'LDN'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Paris', code: 'PRS'}
];


class SalonMetrics extends React.Component {

  
  render() {
    return (
      <Container fluid className="p-0">
    
    <h1 className="h3 mb-3">Salon Metrics Dashboard</h1>
    <Row className="mb-2 mb-xl-4">
      <Col xs="auto" className="d-none d-sm-block">
        
      </Col>
      
 
    </Row>
        
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

export default connect()(SalonMetrics);
