import React from "react";
import { QueryReport } from "../../components/QueryReport";

const EmployeeRankings = () => {
  return (
    <QueryReport title={"Employee Rankings"} queryPath={"employee-rankings"} />
  );
};

export default EmployeeRankings;
