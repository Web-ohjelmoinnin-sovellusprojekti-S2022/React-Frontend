import { useEffect, useState } from 'react';
import { Bar, Chart, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from "chart.js/auto";
import axios from 'axios';


const Emission = () => {
  const [chartData, setChartData] = useState({})
  const [years, setYears] = useState({})
  const [country, setCountry] = useState([])
  const [isloading, setisloading] = useState(true)
  const [V9Data, setV9Data] = useState([])
  const [viewData, setViewData] = useState([])
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
        //setisloading(false)
      }).catch(error => {
        alert(error)
        setisloading(true)
      }

      )

  }



  const V9 = () => {
    let emissions = []
    let sector = []

    axios.get("http://localhost:8080/v9/climateV9sector")
      .then(response => {
        for (const dataObj of response.data) {
          sector.push(dataObj.sector)
          emissions.push(dataObj.emissions)
        }
        setV9Data({
          labels: sector,
          datasets: [{
            data: emissions,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(105, 25, 10)'
            ],
            hoverOffset: 20
          }]
        })
        setisloading(false)
      })

  }

  const countries = country.map(element => {
    return element.toLowerCase();
  })

  country.sort()
  let dynamicColors = function () {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return "rgb(" + r + ',' + g + ',' + b + ")";
  }

  for (let i = 0; i < country.length; i++) {
    let coloR = []
    coloR.push(dynamicColors())
    const ok = []
    let text = countries[i].toString()

    for (let j = 0; j < chartData.length; j++) {
      ok.push(chartData[j][text])
    }
    datasets.push({
      label: country[i],
      data: ok,
      borderColor: coloR,
      backgroundColor: coloR,
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

  function subSectors(e) {
    let subEmissions = []
    let subSectors = []
    setViewData(e.chart.tooltip.dataPoints?.[0]?.label)
    if (e.chart.tooltip.dataPoints?.[0]?.label === "Energy") {
      axios.get("http://localhost:8080/v9/climateV9subSector")
        .then(response => {
          for (const dataObj of response.data) {
            if (dataObj.sector === "Transport" || dataObj.sector === "Energy in buildings (elec and heat)" || dataObj.sector === "Energy in industry"
              || dataObj.sector === "Energy in Agri & Fishing" || dataObj.sector === "Unallocated fuel combustion" || dataObj.sector === "Fugitive emissions from energy") {
              subSectors.push(dataObj.sector)
              subEmissions.push(dataObj.emissions)
            }

          }
          setV9Data({
            labels: subSectors,
            datasets: [{
              data: subEmissions,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(105, 205, 10)',
                'rgb(105, 25, 100)',
                'rgb(155, 250, 10)'
              ],
              hoverOffset: 20
            }]
          })
          setisloading(false)
        })

    } else if (e.chart.tooltip.dataPoints?.[0]?.label === "Industrial processes") {
      axios.get("http://localhost:8080/v9/climateV9subSector")
        .then(response => {
          for (const dataObj of response.data) {
            if (dataObj.sector === "Cement" || dataObj.sector === "Chemical & petrochemical (industrial)") {
              subSectors.push(dataObj.sector)
              subEmissions.push(dataObj.emissions)
            }

          }
          setV9Data({
            labels: subSectors,
            datasets: [{
              data: subEmissions,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)'
              ],
              hoverOffset: 20
            }]
          })
          setisloading(false)
        })

    } else if (e.chart.tooltip.dataPoints?.[0]?.label === "Agriculture. Forestry & Land Use (AFOLU)") {
      axios.get("http://localhost:8080/v9/climateV9subSector")
        .then(response => {
          for (const dataObj of response.data) {
            if (dataObj.sector === "Livestock & Manure" || dataObj.sector === "Rice Cultivation" || dataObj.sector === "Agricultural Soils"
              || dataObj.sector === "Crop Burning" || dataObj.sector === "Forest Land" || dataObj.sector === "Cropland" || dataObj.sector === "Grassland") {
              subSectors.push(dataObj.sector)
              subEmissions.push(dataObj.emissions)
            }

          }
          setV9Data({
            labels: subSectors,
            datasets: [{
              data: subEmissions,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(105, 205, 10)',
                'rgb(105, 25, 100)',
                'rgb(155, 250, 10)',
                'rgb(155, 250, 200)'
              ],
              hoverOffset: 20
            }]
          })
          setisloading(false)
        })

    } else if (e.chart.tooltip.dataPoints?.[0]?.label === "Waste") {
      axios.get("http://localhost:8080/v9/climateV9subSector")
        .then(response => {
          for (const dataObj of response.data) {
            if (dataObj.sector === "Landfills" || dataObj.sector === "Wastewater") {
              subSectors.push(dataObj.sector)
              subEmissions.push(dataObj.emissions)
            }

          }
          setV9Data({
            labels: subSectors,
            datasets: [{
              data: subEmissions,
              backgroundColor: [
                'rgb(255, 205, 86)',
                'rgb(255, 205, 200)'
              ],
              hoverOffset: 20
            }]
          })
          setisloading(false)
        })

    } else if (e.chart.tooltip.dataPoints?.[0]?.label === "Transport") {
      axios.get("http://localhost:8080/v9/climateV9subSectorDetail")
        .then(response => {
          for (const dataObj of response.data) {
            if (dataObj.sector === "Road" || dataObj.sector === "Aviation" || dataObj.sector === "Rail"
              || dataObj.sector === "Pipeline" || dataObj.sector === "Ship") {
              subSectors.push(dataObj.sector)
              subEmissions.push(dataObj.emissions)
            }

          }
          setV9Data({
            labels: subSectors,
            datasets: [{
              data: subEmissions,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(105, 205, 10)',
                'rgb(105, 25, 100)'
              ],
              hoverOffset: 20
            }]
          })
          setisloading(false)
        })


    } else if (e.chart.tooltip.dataPoints?.[0]?.label === "Energy in buildings (elec and heat)") {
      axios.get("http://localhost:8080/v9/climateV9subSectorDetail")
        .then(response => {
          for (const dataObj of response.data) {
            if (dataObj.sector === "Residential" || dataObj.sector === "Commercial") {
              subSectors.push(dataObj.sector)
              subEmissions.push(dataObj.emissions)
            }

          }
          setV9Data({
            labels: subSectors,
            datasets: [{
              data: subEmissions,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 205, 200)'
              ],
              hoverOffset: 20
            }]
          })
          setisloading(false)
        })


    }
    else if (e.chart.tooltip.dataPoints?.[0]?.label === "Energy in industry") {
      axios.get("http://localhost:8080/v9/climateV9subSectorDetail")
        .then(response => {
          for (const dataObj of response.data) {
            if (dataObj.sector === "Iron & Steel" || dataObj.sector === "Non-ferous metals" || dataObj.sector === "Machinery" || dataObj.sector === "Food and tobacco"
              || dataObj.sector === "Paper. pulp & printing" || dataObj.sector === "Chemical & petrochemical (energy)" || dataObj.sector === "Other industry") {
              subSectors.push(dataObj.sector)
              subEmissions.push(dataObj.emissions)
            }

          }
          setV9Data({
            labels: subSectors,
            datasets: [{
              data: subEmissions,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(105, 205, 10)',
                'rgb(105, 25, 100)',
                'rgb(155, 250, 10)',
                'rgb(155, 250, 200)'
              ],
              hoverOffset: 20
            }]
          })
          setisloading(false)
        })
    }
    else if (e.chart.tooltip.dataPoints?.[0]?.label === "Fugitive emissions from energy") {
      axios.get("http://localhost:8080/v9/climateV9subSectorDetail")
        .then(response => {
          for (const dataObj of response.data) {
            if (dataObj.sector === "Coal" || dataObj.sector === "Oil & Natural Gas") {
              subSectors.push(dataObj.sector)
              subEmissions.push(dataObj.emissions)
            }

          }
          setV9Data({
            labels: subSectors,
            datasets: [{
              data: subEmissions,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(255, 205, 200)'
              ],
              hoverOffset: 20
            }]
          })
          setisloading(false)
        })
    }
  }

  function mainView(e) {
    e.preventDefault();
    let subEmissions = []
    let subSectors = []
    let emissions = []
    let sector = []
    if (V9Data.labels[0] != "Energy") {
      axios.get("http://localhost:8080/v9/climateV9subSector")
        .then(response => {
          for (const dataObj of response.data) {
            if (dataObj.sector === "Transport" || dataObj.sector === "Energy in buildings (elec and heat)" || dataObj.sector === "Energy in industry"
              || dataObj.sector === "Energy in Agri & Fishing" || dataObj.sector === "Unallocated fuel combustion" || dataObj.sector === "Fugitive emissions from energy") {
              subSectors.push(dataObj.sector)
              subEmissions.push(dataObj.emissions)
            }

          }
          setV9Data({
            labels: subSectors,
            datasets: [{
              data: subEmissions,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(105, 205, 10)',
                'rgb(105, 25, 100)',
                'rgb(155, 250, 10)'
              ],
              hoverOffset: 20
            }]
          })
          setisloading(false)
        })

    } if (V9Data.labels[0] === "Transport" || V9Data.labels[0] === "Livestock & Manure" || V9Data.labels[0] === "Landfills" || V9Data.labels[0] === "Cement") {
      axios.get("http://localhost:8080/v9/climateV9sector")
        .then(response => {
          for (const dataObj of response.data) {
            sector.push(dataObj.sector)
            emissions.push(dataObj.emissions)
          }
          setV9Data({
            labels: sector,
            datasets: [{
              data: emissions,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(105, 25, 10)'
              ],
              hoverOffset: 20
            }]
          })
          setisloading(false)
        })
    } if (V9Data.labels[0] === "Energy") {
      axios.get("http://localhost:8080/v9/climateV9sector")
        .then(response => {
          for (const dataObj of response.data) {
            sector.push(dataObj.sector)
            emissions.push(dataObj.emissions)
          }
          setV9Data({
            labels: sector,
            datasets: [{
              data: emissions,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(105, 25, 10)'
              ],
              hoverOffset: 20
            }]
          })
          setisloading(false)
        })
    }

  }


  const optionsV9 = {
    type: 'doughnut',
    responsive: true,
    layout: {
      padding: {
        bottom: 10
      }
    },
    onClick: (e) => {
      subSectors(e)
    }

  }


  let jaa = years.toString()
  let year = jaa.split(',')
  const data = {
    labels: year,
    datasets: datasets
  };

  useEffect(() => {
    V8()
    V8Countries()
    V9()
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
            <h1>Maakohtaiset CO2-päästöt</h1>
            <br/>
            <div><Line data={data} options={options}/></div>
            <br/>
            <h1>CO2-päästöt toimialoittain</h1>
            <br/>
            <div><Doughnut data={V9Data} options={optionsV9} /> </div>
          </div>
          <form onSubmit={e => mainView(e)}>
            <button>Takaisin</button>
          </form>

        </div>
      </>
    )
  }


}
export default Emission