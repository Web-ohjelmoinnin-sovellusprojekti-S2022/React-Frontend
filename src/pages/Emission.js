import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from "chart.js/auto";
import axios from 'axios';
import 'chartjs-adapter-luxon';

const Temperature = () => {
  const [V4, setV4] = useState("")
  const [isloading, setisloading] = useState(true)

  const GetV4 = () => {
    axios.get("http://localhost:8080/v4/climateV4")
      .then(response => {
        setV4(response.data);
        console.log(V4);
      })

      const data = {
        datasets: [
          {
            label: "DSS",
            data: V4,
            backgroundColor: [
              '#0000FF'
            ],
            parsing: {
              xAxisKey: "dss_year",
              yAxisKey: "dss_ppm",
            }
          }
        ]
      }

       
  useEffect(() => {
    GetV4();
  }, [])

  if(isloading === true){
    return(
      <p>Loading</p>
    )
  }

  else {
    return (
    <>
      <h1>V4</h1>
      <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <div><Line data={data} options={{
            responsive: true,
          }} /></div>
        </div>
      </div>
    </>
  )
  }
  

}
}
export default Temperature