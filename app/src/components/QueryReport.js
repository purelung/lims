import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  forwardRef,
} from "react";
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
import { sortByName } from "../utilities/listHelper";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Dialog } from "primereact/dialog";
import { Button as PrimeButton } from "primereact/button";
import { unique } from "../utilities/listHelper";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const StyledButton = styled.button`
  background-color: white;
  border-radius: 5px;
`;

const addHeaders = (doc, header) => {
  const pageCount = doc.internal.getNumberOfPages();

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(header, doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });
  }
};

const exportPdf = (title, exportColumns, rows, header) => {
  const doc = new jsPDF({
    orientation: "landscape",
  });
  //doc.text(header, 10, 10);

  doc.autoTable(exportColumns, rows);
  addHeaders(doc, header);
  doc.save(title + ".pdf");
};

const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <StyledButton onClick={onClick} ref={ref}>
    {value}
  </StyledButton>
));

const FilterCol = (props) => {
  return (
    <Col md={4} sm={6} {...props} className="px-1 py-1">
      {props.children}
    </Col>
  );
};

const StyledSelect = styled(Select)`
  min-width: 175px;
`;

const BorderedDiv = styled.div`
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  padding: 1rem;
`;

const StyledLink = styled.span`
  color: lightblue;
  cursor: pointer;
  :hover {
    color: blue;
  }
  :active {
    color: lightblue;
  }
`;

const FilterDiv = ({ children, title, style, link }) => {
  return (
    <BorderedDiv style={style}>
      <h5>
        {title}
        {link ? (
          <StyledLink onClick={link.action}>{" " + link.text}</StyledLink>
        ) : (
          <span />
        )}
      </h5>
      {children}
    </BorderedDiv>
  );
};

const dialogFooter = (hideFn) => {
  return (
    <div>
      <PrimeButton
        label="Close"
        icon="pi pi-check"
        onClick={() => hideFn()}
        autoFocus
      />
    </div>
  );
};

const DateCol = ({ children, title, style }) => {
  return (
    <Col md={6} sm={12} className="py-1">
      <div>
        <h5>{title}</h5>
        {children}
      </div>
    </Col>
  );
};

export const Report = ({
  children,
  isLoading,
  title,
  rows,
  onRowSelected,
  rowGroup,
  keepExpanded,
  refreshFn,
  sortColumns,
  exportPdfFn,
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
        exportPdfFn={exportPdfFn}
        sortColumns={sortColumns}
      >
        {children}
      </PrimeDataTable>
    </div>
  );
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

  newSelectedOptions = newSelectedOptions.sort((a, b) =>
    sortByName(a.value, b.value)
  );

  return newSelectedOptions;
};

export const QueryReport = ({
  children,
  title,
  queryPath,
  onRowSelected,
  rowGroup,
  keepExpanded,
  queryResultsTransform,
  childPropsFunction,
  useDateFilter = true,
  useSalonsFilter = true,
  sortColumns = true,
  queryOptions = {},
  useSalonGroups = true,
}) => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  var today = new Date();
  var yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const [startDate, setStartDate] = useState(oneWeekAgo);
  const [endDate, setEndDate] = useState(yesterday);

  const allSelect = { value: "all", label: "all" };
  const [selectedSalons, setSelectedSalons] = useState([allSelect]);
  const [salonOptions, setSalonOptions] = useState([allSelect]);
  const [selectedGroups, setSelectedGroups] = useState([allSelect]);
  const [groupOptions, setGroupOptions] = useState([allSelect]);
  const [salonGroups, setSalonGroups] = useState([]);
  const [displaySelectedSalons, setDisplaySelectedSalons] = useState(false);

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
            ...salons
              .filter(unique)
              .map((s) => ({ label: s, value: s }))
              .sort((a, b) => sortByName(a.value, b.value)),
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

  const queryId = [queryPath, startDate.toDateString(), endDate.toDateString()];
  let options = queryOptions;
  if (useDateFilter) {
    options = { ...options, startDate, endDate };
  }

  const { isLoading, isFetching, error, data } = useQuery({
    queryKey: queryId,
    queryFn: () => zeeFetch(user.authToken, queryPath, options),
    ...fetchOptions,
  });

  let manipulatedData = data ? JSON.parse(JSON.stringify(data)) : data;
  let combinedSelectedSalons = [];

  if (useSalonsFilter) {
    const selectedGroupSalons = selectedGroups.find((g) => g.value === "all")
      ? salonOptions
      : selectedGroups
          .flatMap((g) => {
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
            sortColumns={sortColumns}
            exportPdfFn={(title, exportColumns, rows) =>
              exportPdf(
                title,
                exportColumns,
                rows,
                startDate.toDateString() + " - " + endDate.toDateString()
              )
            }
            refreshFn={() => queryClient.invalidateQueries(queryPath)}
          >
            <Row style={{ margin: "0px 0px 10px 0px" }}>
              {useDateFilter ? (
                <FilterCol className="pr-1">
                  <BorderedDiv>
                    <Row>
                      <DateCol title={"Start Date"}>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          customInput={<CustomDateInput />}
                        />
                      </DateCol>

                      <DateCol title={"End Date"}>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          customInput={<CustomDateInput />}
                        />
                      </DateCol>
                    </Row>
                  </BorderedDiv>
                </FilterCol>
              ) : (
                <div />
              )}
              {useSalonsFilter ? (
                <FilterCol>
                  <FilterDiv
                    title={"Salons"}
                    link={{
                      text: "(Show selected...)",
                      action: () => setDisplaySelectedSalons(true),
                    }}
                  >
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
                  </FilterDiv>
                </FilterCol>
              ) : (
                <div />
              )}
              {useSalonsFilter && useSalonGroups ? (
                <FilterCol>
                  <FilterDiv title={"Salon Groups"}>
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
                  </FilterDiv>
                </FilterCol>
              ) : (
                <div />
              )}
            </Row>
            {children
              ? React.cloneElement(
                  children,
                  data && childPropsFunction
                    ? childPropsFunction(data)
                    : undefined
                )
              : undefined}
          </Report>
        </Col>
      </Row>
      <Dialog
        header="Selected Salons"
        visible={displaySelectedSalons}
        style={{ width: "50vw" }}
        footer={dialogFooter(() => setDisplaySelectedSalons(false))}
        onHide={() => setDisplaySelectedSalons(false)}
      >
        <p>
          {combinedSelectedSalons
            .map((s) => s.value)
            .filter((s) => s !== "all")
            .map((s) => (
              <div key={s}>{s}</div>
            ))}
        </p>
      </Dialog>
    </Container>
  );
};
