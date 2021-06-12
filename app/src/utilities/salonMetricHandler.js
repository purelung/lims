const randomizeValue = (value, increase) => {
  const rando = Math.random();
  const multiplier = rando > 0.5 || increase ? 1 + rando : 1 - rando;

  return value * multiplier.toFixed(2);
};

const randomizeArrayValues = (array) => {
  return array.map((value) => randomizeValue(value));
};

const randomizeRowValues = (row) => {
  const keys = Object.keys(row);
  let newRow = { ...row };

  keys
    .filter((k) => k !== "salon")
    .forEach((k) => {
      const value = row[k];
      newRow[k] = value.toString().includes(",")
        ? value
            .split(",")
            .map((v) => randomizeValue(v))
            .join(",")
        : randomizeValue(value);
    });

  return newRow;
};

Array.prototype.sum = function (prop) {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i][prop];
  }
  return total;
};

export const getRandomSalonData = (data) => {
  let randomSalonData = new Array(30);

  for (var i = 0; i < randomSalonData.length; i++) {
    randomSalonData[i] = i === 0 ? data[0] : randomizeRowValues(data[0]);
    randomSalonData[i]["salon"] = data[0]["salon"] + i;
  }

  return randomSalonData;
};

export const pivotSalonMetricData = (data) => {
  if (!data || data.length === 0) return [];

  const gridRowMetaData = [
    { header: "Revenue Per Day", columnSumSource: "revenue" },
    { header: "Retail Per Day", columnSumSource: "retail" },
    { header: "Guests Per Day", columnSumSource: "guests" },
    { header: "Cuts Per Day", columnSumSource: "cuts" },
    { header: "Color Per Day", columnSumSource: "color" },

    {
      header: "Service & Product %",
      columnSumSource: "servProd",
      columnDivisorSumSource: "guests",
    },
    {
      header: "SPH",
      columnSumSource: "serviceSales",
      columnDivisorSumSource: "hours",
    },
    {
      header: "Guests Per Hour",
      columnSumSource: "guests",
      columnDivisorSumSource: "hours",
    },
    {
      header: "Retail Per Guest",
      columnSumSource: "retail",
      columnDivisorSumSource: "cuts",
    },
    {
      header: "Discount %",
      columnSumSource: "discount",
      columnDivisorSumSource: "revenue",
    },
  ];

  const getSumDivided = (
    columnSumSource,
    columnDivisorSumSource,
    divisorNumber,
    suffix
  ) => {
    const sum = data.sum(`${columnSumSource}_${suffix}`);
    const divisor = columnDivisorSumSource
      ? data.sum(`${columnDivisorSumSource}_${suffix}`)
      : divisorNumber;
    return (sum / divisor).toFixed(2);
  };

  const getTrendSums = (data, start, end) => {
    let trendSums = [];

    if (!data || data.length === 0) {
      return trendSums;
    }

    let index = 0;
    for (let dataIndex = start; dataIndex < end; dataIndex++) {
      trendSums[index] = data.sum(dataIndex);
      index++;
    }

    return trendSums;
  };

  const gridColumnMetaData = [
    {
      header: "Last 4 Weeks",
      algorithm: (columnSumSource, columnDivisorSumSource) =>
        getSumDivided(columnSumSource, columnDivisorSumSource, 4, "Now_L4"),
    },
    {
      header: "Last 13 Weeks",
      algorithm: (columnSumSource, columnDivisorSumSource) =>
        getSumDivided(columnSumSource, columnDivisorSumSource, 13, "Now_L13"),
    },
    {
      header: "LY Last 4 Weeks",
      algorithm: (columnSumSource, columnDivisorSumSource) =>
        getSumDivided(columnSumSource, columnDivisorSumSource, 4, "LY_L4"),
    },
    {
      header: "GraphData",
      algorithm: (columnSumSource, columnDivisorSumSource) => {
        if (
          !data ||
          data.length === 0 ||
          !data[0][columnSumSource + "_trend"]
        ) {
          return {
            dataLastYear: [],
            dataThisYear: [],
          };
        }

        const trendData = data.map((r) =>
          r[columnSumSource + "_trend"].split(",").map((s) => parseFloat(s))
        );

        const length = trendData[0].length;
        const half = Math.ceil(length / 2);

        return {
          dataLastYear: getTrendSums(trendData, half, length),
          dataThisYear: getTrendSums(trendData, 0, half),
        };
      },
    },
  ];

  const gridData = gridRowMetaData.map((rm) => {
    let gridRow = { GridRowHeader: rm.header };

    gridColumnMetaData.forEach(
      (cm) =>
        (gridRow[cm.header] = cm.algorithm(
          rm.columnSumSource,
          rm.columnDivisorSumSource
        ))
    );

    return gridRow;
  });

  return gridData;
};
