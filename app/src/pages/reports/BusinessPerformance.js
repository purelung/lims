import React from "react";
import { QueryReport } from "../../components/QueryReport";

const BusinessPerformance = () => {
  return (
    <QueryReport title={"Business Performance"} queryPath={"business-performance"} useDateFilter={"true"}/>
  );
};

export default BusinessPerformance;