import React, { useState, forwardRef, useEffect } from "react";
import { Children } from "react";
import { QueryReport } from "../../components/QueryReport";
import { unique } from "../../utilities/listHelper";
import { Row, Col } from "reactstrap";
import styled from "styled-components";

const WeekCol = styled(Col)`
  .chosen {
    color: blue;
  }
`;

const WeekDiv = styled.div`
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  :hover {
    color: blue;
  }
  :active {
    color: lightblue;
  }
`;

const ScheduleTabs = ({ weeks, setWeek, activeWeek }) => {
  const orderedWeeks = weeks
    .map((w) => ({ text: w, date: Date.parse(w.replace("Week Ending ", "")) }))
    .sort((a, b) => a.date - b.date);

  const setDefaultWeek = () => {
    setWeek(orderedWeeks[0].text);
  };

  useEffect(() => {
    setDefaultWeek();
  }, []);

  return (
    <Row style={{ padding: 13, marginBottom: 10 }}>
      {orderedWeeks.map((w) => (
        <WeekCol
          key={w.text}
          onClick={() => setWeek(w.text)}
          className="px-1 py-1"
        >
          <WeekDiv className={activeWeek === w.text ? "chosen" : ""}>
            {w.text}
          </WeekDiv>
        </WeekCol>
      ))}
    </Row>
  );
};

const childPropsFunction = (queryResults) => {
  const weeks = queryResults.map((q) => q.Tab).filter(unique);
  return { weeks };
};

const queryResultsTransform = (queryResults, activeWeek) => {
  return queryResults
    .filter((r) => activeWeek === "notset" || r.Tab === activeWeek)
    .map((r) => {
      delete r.Tab;
      return r;
    });
};

const SalonSchedules = () => {
  const [activeWeek, setWeek] = useState("notset");
  return (
    <QueryReport
      title={"Salon Schedules"}
      queryPath={"dashboardSchedules"}
      rowGroup={"Salon#"}
      childPropsFunction={childPropsFunction}
      queryResultsTransform={(data) => queryResultsTransform(data, activeWeek)}
      keepExpanded={true}
      useDateFilter={false}
    >
      <ScheduleTabs setWeek={setWeek} activeWeek={activeWeek} />
    </QueryReport>
  );
};

export default SalonSchedules;
