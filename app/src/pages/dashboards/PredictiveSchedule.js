import React, { useState, useContext, useMemo } from "react";
import { Children } from "react";
import { QueryReport } from "../../components/QueryReport";
import { unique } from "../../utilities/listHelper";
import { Row, Col } from "reactstrap";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { useQuery, useQueryClient } from "react-query";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { zeeFetch, fetchOptions } from "../../utilities/fetchHelper";

const formatTime = (time) => {
  const hour = parseInt(time.substring(0, 2));
  const amPm = hour >= 12 ? "pm" : "am";
  return `${hour % 12}${time.substring(2, time.length - 3)}${amPm}`;
};

const queryResultsTransform = (queryResults, activeWeek) => {
  console.log({ queryResults });
  return queryResults.map((q) => {
    return {
      title: ` - ${formatTime(q.endTime)} : ${q.Shifts} Shift${
        q.Shifts > 1 ? "s" : ""
      }`,
      date: `${q.date.substring(0, 10)}T${q.startTime}`,
    };
  });
};

const FullCalendarDemo = () => {
  const { user } = useContext(UserContext);

  const options = {
    plugins: [dayGridPlugin],
    defaultView: "dayGridMonth",
    defaultstart: "2021-12-01",
    header: {
      left: "prev,next",
      center: "title",
      right: "dayGridMonth",
    },
    editable: true,
  };

  const { isLoading, isFetching, error, data } = useQuery({
    queryKey: "dashboardPredictive",
    queryFn: () =>
      zeeFetch(user.authToken, "dashboardPredictive", { storeId: "82311" }),
    ...fetchOptions,
  });

  let manipulatedData = data ? JSON.parse(JSON.stringify(data)) : data;

  manipulatedData = useMemo(() => {
    return manipulatedData && queryResultsTransform
      ? queryResultsTransform(manipulatedData)
      : manipulatedData;
  }, [manipulatedData]);

  console.log({ manipulatedData });

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={manipulatedData}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth",
      }}
    />
  );
};

const PredictiveSchedule = () => {
  return <FullCalendarDemo />;
};

export default PredictiveSchedule;
