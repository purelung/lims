import React from "react";
import { QueryReport } from "../../components/QueryReport";

const EmployeeRankings = () => {
  return <QueryReport title={"Salon Rank"} queryPath={"salon-rankings"} useDateFilter={"true"} />;
};

export default EmployeeRankings;
