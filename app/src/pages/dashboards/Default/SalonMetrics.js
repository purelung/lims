import React, { useState, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import BarChart from "./BarChart";
import { Report } from "../../../components/QueryReport";
import { MultiSelect } from "primereact/multiselect";
import { UserContext } from "../../../contexts/UserContext";
import { useQuery } from "react-query";
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
  const queryPath = "dashboardMetrics";
  const { isLoading, error, data } = useQuery({
    queryKey: "dashboardMetrics",
    queryFn: async () => {
      const data = await zeeFetch(user.authToken, "dashboardMetrics");
      console.log(data);
      const randomizedData = getRandomSalonData(data);
      const salons = randomizedData.map((d) => d.salon.toString());
      setSelectedSalons(salons);
      setSalonOptions(salons);
      return randomizedData;
    },
    ...fetchOptions,
  });

  const pivotedData = data
    ? pivotSalonMetricData(
        data.filter((d) => selectedSalons.includes(d.salon.toString()))
      )
    : data;

  return (
    <Container fluid className="p-0">
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
