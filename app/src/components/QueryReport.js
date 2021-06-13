import React, { useContext, useEffect, useState } from "react";
import { Overlay, Spinner, showToast } from "./";
import { UserContext } from "../contexts/UserContext";
import { useQuery, useQueryClient } from "react-query";
import {
  Container,
  Button,
  Row,
  Col,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import PrimeDataTable from "./PrimeDataTable";
import { zeeFetch, fetchOptions } from "../utilities/fetchHelper";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const Report = ({
  children,
  isLoading,
  title,
  rows,
  onRowSelected,
  rowGroup,
  keepExpanded,
  usePaging = true,
}) => {
  return (
    <div>
      {isLoading ? (
        <Overlay height="100vh" width="100vw">
          <Spinner />
        </Overlay>
      ) : (
        <div />
      )}
      <PrimeDataTable
        title={title}
        rows={rows}
        onRowSelected={onRowSelected}
        rowGroup={rowGroup}
        keepExpanded={keepExpanded}
        usePaging={usePaging}
      >
        {children}
      </PrimeDataTable>
    </div>
  );
};

export const QueryReport = ({
  children,
  title,
  queryPath,
  onRowSelected,
  rowGroup,
  keepExpanded,
  useDateFilter = false,
}) => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  var today = new Date();
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const [startDate, setStartDate] = useState(oneWeekAgo);
  const [endDate, setEndDate] = useState(today);

  const queryId = [queryPath, startDate, endDate];

  let options = {};

  if (useDateFilter) {
    options = { ...options, startDate, endDate };
  }

  const { isLoading, isFetching, error, data } = useQuery(
    queryId,
    () => zeeFetch(user.authToken, queryPath, options),
    { ...fetchOptions }
  );

  if (error) {
    showToast(
      "error",
      "Unable to retrieve data from server.  Check console logs"
    );
    console.log(error);
  }

  return (
    <Container fluid className="p-0">

      {useDateFilter ? (
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Start Date</CardTitle>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">End Date</CardTitle>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : (
        <div />
      )}
      <Row>
        <Col>
          <Report
            isLoading={isLoading || isFetching}
            rows={data}
            title={title}
            onRowSelected={onRowSelected}
            rowGroup={rowGroup}

            keepExpanded={keepExpanded}
          >
            {children}
          </Report>
        </Col>
      </Row>
    </Container>
  );
};
