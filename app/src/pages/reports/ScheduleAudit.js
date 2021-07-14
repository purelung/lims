import React from "react";
import { QueryReport } from "../../components/QueryReport";

const ScheduleAudit = () => {
  return (
    <QueryReport 
    title={"Schedule Audit"} 
    queryPath={"schedule-audit"} 
    rowGroup={"Salon#"}
    keepExpanded={true}    
    />
  );
};
export default ScheduleAudit;



