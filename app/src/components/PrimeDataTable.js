import React, { useState, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";
import PrimeReact from "primereact/api";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { ExportToCsv } from "export-to-csv";
import { Sparklines, SparklinesLine } from "react-sparklines";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

PrimeReact.appendTo = "self";
PrimeReact.ripple = true;

const getAverageLength = (items) => items.join("").length / items.length;
const multiplier = 12;
const minWidth = 75;
const getColumnWidth = (rows, columnName) =>
  getAverageLength(rows.map((r) => r[columnName])) * multiplier;
const getColumnWidthFromHeaderName = (columnName) => {
  const width = columnName.length * multiplier;
  return width > minWidth ? width : minWidth;
};

const PrimeDataTable = ({
  children,
  title,
  rows,
  onRowSelected,
  keepExpanded,
  sortColumns,
  rowGroup = "",
  refreshFn,
  exportPdfFn,
  usePaging = false,
}) => {
  if (rows === undefined) {
    return <div />;
  } else {
    const columnNames = rows.length === 0 ? [] : Object.keys(rows[0]);
    const columns = columnNames.map((c, i) => ({
      field: c,
      header: c,
      width: i === 0 ? 100 : getColumnWidthFromHeaderName(c),
    }));

    return (
      <PrimeDataTableInner
        columns={columns}
        title={title}
        rows={rows}
        rowGroup={rowGroup}
        onRowSelected={onRowSelected}
        keepExpanded={keepExpanded}
        usePaging={usePaging}
        refreshFn={refreshFn}
        sortColumns={sortColumns}
        exportPdfFn={exportPdfFn}
      >
        {children}
      </PrimeDataTableInner>
    );
  }
};

const PrimeDataTableInner = ({
  children,
  columns,
  title,
  rows,
  onRowSelected,
  keepExpanded,
  refreshFn,
  sortColumns,
  exportPdfFn,
  rowGroup = "",
  usePaging = true,
}) => {
  const [selectedColumns, setSelectedColumns] = useState(columns);
  const exportColumns = columns.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));
  const [expandedRows, setExpandedRows] = useState(keepExpanded ? rows : []);
  const [selectedRow, setSelectedRow] = useState({});

  const onColumnToggle = (event) => {
    let _selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      _selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
  };

  const sparkTemplate = (rowData, columnName) => {
    return (
      <Sparklines data={rowData[columnName].split(",")}>
        <SparklinesLine color="blue" />
      </Sparklines>
    );
  };

  const gridRowHeaderTemplate = (rowData, columnName) => {
    const StyledGridRowHeader = styled.div`
      font-weight: 600;
    `;

    return <StyledGridRowHeader>{rowData[columnName]}</StyledGridRowHeader>;
  };

  const formatDiff = (rowData, columnName) => {
    const StyledNegativeNumber = styled.div`
      color: red;
    `;

    const StyledPositiveNumber = styled.div`
      color: darkgreen;
    `;

    const diffValue = rowData[columnName].toString();

    return diffValue.includes("-") || diffValue.includes("(") ? (
      <StyledNegativeNumber>{diffValue}</StyledNegativeNumber>
    ) : (
      <StyledPositiveNumber>{diffValue}</StyledPositiveNumber>
    );
  };

  const headerTemplate = (data) => {
    return (
      <React.Fragment>
        <span>{data[rowGroup]}</span>
      </React.Fragment>
    );
  };

  const footerTemplate = (data) => {
    return <td />;
  };

  const onRowGroupExpand = (event) => {};

  const onRowGroupCollapse = (event) => {};

  const paginatorLeft = (
    <Button
      type="button"
      icon="pi pi-refresh"
      className="p-button-text"
      onClick={refreshFn}
    />
  );
  const paginatorRight = (
    <div>

    </div>
  );

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(rows);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, title);
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((FileSaver) => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  };


  const exportheader = (
    
    <div>
    <Button
    type="button"
    icon="pi pi-file-excel"
    onClick={() => exportExcel()}
    className="p-button-success p-mr-2"
  />
  <Button
    type="button"
    icon="pi pi-file-pdf"
    onClick={() => exportPdfFn(title, exportColumns, rows)}
    className="p-button-warning p-mr-2"
    data-pr-tooltip="PDF"
  />
  </div>
  );

  const paginatorProps = usePaging
    ? {
        paginator: true,
        paginatorTemplate:
          "CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown",
        currentPageReportTemplate:
          "Showing {first} to {last} of {totalRecords}",
        rows: 250,
        rowsPerPageOptions: [50,100,250,500],
        paginatorLeft: paginatorLeft,
        paginatorRight: paginatorRight,
      }
    : {};

  const moneyStringSort = (event) => {
    const { field, order } = event;

    const getNum = (o) => {
      return Number(o[field].replace("$", "").replace("\,",""));
      
    };

    const compare = (oa, ob) => {
      const a = getNum(oa);
      const b = getNum(ob);

      if (a > b) return 1 * order;
      if (b > a) return -1 * order;

      return 0;
    };

    return rows.sort(compare);
  };

  const percentageSort = (event) => {
    const { field, order } = event;

    const getNum = (o) => {
      return Number(o[field].replace("%", ""));
    };

    const compare = (oa, ob) => {
      const a = getNum(oa);
      const b = getNum(ob);

      if (a > b) return 1 * order;
      if (b > a) return -1 * order;

      return 0;
    };

    return rows.sort(compare);
  };

  const sortProps = (rows, fieldName) => {
    if (rows && rows.length > 0) {
      const val = rows[0][fieldName];

      if (typeof val === "string") {
        if (val[0] === "$") {
          return {
            sortFunction: moneyStringSort,
          };
        } else if (val.slice(-1) === "%") {
          return {
            sortFunction: percentageSort,
          };
        }
      }
    }

    return {};
  };

  const groupProps =
    rowGroup !== ""
      ? {
          rowGroupMode: "subheader",
          groupField: rowGroup,
          expandableRowGroups: true,
          expandedRows: expandedRows,
          onRowToggle: (e) => setExpandedRows(e.data),
          onRowExpand: onRowGroupExpand,
          onRowCollapse: onRowGroupCollapse,
          rowGroupHeaderTemplate: headerTemplate,
          rowGroupFooterTemplate: footerTemplate,
        }
      : {};

  const setSelectedRowAndGraphData = (row) => {
    setSelectedRow(row);
    //onRowSelected(row);
  };


  return (
    <StyledContainer>
      <div className="datatable-rowgroup-demo datatable-filter-demo datatable-scroll-demo">

        

        <Card>
          <div className="p-d-flex p-jc-between p-ai-center">
                <h1 className="p-m-0">{title}</h1>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    {exportheader}
                </span>
          </div>
          <div className="p-datatable-header"> 
              
            </div>
          {children}
          
          <DataTable
            key={`${title}${rows.length}`}
            
            className="p-datatable-sm"
            style={{
              width: "100%",
            }}
            {...(sortColumns && columns?.length > 0
              ? { frozenWidth: `${columns[0].width.toString()}px` }
              : undefined)}
            selectionMode="single"
            selection={selectedRow}
            onSelectionChange={(e) => setSelectedRowAndGraphData(e.value)}
            scrollable
            resizableColumns={true}
            columnResizeMode="expand"
            value={rows}
            sortMode="single"
            sortField={rowGroup}
            sortOrder={1}
            frozenColumns={1}
            {...groupProps}
            {...paginatorProps}
          >
            {selectedColumns
              .filter((c) => c.field !== "GraphData")
              .map((c, i) => {
                const rendererProps = c.field.includes("_Spark")
                  ? {
                      header: "-> Trend",
                      body: (rowData) => sparkTemplate(rowData, c.field),
                      headerStyle: { width: 150 },
                    }
                  : c.field.includes("Employee")
                  ? {
                    headerStyle: { width: 225 },
                  }          
                  : c.field === "GridRowHeader"
                  ? {
                      header: "",
                      body: (rowData) =>
                        gridRowHeaderTemplate(rowData, c.field),
                      headerStyle: { width: 150 },
                    }
                  : c.field === "Diff"
                  ? {
                      body: (rowData) => formatDiff(rowData, c.field),
                    }
                  : {};

                return (
                  <Column
                    frozen={i === 0 && sortColumns}
                    headerClassName="header-column"
                    key={c.field}
                    field={c.field}
                    header={c.header}
                    sortable={sortColumns}
                    filter={false}
                    filterPlaceholder={"Search"}
                    headerStyle={{ width: c.width }}
                    columnKey={c.field}
                    {...rendererProps}
                    {...sortProps(rows, c.field)}
                  ></Column>
                );
              })}
          </DataTable>
        </Card>
      </div>
    </StyledContainer>
  );
};

export default PrimeDataTable;

const StyledContainer = styled.div`
  .ui-datatable-frozenlayout-left td {
    height: 24px;
  }

  .ui-datatable-frozenlayout-right td {
    height: 24px;
  }

  .p-column-filter {
    width: 100%;
  }

  .p-sortable-column-icon {
    display: flex;
  }

  .datatable-rowgroup-demo .p-rowgroup-footer td {
    font-weight: 700;
  }

  .datatable-rowgroup-demo .p-rowgroup-header span {
    font-weight: 700;
  }

  .datatable-rowgroup-demo .p-rowgroup-header .p-row-toggler {
    vertical-align: middle;
    margin-right: 0.25rem;
  }

  datatable-filter-demo .p-paginator .p-paginator-current {
    margin-left: auto;
  }

  .datatable-filter-demo .p-progressbar {
    height: 0.5rem;
    background-color: #d8dadc;
  }

  .datatable-filter-demo .p-progressbar .p-progressbar-value {
    background-color: #607d8b;
  }

  .datatable-filter-demo .table-header {
    display: flex;
    justify-content: space-between;
  }

  .datatable-filter-demo .p-datepicker {
    min-width: 25rem;
  }

  .datatable-filter-demo .p-datepicker td {
    font-weight: 400;
  }

  .datatable-filter-demo
    .p-datatable.p-datatable-customers
    .p-datatable-header {
    padding: 1rem;
    text-align: left;
    font-size: 1.5rem;
  }

  .datatable-filter-demo .p-datatable.p-datatable-customers .p-paginator {
    padding: 1rem;
  }

  .datatable-filter-demo
    .p-datatable.p-datatable-customers
    .p-datatable-thead
    > tr
    > th {
    text-align: left;
  }

  .datatable-filter-demo
    .p-datatable.p-datatable-customers
    .p-datatable-tbody
    > tr
    > td {
    cursor: auto;
  }

  .datatable-filter-demo
    .p-datatable.p-datatable-customers
    .p-dropdown-label:not(.p-placeholder) {
    text-transform: uppercase;
  }

  .datatable-filter-demo
    .p-datatable-customers
    .p-datatable-tbody
    > tr
    > td
    .p-column-title {
    display: none;
  }

  @media screen and (max-width: 960px) {
    .datatable-filter-demo
      .p-datatable.p-datatable-customers
      .p-datatable-thead
      > tr
      > th,
    .datatable-filter-demo
      .p-datatable.p-datatable-customers
      .p-datatable-tfoot
      > tr
      > td {
      display: none !important;
    }

    .datatable-filter-demo
      .p-datatable.p-datatable-customers
      .p-datatable-tbody
      > tr {
      border-bottom: 1px solid var(--layer-2);
    }

    .datatable-filter-demo
      .p-datatable.p-datatable-customers
      .p-datatable-tbody
      > tr
      > td {
      text-align: left;
      display: block;
      border: 0 none !important;
      width: 100% !important;
      float: left;
      clear: left;
      border: 0 none;
    }

    .datatable-filter-demo
      .p-datatable.p-datatable-customers
      .p-datatable-tbody
      > tr
      > td
      .p-column-title {
      padding: 0.4rem;
      min-width: 30%;
      display: inline-block;
      margin: -0.4rem 1rem -0.4rem -0.4rem;
      font-weight: bold;
    }

    .datatable-filter-demo
      .p-datatable.p-datatable-customers
      .p-datatable-tbody
      > tr
      > td
      .p-progressbar {
      margin-top: 0.5rem;
    }
  }

  .datatable-scroll-demo .loading-text {
    display: block;
    background-color: #f1f1f1;
    min-height: 19px;
    animation: pulse 1s infinite ease-in-out;
    text-indent: -99999px;
    overflow: hidden;
  }
`;
