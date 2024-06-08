import { CChart } from "@coreui/react-chartjs";
import React from "react";

const useChart = (labels, label, datas, charttype, chartaxis, chartheight) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: datas,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
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

export default useChart;
