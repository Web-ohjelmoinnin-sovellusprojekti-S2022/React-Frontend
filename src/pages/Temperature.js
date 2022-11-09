import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from "chart.js/auto";
import axios from 'axios';



const productSales = [
  { year: 1993, sales: 500 },
  { year: 1994, sales: 69 },
  { year: 1995, sales: 700 },
  { year: 1996, sales: 700 }
]

export default function Temperature(){
  const [temp, setTemp] = useState([]);
  const [chartData, setChartData] = useState({
    labels: temp.map(d => d.year),
    datasets: [
      {
        label: "Product sales",
        data: temp.map(d => d.anomaly),
        backgroundColor: [
          '#99346C', '#E6DA85', '#E66EB0', '#57D8E6'
        ]
      }
    ],
  })
  useEffect(() => {
    const address = 'http://localhost:8080/v1/climateGlobal';

    axios.get(address)
      .then((response) => {
        console.log(response.data[0]);
        setTemp(response.data[0]);
      }).catch(error => {
        alert(error);
      });
  }, [])

  return (
    <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <div><Bar data={chartData} /></div>
        <div><Line data={chartData} /></div>
        <div><Pie data={chartData} /></div>
      </div>
    </div >
  );
}


