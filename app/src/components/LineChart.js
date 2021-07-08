import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";

import { Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";

export const LineChart = ({ dataSet1, dataSet2 }) => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: dataSet1.label,
        fill: true,
        backgroundColor: "transparent",
        borderColor: "#3A89FF",
        data: dataSet1.data,
      },
      {
        label: dataSet2.label,
        fill: true,
        backgroundColor: "transparent",
        borderColor: "#076aff",
        borderDash: [4, 4],
        data: dataSet2.data,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      intersect: false,
    },
    hover: {
      intersect: true,
    },
    plugins: {
      filler: {
        propagate: false,
      },
    },
    scales: {
      xAxes: [
        {
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.05)",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 500,
          },
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0)",
            fontColor: "#fff",
          },
        },
      ],
    },
  };

  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <Badge color="primary" className="float-right">
          Monthly
        </Badge>
        <CardTitle tag="h5" className="mb-0">
          Average Daily Revenue
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart chart-lg">
          <Line data={data} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};
