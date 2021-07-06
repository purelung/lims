import React from "react";
import { QueryReport } from "../../components/QueryReport";
import { pivotSalonMetricData } from "../../utilities/salonMetricHandler";

const SalonMetrics = () => {
  return (
    <QueryReport
      title={"Salon Metrics"}
      queryPath={"dashboardMetrics"}
      keepExpanded={true}
      useDateFilter={true}
      useSalonsFilter={true}
      queryResultsTransform={pivotSalonMetricData}
    />
  );
};

export default SalonMetrics;
