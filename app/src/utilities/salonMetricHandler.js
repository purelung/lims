Array.prototype.sum = function (prop) {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i][prop];
  }
  return total;
};

const relDiff = (a, b) => {
  return (100 * (a - b)) / ((a + b) / 2);
};

const formatValue = (value, type) => {
  switch (type) {
    case "dollars":
      return value < 0
        ? `($${Math.abs(value).toFixed(2)})`
        : `$${value.toFixed(2)}`;
    case "percentage":
      return `${(value * 100).toFixed(1)}%`;
    default:
      return value % 1 === 0 ? value : value.toFixed(1);
  }
};

export const pivotSalonMetricData = (data) => {
  if (!data || data.length === 0) return [];

  const gridRowMetaData = [
    {
      header: "Revenue",
      columnSumSource: "Revenue",
      diffFormat: "dollars",
    },
    {
      header: "Retail",
      columnSumSource: "Retail",
      diffFormat: "dollars",
    },
    { header: "Guests", columnSumSource: "Guest" },
    { header: "Cuts", columnSumSource: "Cut" },
    { header: "Color", columnSumSource: "Color" },
    {
      header: "Service & Product %",
      columnSumSource: "SAP",
      columnDivisorSumSource: "Guest",
      diffFormat: "percentage",
    },
    {
      header: "Services Per Hour",
      columnSumSource: "Service",
      columnDivisorSumSource: "Hours",
    },
    {
      header: "Guests Per Hour",
      columnSumSource: "Guest",
      columnDivisorSumSource: "Hours",
    },
    {
      header: "Retail Per Guest",
      columnSumSource: "Retail",
      columnDivisorSumSource: "Guest",
      diffFormat: "dollars",
    },
    {
      header: "Discount %",
      columnSumSource: "Discount",
      columnDivisorSumSource: "Discount",
      columnDivisorSumSource2: "Revenue",
      diffFormat: "percentage",
    },
    {
      header: "Average Ticket",
      columnSumSource: "Revenue",
      columnDivisorSumSource: "Guest",
      diffFormat: "dollars",
    },
  ];

  const getSumDivided = (rowMetaData, suffix) => {
    const { columnSumSource, columnDivisorSumSource, columnDivisorSumSource2 } =
      rowMetaData;
    const sum = data.sum(`${columnSumSource}_${suffix}`);
    let divisor = columnDivisorSumSource
      ? data.sum(`${columnDivisorSumSource}_${suffix}`)
      : 1;
    divisor = columnDivisorSumSource2
      ? data.sum(`${columnDivisorSumSource2}_${suffix}`) + divisor
      : divisor;
    return (sum / divisor).toFixed(2);
  };

  const gridColumnMetaData = [
    {
      header: "Period",
      algorithm: (rowMetaData) => getSumDivided(rowMetaData, "TP"),
    },
    {
      header: "LLY Period",
      algorithm: (rowMetaData) => getSumDivided(rowMetaData, "LP"),
    },
  ];

  const gridData = gridRowMetaData.map((rowMetaData) => {
    let gridRow = { GridRowHeader: rowMetaData.header };

    gridColumnMetaData.forEach((columnMetaData) => {
      gridRow[columnMetaData.header] = columnMetaData.algorithm(rowMetaData);
    });

    const thisYear = parseFloat(gridRow["Period"]);
    const lastYear = parseFloat(gridRow["LLY Period"]);

    gridRow["Diff"] = formatValue(thisYear - lastYear, rowMetaData.diffFormat);
    gridRow["Diff %"] = `${relDiff(thisYear, lastYear).toFixed(1)}%`;

    return gridRow;
  });

  return gridData;
};
