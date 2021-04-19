import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllModules } from "@ag-grid-enterprise/all-modules";
import sparklineRenderer from "./sparklineRenderer.jsx";

ModuleRegistry.registerModules(AllModules);

const AgGrid = ({ rows, rowGroup = "" }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const columnNames = rows.length === 0 ? [] : Object.keys(rows[0]);

  const autoSizeAll = (columnApi, skipHeader) => {
    var allColumnIds = [];
    columnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    columnApi.autoSizeColumns(allColumnIds, skipHeader);
    console.log(allColumnIds);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    autoSizeAll(params.columnApi, false);
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
  const autoGroupColumnDef = { headerName: "Salon" };
  const getCellRenderer = (columnName) => {
    if (columnName.indexOf("_Spark") > -1) {
      return "sparklineRenderer";
    } else {
      return null;
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 800, width: 1100 }}>
      {columnNames.length === 0 ? (
        <div />
      ) : (
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
          autoGroupColumnDef={autoGroupColumnDef}
          frameworkComponents={{
            sparklineRenderer: sparklineRenderer,
          }}
        >
          {columnNames
            .filter((k) => k.indexOf("_Spark") === -1)
            .map((k) => (
              <AgGridColumn
                rowGroup={k === rowGroup}
                hide={k === rowGroup}
                filter={"agSetColumnFilter"}
                key={k}
                field={k}
                resizable={true}
                autoSize={true}
                sortable={true}
                cellRenderer={getCellRenderer(k)}
              ></AgGridColumn>
            ))}
          {columnNames
            .filter((k) => k.indexOf("_Spark") > -1)
            .map((k) => (
              <AgGridColumn
                rowGroup={k === rowGroup}
                hide={k === rowGroup}
                filter={"agSetColumnFilter"}
                key={k}
                field={k}
                resizable={true}
                autoSize={true}
                sortable={true}
                cellRenderer="sparklineRenderer"
              ></AgGridColumn>
            ))}
        </AgGridReact>
      )}
    </div>
  );
};

export default AgGrid;
