import React from "react";
import { QueryReport } from "../../components/QueryReport";

const Inventory = () => {
  return (
    <QueryReport title={"Inventory Report"} queryPath={"Inventory"} useDateFilter={"true"}/>
  );
};

export default Inventory;