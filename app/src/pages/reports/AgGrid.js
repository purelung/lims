import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllModules } from "@ag-grid-enterprise/all-modules";

ModuleRegistry.registerModules(AllModules);

const AgGrid = ({ rows, rowGroup = false }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onBtnExport = () => {
    var params = getParams();
    if (params.suppressQuotes || params.columnSeparator) {
      alert(
        "NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel."
      );
    }
    gridApi.exportDataAsCsv(params);
  };

  const getParams = () => {
    return {
      suppressQuotes: getValue("#suppressQuotes"),
      columnSeparator: getValue("#columnSeparator"),
      customHeader: getValue("#customHeader"),
      customFooter: getValue("#customFooter"),
    };
  };

  const getValue = (inputSelector) => {
    const text = document.querySelector(inputSelector).value;
    switch (text) {
      case "string":
        return (
          'Here is a comma, and a some "quotes". You can see them using the\n' +
          "api.getDataAsCsv() button but they will not be visible when the downloaded\n" +
          "CSV file is opened in Excel because string content passed to\n" +
          "customHeader and customFooter is not escaped."
        );
      case "array":
        return [
          [],
          [
            {
              data: {
                value: 'Here is a comma, and a some "quotes".',
                type: "String",
              },
            },
          ],
          [
            {
              data: {
                value:
                  "They are visible when the downloaded CSV file is opened in Excel because custom content is properly escaped (provided that suppressQuotes is not set to true)",
                type: "String",
              },
            },
          ],
          [
            {
              data: {
                value: "this cell:",
                type: "String",
              },
              mergeAcross: 1,
            },
            {
              data: {
                value: "is empty because the first cell has mergeAcross=1",
                type: "String",
              },
            },
          ],
          [],
        ];
      case "none":
        return;
      case "tab":
        return "\t";
      case "true":
        return true;
      case "none":
        return;
      default:
        return text;
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 800, width: 1200 }}>
      <AgGridReact
        onGridReady={onGridReady}
        rowData={rows}
        autoSize={true}
        pagination={true}
        suppressCsvExport={false}
        autoGroupColumnDef={{ minWidth: 200 }}
        enableRangeSelection={true}
        animateRows={true}
        enableCharts={true}
      >
        {rows.length === 0 ? (
          <AgGridColumn field="id"></AgGridColumn>
        ) : (
          Object.keys(rows[0]).map((k) => (
            <AgGridColumn
              rowGroup={k === "salonId" && rowGroup}
              filter={"agSetColumnFilter"}
              key={k}
              field={k}
              resizable={true}
              autoSize={true}
              sortable={true}
            ></AgGridColumn>
          ))
        )}
      </AgGridReact>
    </div>
  );
};

export default AgGrid;
