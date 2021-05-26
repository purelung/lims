import React, { useState, useContext } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import BarChart from "./BarChart";
import { Report } from "../../../components/QueryReport";
import { MultiSelect } from "primereact/multiselect";
import { UserContext } from "../../../contexts/UserContext";
import { Overlay, Spinner, showToast } from "../../../components";
import { useQuery, useQueryClient } from "react-query";
import {
  pivotSalonMetricData,
  getRandomSalonData,
} from "../../../utilities/salonMetricHandler";

import { zeeFetch, fetchOptions } from "../../../utilities/fetchHelper";

const SalonMetrics = ({}) => {
  const [graphData, setGraphData] = useState({
    graphData: { dataThisYear: [], dataLastYear: [] },
  });
  const { user } = useContext(UserContext);
  const [selectedSalons, setSelectedSalons] = useState([]);
  const [salonOptions, setSalonOptions] = useState([]);
  const queryClient = useQueryClient();
  const queryPath = "dashboardMetrics";
  const { isLoading, error, data } = useQuery({
    queryKey: queryPath,
    queryFn: async () => {
      let data = await zeeFetch(user.authToken, queryPath);
      console.log(data);
      const salons = data.map((d) => d.storeid.toString());
      setSelectedSalons(salons);
      setSalonOptions(salons);
      return data;
    },
    ...fetchOptions,
  });

  const pivotedData = data
    ? pivotSalonMetricData(
        data.filter((d) => selectedSalons.includes(d.storeid.toString()))
      )
    : data;

  if (error) {
    showToast(
      "error",
      "Unable to retrieve data from server.  Check console logs"
    );
    console.log(error);
  }

  return (
    <Container fluid className="p-0">
      {isLoading ? (
        <Overlay height="100vh" width="100vw">
          <Spinner />
        </Overlay>
      ) : (
        <div />
      )}
      <Button
        style={{ marginBottom: 15 }}
        color="primary"
        onClick={() => queryClient.invalidateQueries(queryPath)}
      >
        Refresh
      </Button>
      <Row>
        <Col lg="6" xl="8" className="d-flex">
          <Report
            title={"Salon Metrics"}
            onRowSelected={(row) =>
              setGraphData({
                title: row.GridRowHeader,
                graphData: row.GraphData,
              })
            }
            rows={pivotedData}
          >
            <MultiSelect
              selectedItemsLabel={"Select Salons"}
              value={selectedSalons}
              options={salonOptions}
              onChange={(e) => setSelectedSalons(e.value)}
              style={{ marginBottom: 20 }}
            />
          </Report>
        </Col>
        <Col lg="6" xl="4" className="d-flex">
          <BarChart {...graphData} />
        </Col>
      </Row>
    </Container>
  );
};

export default SalonMetrics;
