import React from 'react';
import { Sparklines, SparklinesLine } from "react-sparklines";

export default (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;


  return (
    <span>
      <Sparklines data={cellValue.split(",")}><SparklinesBar color="blue" /></Sparklines>
    </span>
  );
};