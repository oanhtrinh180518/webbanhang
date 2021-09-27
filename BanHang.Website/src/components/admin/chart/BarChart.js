import React from "react";
import { Bar } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const BarChart = ({ chartData }) => {
  //console.log(chartData)
  const values = chartData.map((x) => x.total);
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
        // barPercentage: 0.5,
        // barThickness: 15,
        maxBarThickness: 30,
        minBarLength: 20,
        label: "Proceeds",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(25,207,203,0.2)",
          "rgba(239,76,35,0.86)",
          "rgba(55,177,28,0.2)",
          "rgba(4,65,236,0.2)",
          "rgba(173,183,32,0.2)",
          "rgba(200,23,23,0.2)",
          "rgba(199,35,205,0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(25,207,203,0.2)",
          "rgba(239,76,35,0.86)",
          "rgba(55,177,28,0.2)",
          "rgba(4,65,236,0.2)",
          "rgba(173,183,32,0.2)",
          "rgba(200,23,23,0.2)",
          "rgba(199,35,205,0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Bar width={100} height={50} data={data} options={options} />
    </>
  );
};

export default BarChart;
