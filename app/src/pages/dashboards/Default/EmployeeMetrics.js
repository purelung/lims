import React from "react";
import { QueryReport } from "../../../components/QueryReport";

const EmployeeMetrics = () => {
  return (
    <QueryReport title={"Employee Metric"} queryPath={"dashboardEmployees"} />
  );
};

export default EmployeeMetrics;
