import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from "chart.js/auto";
import axios from 'axios';

const Temperature = () => {
  const [chartData, setChartData] = useState({})
  const [isloading, setisloading] = useState(true)

  const Chart = () => {
    let year = []
    let anomaly = []
    axios.get("http://localhost:8080/v1/climateGlobal")
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
            }
          ],
        })
        setisloading(false)
      }).catch(error => {
        alert(error)
        setisloading(true)
      }

      )
  }

  useEffect(() => {
    Chart()
  }, [])

  if(isloading === true){
    return(
      <p>Loading</p>
    )
  }

  else {
    return (
    <>
      <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} class="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <div><Bar data={chartData} options={{
            responsive: true,
          }} /></div>
        </div>
      </div>
    </>
  )
  }
  

}
export default Temperature