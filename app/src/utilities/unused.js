// const randomizeValue = (value, increase) => {
//     const rando = Math.random();
//     const multiplier = rando > 0.5 || increase ? 1 + rando : 1 - rando;

//     return value * multiplier.toFixed(2);
//   };

//   const randomizeArrayValues = (array) => {
//     return array.map((value) => randomizeValue(value));
//   };

//   const randomizeRowValues = (row) => {
//     const keys = Object.keys(row);
//     let newRow = { ...row };

//     keys
//       .filter((k) => k !== "salon")
//       .forEach((k) => {
//         const value = row[k];
//         newRow[k] = value.toString().includes(",")
//           ? value
//               .split(",")
//               .map((v) => randomizeValue(v))
//               .join(",")
//           : randomizeValue(value);
//       });

//     return newRow;
//   };

// export const getRandomSalonData = (data) => {
//     let randomSalonData = new Array(30);

//     for (var i = 0; i < randomSalonData.length; i++) {
//       randomSalonData[i] = i === 0 ? data[0] : randomizeRowValues(data[0]);
//       randomSalonData[i]["salon"] = data[0]["salon"] + i;
//     }

//     return randomSalonData;
//   };

// const getTrendSums = (data, start, end) => {
//     let trendSums = [];

//     if (!data || data.length === 0) {
//       return trendSums;
//     }

//     let index = 0;
//     for (let dataIndex = start; dataIndex < end; dataIndex++) {
//       trendSums[index] = data.sum(dataIndex);
//       index++;
//     }

//     return trendSums;
//   };

// {
//   header: "GraphData",
//   algorithm: (columnSumSource, columnDivisorSumSource) => {
//     if (
//       !data ||
//       data.length === 0 ||
//       !data[0][columnSumSource + "_trend"]
//     ) {
//       return {
//         dataLastYear: [],
//         dataThisYear: [],
//       };
//     }

//     const trendData = data.map((r) =>
//       r[columnSumSource + "_trend"].split(",").map((s) => parseFloat(s))
//     );

//     const length = trendData[0].length;
//     const half = Math.ceil(length / 2);

//     return {
//       dataLastYear: getTrendSums(trendData, half, length),
//       dataThisYear: getTrendSums(trendData, 0, half),
//     };
//   },
// },
