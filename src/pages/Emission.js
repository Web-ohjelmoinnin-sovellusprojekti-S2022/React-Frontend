import { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from "chart.js/auto";
const productSales = [
  { mutsis: 1993, paino: 500 },
  { mutsis: 1994, paino: 69 },
  { mutsis: 1995, paino: 700 },
  { mutsis: 1996, paino: 700 }
]


function Chart() {
  const [chartData, setChartData] = useState({
    labels: productSales.map(d => d.mutsis),
    datasets: [
      {
        label: "Product sales",
        data: productSales.map(d => d.paino),
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