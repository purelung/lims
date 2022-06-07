import React from "react";
import { QueryReport } from "../../components/QueryReport";

const CustomerMetrics = () => {
  return (
    <QueryReport title={"Customer Metrics"} queryPath={"customerMetrics"} useDateFilter={"true"}/>
  );
};

export default CustomerMetrics;