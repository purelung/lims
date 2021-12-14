import React from "react";
import { QueryReport } from "../../components/QueryReport";

const MetricsDetailGroup = () => {
  return (
    <QueryReport title={"Metrics Detail Grouping"} queryPath={"MetricsDetailGroup"} useDateFilter={"true"}/>
  );
};

export default MetricsDetailGroup;