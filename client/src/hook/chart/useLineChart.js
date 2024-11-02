import { CChart } from "@coreui/react-chartjs";
import React from "react";

const useLineChart = (
  labels,
  charttype,
  chartaxis,
  chartheight,
  label1,
  data1,
  label2,
  data2,
  label3,
  data3
) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label1,
        data: data1,
        fill: false,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235)"],
        tension: 0,
      },
      {
        label: label2,
        data: data2,
        fill: false,
        backgroundColor: ["rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 159, 64, 0.50)"],
        tension: 0,
      },
      {
        label: label3,
        data: data3,
        fill: false,
        backgroundColor: ["rgba(255, 205, 86, 0.2)"],
        borderColor: ["rgba(255, 205, 86, 0.50)"],
        tension: 0,
      },
    ],
  };
  const chart = (
    <CChart
      className="px-3 d-flex flex-column align-items-center text-center"
      style={{ height: chartheight }}
      type={charttype}
      data={data}
      options={{
        indexAxis: chartaxis,
        events: [],
      }}
    />
  );
  return [chart];
};

export default useLineChart;
