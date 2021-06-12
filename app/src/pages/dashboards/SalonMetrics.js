import React, { useState, useContext, useMemo } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Report } from "../../components/QueryReport";
import { MultiSelect } from "primereact/multiselect";
import { UserContext } from "../../contexts/UserContext";
import { Overlay, Spinner, showToast, BarChart } from "../../components";
import { useQuery, useQueryClient } from "react-query";
import { pivotSalonMetricData } from "../../utilities/salonMetricHandler";
import { zeeFetch, fetchOptions } from "../../utilities/fetchHelper";
import Select from "react-select";

const SalonMetrics = ({}) => {
  const [graphData, setGraphData] = useState({
    graphData: { dataThisYear: [], dataLastYear: [] },
  });
  const { user } = useContext(UserContext);
  const allSelect = { value: "all", label: "all" };
  const [selectedSalons, setSelectedSalons] = useState([allSelect]);
  const [salonOptions, setSalonOptions] = useState([allSelect]);
  const queryClient = useQueryClient();
  const queryPath = "dashboardMetrics";
  const { isLoading, isFetching, error, data } = useQuery(
    queryPath,
    () => zeeFetch(user.authToken, queryPath),
    {
      ...fetchOptions,
      select: (data) => {
        if (salonOptions.length === 1 && data.length > 0) {
          let salons = data.map((d) => ({
            value: d.storeid.toString(),
            label: d.storeid.toString(),
          }));
          salons.push(allSelect);
          setSalonOptions(salons);
        }
        return data;
      },
    }
  );

  const pivotedData = useMemo(() => {
    return data
      ? pivotSalonMetricData(
          selectedSalons.find((s) => s.value === "all")
            ? data
            : data.filter((d) =>
                selectedSalons
                  .map((s) => s.value)
                  .includes(d.storeid.toString())
              )
        )
      : undefined;
  }, [data, selectedSalons]);

  if (error) {
    showToast(
      "error",
      "Unable to retrieve data from server.  Check console logs"
    );
    console.log(error);
  }

  return (
    <Container fluid className="p-0">
      {isLoading || isFetching ? (
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
            usePaging={false}
            order={false}
          >
            {/* <MultiSelect
              selectedItemsLabel={"Select Salons"}
              value={selectedSalons}
              options={salonOptions}
              onChange={(e) => setSelectedSalons(e.value)}
              style={{ marginBottom: 20 }}
            /> */}
            <Select
              defaultValue={[allSelect]}
              isMulti
              placeholder="Select Salons..."
              name="salons"
              onChange={(e) => {
                let newSelectedSalons = e ?? [];

                if (
                  !(
                    newSelectedSalons.length === 1 &&
                    newSelectedSalons[0].value === "all"
                  ) &&
                  newSelectedSalons.find((s) => s.value === "all")
                ) {
                  newSelectedSalons = newSelectedSalons.filter(
                    (s) => s.value !== "all"
                  );
                }

                setSelectedSalons(newSelectedSalons);
              }}
              value={selectedSalons}
              options={salonOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </Report>
        </Col>
        {graphData.graphData.dataThisYear.length === 0 ? (
          <div />
        ) : (
          <Col lg="6" xl="4" className="d-flex">
            <BarChart {...graphData} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default SalonMetrics;
