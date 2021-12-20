import React, { useState, useContext, useMemo, useRef, useEffect } from "react";
import { Children } from "react";
import { QueryReport } from "../../components/QueryReport";
import { unique, uniqueObject } from "../../utilities/listHelper";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { useQuery, useQueryClient } from "react-query";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { zeeFetch, fetchOptions } from "../../utilities/fetchHelper";
import { sortByName } from "../../utilities/listHelper";
import Select from "react-select";
import { Container, Row, Col } from "reactstrap";
import { Card } from "primereact/card";

const StyledSelect = styled(Select)`
  min-width: 175px;
  max-width: 400px;
  z-index: 400;
`;

// font-size: 14px;
// text-size-adjust: none !important;
// line-height: 11px !important;
// margin-bottom: 21px;

//display: block !important;

const StyledContainer = styled(Container)`
  .fc-toolbar {
  }

  .fc-toolbar-chunk {
    display: flex;
  }

  .fc-button-group {
  }

  .fc-button-primary {
  }

  .fc-event-title {
    font-weight: 400;
  }
`;

const formatTime = (time) => {
  const hour = parseInt(time.substring(0, 2));
  const amPm = hour >= 12 ? "pm" : "am";
  return `${hour % 12}${time.substring(2, time.length - 3)}${amPm}`;
};

const queryResultsTransform = (queryResults, view) => {
  return queryResults.map((q) => {
    const shiftString = `${q.Shifts} Shift${q.Shifts > 1 ? "s" : ""}`;
    return {
      title:
        view === "dayGridMonth"
          ? ` - ${formatTime(q.endTime)} : ${shiftString}`
          : shiftString,
      start: `${q.date.substring(0, 10)}T${q.startTime}`,
      end: `${q.date.substring(0, 10)}T${q.endTime}`,
      backgroundColor:
        q.Shifts === 3 ? "#c43aff" : q.Shifts === 2 ? "#44ff3a" : "#3a6fff",
    };
  });
};

const FullCalendarDemo = () => {
  const [events, setEvents] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [salonOptions, setSalonOptions] = useState(null);
  const [view, setView] = useState("dayGridMonth");
  const { user } = useContext(UserContext);
  const calRef = useRef(null);

  const salonsQueryPath = "salonsWithGroups";
  useQuery(salonsQueryPath, () => zeeFetch(user.authToken, salonsQueryPath), {
    ...fetchOptions,
    select: (data) => {
      const salons = data.salonGroups.map((s) => {
        return { label: `${s.id} - ${s.name}`, value: s.id };
      });

      if (!salonOptions) {
        setSalonOptions(
          salons
            .filter((value, index, self) =>
              uniqueObject(value, index, self, "value")
            )
            .sort((a, b) => sortByName(a.label, b.label))
        );
      }

      return data;
    },
  });

  const storeId = selectedSalon ? selectedSalon.value : 0;

  const { data } = useQuery({
    queryKey: ["dashboardPredictive", storeId],
    queryFn: () =>
      zeeFetch(user.authToken, "dashboardPredictive", {
        storeId,
      }),
    ...fetchOptions,
    enabled: selectedSalon !== null,
  });

  let manipulatedData = data ? JSON.parse(JSON.stringify(data)) : data;

  manipulatedData = useMemo(() => {
    return manipulatedData && queryResultsTransform
      ? queryResultsTransform(manipulatedData, view)
      : manipulatedData;
  }, [manipulatedData, view]);

  return (
    <StyledContainer fluid className="p-0">
      <Row>
        <Col>
          <Card title={"Predictive Schedule"}>
            <Row>
              <Col>
                <StyledSelect
                  placeholder="Select Salon..."
                  name="salon"
                  onChange={(e) => {
                    setSelectedSalon(e);
                  }}
                  value={selectedSalon}
                  options={salonOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col>
                <FullCalendar
                  plugins={[dayGridPlugin, listPlugin]}
                  initialView={view}
                  events={manipulatedData}
                  customButtons={{
                    week: {
                      text: "Week",
                      click: () => {
                        setView("listWeek");
                        calRef.current.getApi().changeView("listWeek");
                      },
                    },
                    month: {
                      text: "Month",
                      click: () => {
                        setView("dayGridMonth");
                        calRef.current.getApi().changeView("dayGridMonth");
                      },
                    },
                  }}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "month week",
                  }}
                  ref={calRef}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </StyledContainer>
  );
};

const PredictiveSchedule = () => {
  return <FullCalendarDemo />;
};

export default PredictiveSchedule;
