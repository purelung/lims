import React, { useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { LineChart, Header, Feed } from "../../components";
import { useQuery } from "react-query";
import { zeeFetch, fetchOptions } from "../../utilities/fetchHelper";
import { UserContext } from "../../contexts/UserContext";

const Landing = ({}) => {
  const { user } = useContext(UserContext);
  const { data: announcements } = useQuery(
    "announcements",
    () => zeeFetch(user.authToken, "announcements"),
    {
      ...fetchOptions,
    }
  );

  const { data: revenues } = useQuery(
    "revenues",
    () => zeeFetch(user.authToken, "revenues"),
    {
      ...fetchOptions,
    }
  );

  const compareMonthYear = (as, bs) => {
    const getMonth = (s) => {
      return Number(s.slice(0, -5));
    };

    const a = getMonth(as.MonthYear);
    const b = getMonth(bs.MonthYear);

    if (a > b) return 1;
    if (b > a) return -1;

    return 0;
  };

  const getDataSet = (revenue, label, num) => {
    const yearRevenue = revenue
      ?.filter((r) => r.Year === num)
      .sort(compareMonthYear);

    return {
      label,
      data: yearRevenue?.map((r) => r.Revenue),
    };
  };

  const thisYearData = getDataSet(revenues, "This Year", 1);
  const lastYearData = getDataSet(revenues, "Last Year", 0);

  return (
    <Container fluid className="p-0">
      <Header />
      <Row>
        <Col lg="8" className="d-flex">
          <LineChart dataSet1={thisYearData} dataSet2={lastYearData} />
        </Col>
        <Col lg="4" className="d-flex">
          <Feed items={announcements ?? []} />
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
