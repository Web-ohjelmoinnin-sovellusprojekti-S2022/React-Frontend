import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from "chart.js/auto";
import axios from 'axios';


const Emission = () => {
  const [chartData, setChartData] = useState({})
  const [chartDataV9, setChartDataV9] = useState({})
  const [years, setYears] = useState({})
  const [country, setCountry] = useState([])
  const [dataset, setDataset] = useState([])
  const [isloading, setisloading] = useState(true)
  let datasets = []

  const V8 = () => {
    let year = []
    
    axios.get("http://localhost:8080/v8/climateV8")
      .then(response => {
        setChartData(response.data)
        
        for (const dataObj of response.data) {
        year.push(dataObj.year)
        }
       
        setYears(year)
       
        
      setisloading(false)
      }).catch(error => {
        alert(error)
        setisloading(true)
      }

      )
   
  }
  const V8Countries = () => {
    axios.get("http://localhost:8080/v8/climateV8countries")
      .then(response => {
      
        
        for (const dataObj of response.data) {
          setCountry(country => [...country, dataObj.country.replace('\r', '')])
          }
          setisloading(false)
      }).catch(error => {
        alert(error)
        setisloading(true)
      }

      )
   
  }
  const V9 = () => {
    axios.get("http://localhost:8080/v8/climateV8countries")
      .then(response => {
      
          setisloading(false)
      }).catch(error => {
        alert(error)
        setisloading(true)
      }

      )
   
  }


  const countries = country.map(element => {
    return element.toLowerCase();
    })

  country.sort()
  let dynamicColors = function() {
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    return "rgb(" + r + ',' + g + ',' + b + ")";
  }
  
  for (let i = 0; i < country.length; i++) {
    let coloR = []
    coloR.push(dynamicColors())
    const ok = []
    let text = countries[i].toString()

  for (let j = 0; j < chartData.length; j++){
    ok.push(chartData[j][text])
  }
    datasets.push({
        label: country[i],
        data: ok,
        borderColor: coloR,
        backgroundColor:  coloR,
        parsing: {
          xAxisKey: 'year',
          yAxisKey: country[i]
      },
    })
  }

  const options = {
    type: 'line',
    responsive: true,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    pointRadius: 0,
    fill: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Vuodet'
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Maakohtaiset CO2-päästöt '
        }
      }
    }

  };
  let jaa = years.toString()
  let year = jaa.split(',')
  const data = {
    labels: year,
    datasets: datasets
  };


  useEffect(() => {
    V8()
    V8Countries()
  }, [])

  if (isloading === true) {
    return (
      <p>Loading</p>
    )
  }

  else {
    return (
      <>
        <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <div><Line data={data} options={options}/></div>
          </div>
        </div>
      </>
    )
  }


}
export default Emission