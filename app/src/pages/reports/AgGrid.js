import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { showToast } from "../../components";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllModules } from "@ag-grid-enterprise/all-modules";
import sparklineRenderer from "./sparklineRenderer.jsx";
import { Col, Container, Row } from "reactstrap";
import { Download } from "react-feather";
import styled from "styled-components";

ModuleRegistry.registerModules(AllModules);

const StyledDownload = styled(Download)`
  margin-left: auto;
  background-color: #2c7be5;
  border-radius: 2rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  color: white;

  :hover {
    background-color: #9d7bd8;
  }

  :active {
    background-color: #20c997;
  }
`;

const StyledHeader = styled.div`
  display: flex;
`;

const AgGrid = ({ title, rows, rowGroup = "" }) => {
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
    params.api.sizeColumnsToFit();
  };

  const autoGroupColumnDef = { headerName: rowGroup };
  const getCellRenderer = (columnName) => {
    if (columnName.indexOf("_Spark") > -1) {
      return "sparklineRenderer";
    } else {
      return null;
    }
  };
  const autoGroupColumnDef = { headerName: "Salon" };

  return (
    <div>
      <StyledHeader>
        <h1 className="h3 mb-3">{title}</h1>
        <StyledDownload
          size={40}
          onClick={() => {
            gridApi.exportDataAsCsv();
            showToast("Success", "Exported as CSV");
          }}
        ></StyledDownload>
      </StyledHeader>

      <Row>
        <Col>
          <div
            className="ag-theme-alpine"
            style={{ height: 800, width: "100%" }}
          >
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
                {columnNames.map((k) => {
                  const cellRenderer = getCellRenderer(k);
                  return (
                    <AgGridColumn
                      rowGroup={k === rowGroup}
                      hide={k === rowGroup}
                      filter={"agSetColumnFilter"}
                      key={k}
                      field={k}
                      headerName={k.indexOf("_Spark") > -1 ? "-> Trend" : k}
                      resizable={true}
                      autoSize={true}
                      sortable={true}
                      cellRenderer={cellRenderer}
                    ></AgGridColumn>
                  );
                })}
              </AgGridReact>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AgGrid;
