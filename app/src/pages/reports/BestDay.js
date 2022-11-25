import React from "react";
import { QueryReport } from "../../components/QueryReport";

const BestDay = () => {
  return (
    <QueryReport title={"Best Day"} queryPath={"best-day"} useDateFilter={false} />
  );
};

export default BestDay;