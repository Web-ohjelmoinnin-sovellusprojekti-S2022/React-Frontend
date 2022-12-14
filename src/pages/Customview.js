import { useEffect, useState } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import Temperature from './V1-2';
import { DateTime } from 'luxon';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from "chart.js";
import { Form, Button } from 'react-bootstrap';


Chart.register(zoomPlugin)

function CustomView() {

  //Annetaan arvo ihmiskunnan merkkipaaluille, jotta ne näkyvät kaavioissa sopivalla korkeudella
  function giveValue(dataObj) {
    return { ...dataObj, value: 1 }
  }
  function giveValueHigh(dataObj) {
    return { ...dataObj, value: 350 }
  }

  //--------------------------------------------------------------------------------------------
  //Funktiot kenttien nimien muuttamiseen ja luxondate kännöksiin
  function convertToLuxonDate1(dataObj) {
    return { ...dataObj, year: DateTime.fromISO(dataObj.dss_year) }
  }
  function convertToLuxonDate2(dataObj) {
    return { ...dataObj, year: DateTime.fromISO(dataObj.de082_year) }
  }
  function convertToLuxonDate3(dataObj) {
    return { ...dataObj, year: DateTime.fromISO(dataObj.de08_year) }
  }
  function convertToLuxonDate(dataObj) {
    return { ...dataObj, year: DateTime.fromISO(dataObj.year) }
  }
  function convertToLuxonDateV1(dataObj) {
    return { ...dataObj, year1: DateTime.fromISO(dataObj.year1) }
  }
  function convertToLuxonDateV2(dataObj) {
    return { ...dataObj, year2: DateTime.fromISO(dataObj.year2) }
  }
  function convert(dataObj) {
    return { ...dataObj, year2: dataObj.year }
  }
  function convertM(dataObj) {
    return { ...dataObj, year1: dataObj.year }
  }
  function convertYearly(dataObj) {
    return { ...dataObj, anomalyG: dataObj.anomaly_g, anomalyN: dataObj.anomaly_n, anomalyS: dataObj.anomaly_s }
  }

  //Tilamuuttujat
  const [chartData, setChartData] = useState({})
  const [isloading, setisloading] = useState(true)
  const [createView, setCreateView] = useState(false)
  const [V1, setV1] = useState(false)
  const [V3, setV3] = useState(false)
  const [V5, setV5] = useState(false)
  const [V6, setV6] = useState(false)
  const [V7, setV7] = useState(false)
  const [V8, setV8] = useState(false)
  const [V9, setV9] = useState(false)
  const [gridView, setGridView] = useState(false);
  const [chartV3M, setChartV3M] = useState({})
  const [chartV5, setChartV5] = useState({})
  const [chartV6, setChartV6] = useState({})
  const [chartV7, setChartV7] = useState({})
  const [chartDataV8, setChartDataV8] = useState({})
  const [years, setYears] = useState({})
  const [country, setCountry] = useState([])
  const [V9Data, setV9Data] = useState([])
  const [textV1, setTextV1] = useState("")
  const [textV3, setTextV3] = useState("")
  const [textV5, setTextV5] = useState("")
  const [textV6, setTextV6] = useState("")
  const [textV7, setTextV7] = useState("")
  const [textV8, setTextV8] = useState("")
  const [textV9, setTextV9] = useState("")

  //Customview -muuttujat
  const [V1text, setV1text] = useState("")
  const [V3text, setV3text] = useState("")
  const [V5text, setV5text] = useState("")
  const [V6text, setV6text] = useState("")
  const [V7text, setV7text] = useState("")
  const [V8text, setV8text] = useState("")
  const [V9text, setV9text] = useState("")
  const [gridview, setgridview] = useState(false)
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [id, setID] = useState(0)
  const [owner, setOwner] = useState(localStorage.getItem("token"))


  //Ns. apumuuttujat
  let datasets = []
  let dataV1 = []
  let year1 = []
  let co2_ppm = []
  let year = []
  let ppmv = []
  let dataV3 = []
  let dataV7A = []
  let yearV8 = []
  let emissions = []
  let sector = []

  //V1 ja V2 kutsut
  let V1Axios = "http://localhost:8080/v1/climateV1"
  let V1M = "http://localhost:8080/v1/climateV1monthly"
  let V2Data = "http://localhost:8080/v2/climateV2"
  const requestV1Axios = axios.get(V1Axios);
  const requestV1M = axios.get(V1M);
  const requestV2 = axios.get(V2Data);

  //V3 kutsut
  let one = "http://localhost:8080/v3/climateV3"
  let two = "http://localhost:8080/v3/climateV3monthly"
  let three = "http://localhost:8080/v4/climateV4"
  const requestOne = axios.get(one);
  const requestTwo = axios.get(two);
  const reuestThree = axios.get(three);

  //V7 ja 10 kutsut
  let V7Data = "http://localhost:8080/v7/climateV7"
  let V10 = "http://localhost:8080/v10/climateV10"
  const requestV7 = axios.get(V7Data);
  const requestV10 = axios.get(V10);

  //V1 ja 2 kutsut
  const Chart = () => {

    axios.all([requestV1Axios, requestV1M, requestV2]).then(axios.spread((...responses) => {
      for (const dataObj of responses[0].data) {
        dataV1.push(convertYearly(dataObj))
      }
      for (const dataObj of responses[1].data) {
        dataV1.push(convertM(dataObj))
      }
      for (const dataObj of responses[2].data) {
        dataV1.push(convert(dataObj))
      }
     //Asetetaan data kaaviolle
      setChartData({
        datasets: [
          {
            label: 'Maailmanlaajuiset lämpötilapoikkeamat 1850-2022',
            data: dataV1.map(d => convertToLuxonDate(d)),
            backgroundColor: [
              '#8A459A'
            ],
            borderColor: '#8A459A',
            parsing: {
              xAxisKey: 'year',
              yAxisKey: 'anomalyG'
            },
          },
          {
            label: 'Pohjoiset lämpötilapoikkeamat 1850-2022',
            data: dataV1.map(d => convertToLuxonDate(d)),
            backgroundColor: [
              '#D0D700'
            ],
            borderColor: '#D0D700',
            parsing: {
              xAxisKey: 'year',
              yAxisKey: 'anomalyN'
            },
          },
          {
            label: 'Eteläiset lämpötilapoikkeamat 1850-2022',
            data: dataV1.map(d => convertToLuxonDate(d)),
            backgroundColor: [
              '#FF0000'
            ],
            borderColor: '#FF0000',
            parsing: {
              xAxisKey: 'year',
              yAxisKey: 'anomalyS'
            },
          },
          {
            label: 'Maailmanlaajuiset lämpötilapoikkeamat 1850-2022 kuukausittain',
            data: dataV1.map(d => convertToLuxonDateV1(d)),
            backgroundColor: [
              '#00FFDC'
            ],
            borderColor: '#00FFDC',
            parsing: {
              xAxisKey: 'year1',
              yAxisKey: 'anomaly_g'
            },
          },
          {
            label: 'Pohjoiset lämpötilapoikkeamat 1850-2022 kuukausittain',
            data: dataV1.map(d => convertToLuxonDateV1(d)),
            backgroundColor: [
              '#0051FF'
            ],
            borderColor: '#0051FF',
            parsing: {
              xAxisKey: 'year1',
              yAxisKey: 'anomaly_n'
            },
          },
          {
            label: 'Eteläiset lämpötilapoikkeamat 1850-2022 kuukausittain',
            data: dataV1.map(d => convertToLuxonDateV1(d)),
            backgroundColor: [
              '#F700FF'
            ],
            borderColor: '#F700FF',
            parsing: {
              xAxisKey: 'year1',
              yAxisKey: 'anomaly_s'
            },
          },
          {
            label: 'Anders Mobergin et al. Paleoklimatologiset lämpötilatiedot',
            data: dataV1.map(d => convertToLuxonDateV2(d)),
            backgroundColor: [
              '#34D700'
            ],
            borderColor: '#34D700',
            parsing: {
              xAxisKey: 'year2',
              yAxisKey: '_t'
            },
          }

        ],
      })

    })).catch(error => {
      alert(error)
      setisloading(true)
    })
    axios.all([requestOne, requestTwo, reuestThree, requestV10]).then(axios.spread((...responses) => {
      for (const dataObj of responses[0].data) {
        dataV3.push(dataObj)

      }
      for (const dataObj of responses[1].data) {
        dataV3.push(dataObj)

      }
      for (const dataObj of responses[2].data) {
        dataV3.push(dataObj)

      }
      for (const dataObj of responses[3].data) {
        dataV3.push(giveValueHigh(dataObj))

      }
      setChartV3M({
        datasets: [
          {
            label: 'Havaijin Mauna Loan ilmakehän hiilidioksidipitoisuudet',
            data: dataV3.map(d => convertToLuxonDate(d)),
            backgroundColor: [
              '#8A459A'
            ],
            borderColor: '#8A459A',
            parsing: {
              xAxisKey: 'year',
              yAxisKey: '_mean'
            },
          },
          {

            label: 'Havaijin Mauna Loan ilmakehän hiilidioksidipitoisuudet kuukausittain',
            data: dataV3.map(d => convertToLuxonDate(d)),
            backgroundColor: [
              '#0000FF'
            ],
            borderColor: '#0000FF',
            parsing: {
              xAxisKey: 'year',
              yAxisKey: 'mean'
            },
          },
          {
            showLine: true,
            label: "DSS",
            data: dataV3.map(d => convertToLuxonDate1(d)),
            backgroundColor: '#222222',
            borderColor: '#000000',
            borderWidth: 2,
            parsing: {
              xAxisKey: 'year',
              yAxisKey: 'dss_ppm'
            },

          },

          {
            showLine: true,
            label: "DE08",
            data: dataV3.map(d => convertToLuxonDate3(d)),
            backgroundColor: '#42f566',
            borderColor: '#42f566',
            borderWidth: 2,
            parsing: {
              xAxisKey: 'year',
              yAxisKey: 'de08_ppm'
            },

          },

          {
            showLine: true,
            label: "DE082",
            data: dataV3.map(d => convertToLuxonDate2(d)),
            backgroundColor: '#FF0000',
            borderColor: '#FF0000',
            borderWidth: 2,
            parsing: {
              xAxisKey: 'year',
              yAxisKey: 'de082_ppm'
            },

          },
          {
            showLine: false,
            label: 'Tapahtumat',
            data: dataV3.map(d => convertToLuxonDate(d)),
            borderColor: '#00FFCD',
            backgroundColor: '#00FFCD',
            parsing: {
              xAxisKey: 'year',
              yAxisKey: 'value'
            },
            pointRadius: 12,
          }
        ],
      })
    })).catch(error => {
      alert(error)
      setisloading(true)
    })

    axios.get("http://localhost:8080/v5/climateV5")
      .then(response => {
        for (const dataObj of response.data) {
          year.push(dataObj.year + "BP")
          ppmv.push(dataObj.ppmv)
        }
        const yearReverse = [...year].reverse();
        const ppmvReverse = [...ppmv].reverse();
        setChartV5({
          labels: yearReverse,
          datasets: [
            {
              label: 'Vostok CO2',
              data: ppmvReverse,
              backgroundColor: [
                '#FFC100'
              ],
              borderColor: '#FFC100',
            }
          ],
        })
      }).catch(error => {
        alert(error)
        setisloading(true)
      })

    axios.get("http://localhost:8080/v6/climateV6")
      .then(response => {
        for (const dataObj of response.data) {
          year1.push(dataObj.year * -1)
          co2_ppm.push(dataObj.co2_ppm)
        }

        const yearReverse = [...year1].reverse();
        const co2Reverse = [...co2_ppm].reverse();
        setChartV6({
          labels: yearReverse,
          datasets: [
            {
              label: 'CO2',
              data: co2Reverse,
              backgroundColor: [
                '#01DCDF'
              ],
              borderColor: '#01DCDF',
            }
          ],
        })
      }).catch(error => {
        alert(error)
        setisloading(true)
      })

    axios.all([requestV7, requestV10]).then(axios.spread((...responses) => {
      for (const dataObj of responses[0].data) {
        dataV7A.push(dataObj)
      }
      for (const dataObj of responses[1].data) {
        let converted = dataObj.years_ago / 1000
        dataObj.years_ago = converted

        dataV7A.push(giveValue(dataObj))
      }
      setChartV7(dataV7A)
    })).catch(error => {
      alert(error)
      setisloading(true)
    })

    axios.get("http://localhost:8080/v8/climateV8")
      .then(response => {
        setChartDataV8(response.data)

        for (const dataObj of response.data) {
          yearV8.push(dataObj.year)
        }

        setYears(yearV8)


      }).catch(error => {
        alert(error)
        setisloading(true)
      })

    axios.get("http://localhost:8080/v8/climateV8countries")
      .then(response => {
        for (const dataObj of response.data) {
          setCountry(country => [...country, dataObj.country.replace('\r', '')])
        }
      }).catch(error => {
        alert(error)
        setisloading(true)
      })

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
      }).catch(error => {
        alert(error)
        setisloading(true)
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

    for (let j = 0; j < chartDataV8.length; j++) {
      ok.push(chartDataV8[j][text])
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

  function checkTextV1(t) {
    if (createView) {
      setCreateView(false)
    }
    setV1text(t)
  }
  function checkTextV3(t) {
    if (createView) {
      setCreateView(false)
    }
    setV3text(t)
  }
  function checkTextV5(t) {
    if (createView) {
      setCreateView(false)
    }
    setV5text(t)
  }
  function checkTextV6(t) {
    if (createView) {
      setCreateView(false)
    }
    setV6text(t)
  }
  function checkTextV7(t) {
    if (createView) {
      setCreateView(false)
    }
    setV7text(t)
  }
  function checkTextV8(t) {
    if (createView) {
      setCreateView(false)
    }
    setV8text(t)
  }
  function checkTextV9(t) {
    if (createView) {
      setCreateView(false)
    }
    setV9text(t)
  }

  const handleChangeV1 = event => {
    if (event.target.checked) {
      setV1(true)
    }
    if (event.target.checked === false) {
      setV1(false)
    }
    if (event.target.checked && createView) {
      setV1(true)
      setCreateView(false)
      setShowSaveButton(false)
    }

    if (V1 && createView || V3 && createView || V5 && createView || V6 && createView || V7 && createView || V8 && createView || V9 && createView) {
      setCreateView(false)
      setShowSaveButton(false)

    }


  }

  const handleChangeV3 = event => {
    if (event.target.checked) {
      setV3(true)
    }
    if (event.target.checked === false) {
      setV3(false)
    }
    if (event.target.checked && createView) {
      setV3(true)
      setCreateView(false)
      setShowSaveButton(false)

    }
    if (V1 && createView || V3 && createView || V5 && createView || V6 && createView || V7 && createView || V8 && createView || V9 && createView) {
      setCreateView(false)
      setShowSaveButton(false)

    }

  }

  const handleChangeV5 = event => {
    if (event.target.checked) {
      setV5(true)
    }
    if (event.target.checked === false) {
      setV5(false)
    }
    if (event.target.checked && V1 && createView) {
      setV5(true)
      setCreateView(false)
      setShowSaveButton(false)

    }
    if (V1 && createView || V3 && createView || V5 && createView || V6 && createView || V7 && createView || V8 && createView || V9 && createView) {
      setCreateView(false)
      setShowSaveButton(false)

    }

  }

  const handleChangeV6 = event => {
    if (event.target.checked) {
      setV6(true)
    }
    if (event.target.checked === false) {
      setV6(false)
    }
    if (event.target.checked && createView) {
      setV6(true)
      setCreateView(false)
      setShowSaveButton(false)

    }
    if (V1 && createView || V3 && createView || V5 && createView || V6 && createView || V7 && createView || V8 && createView || V9 && createView) {
      setCreateView(false)
      setShowSaveButton(false)

    }

  }

  const handleChangeV7 = event => {
    if (event.target.checked) {
      setV7(true)
    }
    if (event.target.checked === false) {
      setV7(false)
    }
    if (event.target.checked && createView) {
      setV7(true)
      setCreateView(false)
      setShowSaveButton(false)

    }
    if (V1 && createView || V3 && createView || V5 && createView || V6 && createView || V7 && createView || V8 && createView || V9 && createView) {
      setCreateView(false)
      setShowSaveButton(false)

    }

  }

  const handleChangeV8 = event => {
    if (event.target.checked) {
      setV8(true)
    }
    if (event.target.checked === false) {
      setV8(false)
    }
    if (event.target.checked && createView) {
      setV8(true)
      setCreateView(false)
      setShowSaveButton(false)

    }
    if (V1 && createView || V3 && createView || V5 && createView || V6 && createView || V7 && createView || V8 && createView || V9 && createView) {
      setCreateView(false)
      setShowSaveButton(false)

    }

  }

  const handleChangeV9 = event => {
    if (event.target.checked) {
      setV9(true)
    }
    if (event.target.checked === false) {
      setV9(false)
    }
    if (event.target.checked && createView) {
      setV9(true)
      setCreateView(false)
      setShowSaveButton(false)

    }
    if (V1 && createView || V3 && createView || V5 && createView || V6 && createView || V7 && createView || V8 && createView || V9 && createView) {
      setCreateView(false)
      setShowSaveButton(false)

    }

  }
  const handleChangeGridView = event => {
    if (event.target.checked) {
      setGridView(true)
    }
    if (V1 && createView || V3 && createView || V5 && createView || V6 && createView || V7 && createView || V8 && createView || V9 && createView) {
      setCreateView(false)
      setShowSaveButton(false)

      setGridView(true)
    }
    if (V1 && gridView === false || V3 && gridView === false || V5 && gridView === false || V6 && gridView === false || V7 && gridView === false || V8 && gridView === false || V9 && gridView === false) {
      setCreateView(false)
      setShowSaveButton(false)

      setGridView(true)
    }
    else {
      setGridView(false)
      setShowSaveButton(false)

    }
  }

  function handleClick(e) {
    e.preventDefault()
    if (V1 || V3 || V5 || V6 || V7 || V8 || V9) {
      setCreateView(true)
      setShowSaveButton(true)
    }
  }

  function saveView(e) {
    e.preventDefault()
    axios.post("http://localhost:8080/customview/create", {},
      {
        params: {
          owner,
          V1,
          V3,
          V5,
          V6,
          V7,
          V8,
          V9,
          V1text,
          V3text,
          V5text,
          V6text,
          V7text,
          V8text,
          V9text,
          gridView
        }
      }
    ).then(response => {
      console.log(response)
    }).catch(error => {
      alert("Tallennus epäonnistui")
      console.log(error)
    })
  }

  function subSectors(e) {
    let subEmissions = []
    let subSectors = []
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
    console.log(V9Data.labels[0])

    if (V9Data.labels[0] != "Transport" && V9Data.labels[0] != "Livestock & Manure" && V9Data.labels[0] != "Landfills" && V9Data.labels[0] != "Cement") {
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

  useEffect(() => {
    Chart()
  }, [])

  const options = {
    responsive: true,
    showLine: true,
    type: 'line',
    pointRadius: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Vuodet'
        }
      },
      y: {
        title: {
          display: true,
          text: 'CO2'
        }
      }
    }
  };

  const optionsV1 = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: "month"
        },
        title: {
          display: true,
          text: 'Vuodet'
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Lämpötilamuutos'
        }
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        }
      }
    }

  };

  //--------------------------------------------V3---------------------------------------------

  const optionsV3 = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: "month"
        },
        title: {
          display: true,
          text: 'Vuodet'
        }

      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'CO2'
        }
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },

    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {

            if (context.dataset.label === "Tapahtumat") {
              return context.raw.event;
            } else {
              return context.formattedValue;
            }
          },
          title: function (context) {
            if (context?.[0]?.raw.year === DateTime) {
              return "Year " + context[0].label;
            }
            else {
              return context[0].label;
            }

          }

        }
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        }
      }
    },
  };

  //--------------------------------------------------------------------------------------------------
  // ----------------------------------------------V7-------------------------------------------------

  const dataV7 = {

    datasets: [
      {
        showLine: true,
        label: 'Co2 ppm',
        data: chartV7,
        borderColor: '#00FBFF',
        backgroundColor: '#00FBFF',
        borderWidth: 2,
        parsing: {
          xAxisKey: 'year2',
          yAxisKey: 'ppm2'
        },
        yAxisID: 'y',
        pointRadius: false,
      },
      {
        showLine: true,
        label: 'Pintalämpötilan muutos',
        data: chartV7,
        borderColor: '#FF0000',
        backgroundColor: '#FF0000',
        parsing: {
          xAxisKey: 'year1',
          yAxisKey: 'temp1'
        },
        yAxisID: 'y1',
        xAxisID: 'x',
        pointRadius: false,
      },
      {
        showLine: false,
        label: 'Tapahtumat',
        data: chartV7,
        borderColor: '#F700FF',
        backgroundColor: '#F700FF',
        parsing: {
          xAxisKey: 'years_ago',
          yAxisKey: 'value'
        },
        yAxisID: 'y1',
        xAxisID: 'x',
        pointRadius: 12,
      }
    ]
  };

  const configV7 = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {

            if (context.dataset.label === "Tapahtumat") {
              return context.raw.event;
            } else {
              return context.formattedValue;
            }
          },
          title: function (context) {
            if (context?.[0]?.raw.years_ago === undefined && context?.[0]?.raw.year1 != null && context?.[0]?.raw.year2 === null) {
              return "Year " + context[0].label;
            }
            if (context?.[0]?.raw.years_ago === undefined && context?.[0]?.raw.year2 != null && context?.[0]?.raw.year1 != null) {
              return "Year " + context[0].label;
            }
            else if (context.length > 0) {
              return context[0].raw.years_ago + " years ago";
            }

          }

        }
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        }
      }

    },
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Tuhannet vuodet ennen nykyhetkeä'
        },
        reverse: true,
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'CO2'
        }
      },

      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },


        title: {
          display: true,
          text: '°C'
        },
      },
    },


  };

  //---------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------V8-----------------------------------------------------------

  const optionsV8 = {
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
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        }
      }
    }

  };

  let jaa = years.toString()
  let yearV8Split = jaa.split(',')
  const data = {
    labels: yearV8Split,
    datasets: datasets
  };
  //---------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------V9-----------------------------------------------------------

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

  //---------------------------------------------------------------------------------------------------------------------

  const DrawChartV1 = () => <div id='chart' className="p-5 mb-4 bg-light rounded-3">
    <h1>Lämpötilatiedot vuosilta 1850-2022 (v1 ja 2)</h1>
    <p>(V1) Mittaustulosten kuvaus: <a href='https://www.metoffice.gov.uk/hadobs/hadcrut5/'>https://www.metoffice.gov.uk/hadobs/hadcrut5</a></p>
    <p>(V1) Datalähde: <a href='https://www.metoffice.gov.uk/hadobs/hadcrut5/data/current/download.html'>https://www.metoffice.gov.uk/hadobs/hadcrut5/data/current/download.html</a></p>
    <p>(V2) Mittaustulosten kuvaus: <a href='https://bolin.su.se/data/moberg-2012-nh-1?n=moberg-2005'>https://bolin.su.se/data/moberg-2012-nh-1?n=moberg-2005</a></p>
    <p>(V2) Datalähde: <a href='https://www.ncei.noaa.gov/pub/data/paleo/contributions_by_author/moberg2005/nhtemp-moberg2005.txt'>https://www.ncei.noaa.gov/pub/data/paleo/contributions_by_author/moberg2005/nhtemp-moberg2005.txt</a></p>
    <div className="container-fluid py-5">
      <div><Line data={chartData} options={optionsV1} /></div>
      <p>{V1text}</p>
    </div>
  </div>

  const DrawChartV3 = () => <div id='chart' className="p-5 mb-4 bg-light rounded-3">
    <h1>Mauna Loan ilmakehän hiilidioksidipitoisuudet 1959-2021 (v3)</h1>
    <p>(V3) Mittaustulosten kuvaus: <a href='https://gml.noaa.gov/ccgg/about/co2_measurements.html'>https://gml.noaa.gov/ccgg/about/co2_measurements.html</a></p>
    <p>(V3) Datalähde: <a href='https://gml.noaa.gov/ccgg/trends/data.html'>https://gml.noaa.gov/ccgg/trends/data.html</a></p>
    <p>(V4) Mittaustulosten kuvaus: <a href='https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html'>https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html</a></p>
    <p>(V4) Datalähde: <a href='https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat'>https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat</a></p>
    <p>(V10) Mittaustulosten kuvaus: Ihmisen kehityksen ja toiminnan merkkipaalut</p>
    <p>(V10) Datalähde: <a href='https://www.southampton.ac.uk/~cpd/history.html'>https://www.southampton.ac.uk/~cpd/history.html</a></p>
    <div className="container-fluid py-5">
      <div><Line data={chartV3M} options={optionsV3} /></div>
      <p>{V3text}</p>
    </div>
  </div>

  const DrawChartV5 = () => <div id='chart' className="p-5 mb-4 bg-light rounded-3">
    <h1>Ilmakehän hiilidioksidipitoisuudet Vostok asemalla tehtyihin jääkairauksiin perustuen 2342-417160 (v5) </h1>
    <p>(V5) Mittaustulosten kuvaus: <a href='https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html'>https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html</a></p>
    <p>(V5) Datalähde: <a href='https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2'>https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2</a></p>
    <div className="container-fluid py-5">
      <div><Line data={chartV5} options={options} /></div>
      <p>{V5text}</p>
    </div>
  </div>

  const DrawChartV6 = () => <div id='chart' className="p-5 mb-4 bg-light rounded-3">
    <h1>Hiilidioksidipitoisuudet perustuen yhdistelmätutkimuksella tehtyihin etelämantereen jääkairauksiin (aikajakso 800000 vuotta)(v6) </h1>
    <p>(V6) Mittaustulosten kuvaus: <a href='https://www.ncei.noaa.gov/access/paleo-search/study/17975'>https://www.ncei.noaa.gov/access/paleo-search/study/17975</a></p>
    <p>(V6) Datalähde: <a href='https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt'>https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt</a></p>
    <div className="container-fluid py-5">
      <div><Line data={chartV6} options={options} /></div>
      <p>{V6text}</p>
    </div>
  </div>

  const DrawChartV7 = () => <div id='chart' className="p-5 mb-4 bg-light rounded-3">
    <h1>Lämpötilan kehitys maapallolla 2 miljoonan vuoden ajalta (v7) </h1>
    <p>(V7) Mittaustulosten kuvaus: <a href='https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf'>https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf</a></p>
    <p>(V7) Datalähde: <a href='http://carolynsnyder.com/publications.php '>http://carolynsnyder.com/publications.php </a></p>
    <p>(V10) Mittaustulosten kuvaus: Ihmisen kehityksen ja toiminnan merkkipaalut</p>
    <p>(V10) Datalähde: <a href='https://www.southampton.ac.uk/~cpd/history.html'>https://www.southampton.ac.uk/~cpd/history.html</a></p>
    <div className="container-fluid py-5">
      <div><Line data={dataV7} options={configV7} /></div>
      <p>{V7text}</p>
    </div>
  </div>

  const DrawChartV8 = () => <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
    <div className="container-fluid py-5">
      <h1>Maakohtaiset CO2-päästöt</h1>
      <p>(V8) Mittaustulosten kuvaus: <a href='https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021'>https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021</a></p>
      <p>(V8) Datalähde: <a href='https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D'>https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D</a></p>
      <br />
      <div><Line data={data} options={optionsV8} /></div>
      <p>{V8text}</p>
      <br />
    </div>
  </div>

  const DrawChartV9 = () => <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
    <div className="container-fluid py-5">
      <h1>CO2-päästöt toimialoittain</h1>
      <p>(V9) Mittaustulosten kuvaus: <a href='https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector'>https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector</a></p>
      <p>(V9) Datalähde: <a href='https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI-2020.xlsx'>https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI-2020.xlsx</a></p>
      <br />
      <div><Doughnut data={V9Data} options={optionsV9} />
        <p>{V9text}</p>
      </div>
    </div>
    <form onSubmit={e => mainView(e)}>
      <Button block="true" type="submit"  >
        Takaisin
      </Button>
    </form>
  </div>

  const ShowSaveButton = () => <Form id='buttons' onSubmit={saveView}>
    <Button block="true" type="submit"  >
      Tallenna näkymä
    </Button>
  </Form>

  if (isloading === true) {
    return (
      <p>Loading</p>
    )
  }

  else {
    return (
      <>
        <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
          <div  className="form-check form-switch container-fluid py-5">
            <table>
              <tr>
                <td>
                  <h2>Valitse haluamasi kaaviot</h2>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" className="form-check-input" onChange={handleChangeV1} />
                  &nbsp;
                  <label> V1 ja V2 </label> </td>
                &nbsp;
                <td><input type="text" id='inputs' placeholder='Kuvausteksti' value={V1text} onChange={e => checkTextV1(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" className="form-check-input" onChange={handleChangeV3} />
                  &nbsp;
                  <label> V3, V4 ja V10</label></td>
                &nbsp;
                <td><input type="text" id='inputs' placeholder='Kuvausteksti' value={V3text} onChange={e => checkTextV3(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" className="form-check-input" onChange={handleChangeV5} />
                  &nbsp;
                  <label> V5</label></td>
                &nbsp;
                <td><input type="text" id='inputs' placeholder='Kuvausteksti' value={V5text} onChange={e => checkTextV5(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" className="form-check-input" onChange={handleChangeV6} />
                  &nbsp;
                  <label> V6</label></td>
                &nbsp;
                <td><input type="text" id='inputs' placeholder='Kuvausteksti' value={V6text} onChange={e => checkTextV6(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" className="form-check-input" onChange={handleChangeV7} />
                  &nbsp;
                  <label> V7 ja V10</label></td>
                &nbsp;
                <td><input type="text" id='inputs' placeholder='Kuvausteksti' value={V7text} onChange={e => checkTextV7(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" className="form-check-input" onChange={handleChangeV8} />
                  &nbsp;
                  <label> V8</label></td>
                &nbsp;
                <td><input type="text" id='inputs' placeholder='Kuvausteksti' value={V8text} onChange={e => checkTextV8(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" className="form-check-input" onChange={handleChangeV9} />
                  &nbsp;
                  <label> V9</label></td>
                &nbsp;
                <td><input type="text" id='inputs' placeholder='Kuvausteksti' value={V9text} onChange={e => checkTextV9(e.target.value)} />
                </td>
              </tr>
              <tr>
                <input type="checkbox" className="form-check-input" onChange={handleChangeGridView} />
                <label>&nbsp; 2 sarakkeen rinnakkaisasettelu</label>
              </tr>
            </table>
            <Form id='buttons' onSubmit={handleClick}>
              <Button block="true" type="submit"  >
                Luo näkymä
              </Button>
            </Form>
            {(showSaveButton) ? <ShowSaveButton /> : null}
          </div>
        </div>
        <div className="container-fluid py-5" id={gridView ? 'grid' : null}>
          {(V1 && createView) ? <DrawChartV1 /> : null}
          {(V3 && createView) ? <DrawChartV3 /> : null}
          {(V5 && createView) ? <DrawChartV5 /> : null}
          {(V6 && createView) ? <DrawChartV6 /> : null}
          {(V7 && createView) ? <DrawChartV7 /> : null}
          {(V8 && createView) ? <DrawChartV8 /> : null}
          {(V9 && createView) ? <DrawChartV9 /> : null}
        </div>
      </>
    )
  }
}
export default CustomView