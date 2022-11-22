
import {DateTime} from 'luxon';
import 'chartjs-adapter-luxon';
import {Chart} from 'chart.js/auto'
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';



export default function App() {
    const [V4, setV4] = useState("")

    const GetV4 = () => {
      axios.get("http://localhost:8080/v4/climateV4")
        .then(response => {
          setV4(response.data);
          console.log(V4);

        }) .catch(error => {
          alert(error);
        })
      }
       
        useEffect(() => {
          GetV4();
          console.log("sssdas");

        } ,[])

  const options = {
    scales:{
        x:{
            type: 'linear',
            min: 1000,
            max: 2000,
        },
        y: {
            type: 'linear'
        },
    },
    elements:{
      point:{
          radius: 0
      }
    }
  };

  const graphData = {
    datasets: [
      
       {
        showLine: false,
        label: "DSS",
        data: V4,
        backgroundColor: ['#222222'],
        borderColor: '#000000',
        borderWidth: 2,
        parsing:{
          xAxisKey: 'dss_year',
          yAxisKey: 'dss_ppm'
        },
        pointRadius: 2,
      }, 
      
      {
        showLine: false,
        label: "DE08",
        data: V4,
        backgroundColor: ['#42f566'],
        borderColor: '#42f566',
        borderWidth: 2,
        parsing:{
          xAxisKey: 'de08_year',
          yAxisKey: 'de08_ppm'
        },
        pointRadius: 2,
      },
      
       {
        showLine: false,
        label: "DE082",
        data: V4,
        backgroundColor: ['#00000'],
        borderColor: '#000000',
        borderWidth: 2,
        parsing:{
          xAxisKey: 'de082_year',
          yAxisKey: 'de082_ppm'
        },
        pointRadius: 2,
      } 
      
    ],
  }

  return (
     <div style={{ width: '75%'}}>
            <Line options={options} data={graphData}/>
        </div>
  );

}
