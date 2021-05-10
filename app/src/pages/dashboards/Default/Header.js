import React, { useContext } from "react";

import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown
} from "reactstrap";

import { Calendar, Filter, RefreshCw } from "react-feather";
import { UserContext } from "../../../contexts/UserContext";


const Header = () => {
  const { user, setUserData } = useContext(UserContext);
  return (
    <Row className="mb-2 mb-xl-4">
      <Col xs="auto" className="d-none d-sm-block">
        <h3>Welcome back, {user.name}</h3>
      </Col>
      
 
    </Row>
  );
};

export default Header;
