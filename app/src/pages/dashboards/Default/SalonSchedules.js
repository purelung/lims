import React from "react";
import { QueryReport } from "../../../components/QueryReport";

const SalonSchedules = () => {
  return (
    <QueryReport
      title={"Salon Schedules"}
      queryPath={"dashboardSchedules"}
      rowGroup={"Salon#"}
      keepExpanded={true}
    />
  );
};

export default SalonSchedules;
