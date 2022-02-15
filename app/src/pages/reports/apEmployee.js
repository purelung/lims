import React from "react";
import { QueryReport } from "../../components/QueryReport";

const apEmployee = () => {
  return (
    <QueryReport title={"AP Employee"} queryPath={"apEmployee"} useDateFilter={"true"}/>
  );
};

export default apEmployee;