import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const Chart = ({ history }) => {
  const { theme } = useSelector((state) => state.crypto);
  let timestamps = [];
  let prices = [];

  for (let i = 0; i < history.length; i += 1) {
    prices.push(parseFloat(history[i].price).toFixed(2));
  }
  for (let i = 0; i < history.length; i += 1) {
    timestamps.push(new Date(history[i].timestamp).toLocaleDateString());
  }

  const series = [{ name: "price", data: prices }];

  let options = {
    colors: ["#4FD1C5"],
    chart: {
      type: "area",
      zoom: {
        enabled: false,
      },
      foreColor: theme.mode === "dark" ? "#4FD1C5" : "#000",
    },
    fill: {
      colors: ["#4FD1C5"],
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: ["#F44336"],
      },
    },
    stroke: {
      curve: "straight",
    },

    title: {
      text: "Fundamental Analysis of Price in USD",
      align: "left",
      style: {
        color: theme.mode === "dark" ? "#4FD1C5" : "#000",
      },
    },
    subtitle: {
      text: "Price Movements",
      align: "left",
      style: {
        color: theme.mode === "dark" ? "#4FD1C5" : "#000",
      },
    },
    labels: timestamps,
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
    grid: {
      show: false,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  return (
    <>
      <ReactApexChart
        series={series}
        options={options}
        type="area"
        height={window.innerHeight / 1.6}
      />
    </>
  );
};

export default Chart;
