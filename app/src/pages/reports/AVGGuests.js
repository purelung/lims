import React from "react";
import { QueryReport } from "../../components/QueryReport";

const AVGGuests = () => {
  return (
    <QueryReport title={"Average Guests"} queryPath={"avg-guests"} useDateFilter={"true"}/>
  );
};

export default AVGGuests;