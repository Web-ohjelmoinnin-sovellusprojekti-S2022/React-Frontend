import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from "chart.js/auto";
import axios from 'axios';

const Emission = () => {
  const [chartData, setChartData] = useState({})
  const [isloading, setisloading] = useState(true)

  const V8 = () => {
    let year = []
    let anomaly = []
    axios.get("http://localhost:8080/v8/climateV8")
      .then(response => {
        for (const dataObj of response.data) {
          year.push(parseInt(dataObj.year))
          anomaly.push(dataObj.anomaly)
        }
        setChartData({
          labels: year,
          datasets: [
            {
              label: 'Anomaly',
              data: anomaly,
              backgroundColor: [
                '#0000FF'
              ]
            }
          ],
        })
        setisloading(false)
      }).catch(error => {
        alert(error)
        setisloading(true)
      }

      )
      const config = {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked
            },
            tooltip: {
              mode: 'index'
            },
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: 'Value'
              }
            }
          }
        }
      };
  }

  useEffect(() => {
    V8()
  }, [])

  if(isloading === true){
    return(
      <p>Loading</p>
    )
  }

  else {
    return (
    <>
      <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <div><Line data={chartData} options={{
            responsive: true,
          }} /></div>
        </div>
      </div>
    </>
  )
  }
  

}
export default Emission