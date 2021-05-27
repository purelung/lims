import React from "react";
import { QueryReport } from "../../components/QueryReport";

const EmployeeMetrics = () => {
  return (
    <QueryReport
      title={"Employee Metrics"}
      queryPath={"dashboardEmployees"}
      useDateFilter={true}
    />
  );
};

export default EmployeeMetrics;
