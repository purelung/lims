import React, { useContext, useEffect, useState, useMemo } from "react";
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
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const StyledFilterRow = styled(Row)`
  padding: 1rem;
  margin-bottom: 1rem;
`;

const StyledFilterCol = styled(Col)`
  display: flex;
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  padding: 1rem;
`;

const StyledSelect = styled(Select)`
  min-width: 400px;
`;

export const Report = ({
  children,
  isLoading,
  title,
  rows,
  onRowSelected,
  rowGroup,
  keepExpanded,
  refreshFn,
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
        refreshFn={refreshFn}
      >
        {children}
      </PrimeDataTable>
    </div>
  );
};

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const getSelectedOptions = (e) => {
  let newSelectedOptions = e ?? [];

  if (
    !(
      newSelectedOptions.length === 1 && newSelectedOptions[0].value === "all"
    ) &&
    newSelectedOptions.find((g) => g.value === "all")
  ) {
    newSelectedOptions = newSelectedOptions.filter((g) => g.value !== "all");
  }

  return newSelectedOptions;
};

const FilterBox = ({ children, title, style }) => {
  return (
    <div style={style}>
      <h5>{title}</h5>
      {children}
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
  queryResultsTransform,
  useDateFilter = true,
  useSalonsFilter = true,
}) => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  var today = new Date();
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const [startDate, setStartDate] = useState(oneWeekAgo);
  const [endDate, setEndDate] = useState(today);

  const allSelect = { value: "all", label: "all" };
  const [selectedSalons, setSelectedSalons] = useState([allSelect]);
  const [salonOptions, setSalonOptions] = useState([allSelect]);
  const [selectedGroups, setSelectedGroups] = useState([allSelect]);
  const [groupOptions, setGroupOptions] = useState([allSelect]);
  const [salonGroups, setSalonGroups] = useState([]);

  const salonsQueryPath = "salonsWithGroups";
  const salonQueryResult = useQuery(
    salonsQueryPath,
    () => zeeFetch(user.authToken, salonsQueryPath),
    {
      ...fetchOptions,
      select: (data) => {
        const salons = data.salonGroups.map((s) => `${s.id} - ${s.name}`);
        const groups = data.salonGroups.map((s) => s.group).filter(unique);

        if (salonGroups.length === 0) {
          setSalonOptions([
            allSelect,
            ...salons.map((s) => ({ label: s, value: s })),
          ]);
          setGroupOptions([
            allSelect,
            ...groups.map((g) => ({ label: g, value: g })),
          ]);

          const tempSalonGroups = groups.map((g) => ({
            group: g,
            salons: data.salonGroups
              .filter((s) => s.group === g)
              .map((s) => `${s.id} - ${s.name}`),
          }));

          setSalonGroups(tempSalonGroups);
        }

        return data;
      },
    }
  );

  console.log({ startDate, endDate });

  const queryId = [queryPath, startDate.toDateString(), endDate.toDateString()];
  let options = {};
  if (useDateFilter) {
    options = { ...options, startDate, endDate };
  }

  const { isLoading, isFetching, error, data } = useQuery({
    queryKey: queryId,
    queryFn: () => zeeFetch(user.authToken, queryPath, options),
    ...fetchOptions,
  });

  let manipulatedData = data;
  let combinedSelectedSalons = [];

  if (useSalonsFilter) {
    const selectedGroupSalons = selectedGroups.find((g) => g.value === "all")
      ? salonOptions
      : selectedGroups
          .flatMap((g) => {
            console.log(g.value);
            return salonGroups.find((sg) => sg.group === g.value)?.salons;
          })
          .map((g) => ({ value: g, label: g }));

    combinedSelectedSalons = [...selectedSalons, ...selectedGroupSalons].filter(
      unique
    );

    let salonPos = 0;
    let salonFieldName = "";

    if (manipulatedData && manipulatedData.length > 0) {
      const possibleKeys = ["Salon", "Salon#", "storeid"];

      const firstRow = manipulatedData[0];
      const rowKeys = Object.keys(firstRow);
      salonFieldName = rowKeys.find((k) => possibleKeys.includes(k));
    }

    manipulatedData = combinedSelectedSalons.find((s) => s.value === "all")
      ? manipulatedData
      : manipulatedData?.filter((d) =>
          combinedSelectedSalons
            .map((s) => {
              return s.value;
            })
            .find((s) => {
              return s.includes(d[salonFieldName].toString());
            })
        );
  }

  manipulatedData = useMemo(() => {
    return manipulatedData && queryResultsTransform
      ? queryResultsTransform(manipulatedData)
      : manipulatedData;
  }, [manipulatedData]);

  manipulatedData = manipulatedData?.sort();

  if (error) {
    showToast(
      "error",
      "Unable to retrieve data from server.  Check console logs"
    );
    console.log(error);
  }

  return (
    <Container fluid className="p-0">
      <Row>
        <Col>
          <Report
            isLoading={isLoading || isFetching}
            rows={manipulatedData}
            title={title}
            onRowSelected={onRowSelected}
            rowGroup={rowGroup}
            keepExpanded={keepExpanded}
            refreshFn={() => queryClient.invalidateQueries(queryPath)}
          >
            <StyledFilterRow>
              {useDateFilter ? (
                <StyledFilterCol style={{ display: "inline-flex" }}>
                  <FilterBox title={"Start Date"}>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      style={{ borderRadius: 10 }}
                    />
                  </FilterBox>

                  <FilterBox title={"End Date"} style={{ marginLeft: 30 }}>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </FilterBox>
                </StyledFilterCol>
              ) : (
                <div />
              )}
              {useSalonsFilter ? (
                <StyledFilterCol
                  style={{ marginLeft: "1rem", marginRight: "1rem" }}
                >
                  <FilterBox title={"Salons"}>
                    <StyledSelect
                      defaultValue={[allSelect]}
                      isMulti
                      placeholder="Select Salons..."
                      name="salons"
                      onChange={(e) => {
                        const newSelectedSalons = getSelectedOptions(e);
                        setSelectedSalons(newSelectedSalons);

                        if (!newSelectedSalons.find((s) => s.value === "all")) {
                          setSelectedGroups(
                            selectedGroups.filter((g) => g.value !== "all")
                          );
                        }
                      }}
                      value={selectedSalons}
                      options={salonOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </FilterBox>
                </StyledFilterCol>
              ) : (
                <div />
              )}
              {useSalonsFilter ? (
                <StyledFilterCol>
                  <FilterBox title={"Salon Groups"}>
                    <StyledSelect
                      defaultValue={[allSelect]}
                      isMulti
                      placeholder="Select Groups..."
                      name="groups"
                      onChange={(e) => {
                        const newSelectedGroups = getSelectedOptions(e);
                        setSelectedGroups(newSelectedGroups);

                        if (!newSelectedGroups.find((g) => g.value === "all")) {
                          setSelectedSalons(
                            selectedSalons.filter((s) => s.value !== "all")
                          );
                        }
                      }}
                      value={selectedGroups}
                      options={groupOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </FilterBox>
                </StyledFilterCol>
              ) : (
                <div />
              )}
            </StyledFilterRow>
            {children}
          </Report>
        </Col>
      </Row>
    </Container>
  );
};
