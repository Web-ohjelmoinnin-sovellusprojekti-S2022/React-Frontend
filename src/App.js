import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2'
import {Chart as ChartJs} from "chart.js/auto"
const productSales = [
  {year: 1993, sales: 500},
  {year: 1994, sales: 69},
  {year: 1995, sales: 700},
  {year: 1996, sales: 700}
]


function App() {
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
    <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
      <div><Bar data={chartData}/></div>
      <div><Line data={chartData}/></div>
      <div><Pie data={chartData}/></div>
    </div>
  );
}

export default App;
