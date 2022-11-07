import { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from "chart.js/auto";
const productSales = [
  { year: 1993, sales: 500 },
  { year: 1994, sales: 69 },
  { year: 1995, sales: 700 },
  { year: 1996, sales: 700 }
]


function Chart() {
  const [chartData, setChartData] = useState({
    labels: productSales.map(d => d.year),
    datasets: [
      {
        label: "Product sales",
        data: productSales.map(d => d.sales),
        backgroundColor: [
          '#99346C', '#E6DA85', '#E66EB0', '#57D8E6'
        ]
      }
    ],
  })

  return (
    <div id='chart' style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}} class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
      <div><Bar data={chartData}/></div>
      <div><Line data={chartData}/></div>
      <div><Pie data={chartData}/></div>
    </div>
</div >
  );
}

export default Chart;