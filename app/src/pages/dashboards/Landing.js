import React, { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { LineChart, Header, Feed } from "../../components";
import { useQuery } from "react-query";
import { zeeFetch, fetchOptions } from "../../utilities/fetchHelper";
import { UserContext } from "../../contexts/UserContext";

const Landing = ({}) => {
  const queryPath = "announcements";
  const { user } = useContext(UserContext);
  const {
    isLoading,
    isFetching,
    error,
    data: announcements,
  } = useQuery(queryPath, () => zeeFetch(user.authToken, queryPath), {
    ...fetchOptions,
  });

  return (
    <Container fluid className="p-0">
      <Header />
      <Row>
        <Col lg="8" className="d-flex">
          <LineChart />
        </Col>
        <Col lg="4" className="d-flex">
          <Feed items={announcements ?? []} />
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
