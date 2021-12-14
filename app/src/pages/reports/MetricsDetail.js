import React from "react";
import { QueryReport } from "../../components/QueryReport";

const MetricsDetail = () => {
  return (
    <QueryReport title={"Metrics Detail"} queryPath={"dashboardMetricsDetail"} useDateFilter={"true"}/>
  );
};

export default MetricsDetail;