import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from "chart.js/auto";
import axios from 'axios';


function Temperature() {
    const [chartData, setChartData] = useState({})
    const [chartDataV2, setChartDataV2] = useState({})
    const [chartDataM, setChartDataM] = useState({})
    const [chartV3, setChartV3] = useState({})
    const [chartV3M, setChartV3M] = useState({})
    const [V4Data, setV4Data] = useState({})
    const [chartV5, setChartV5] = useState({})
    const [chartV6, setChartV6] = useState({})
    const [chartV7, setChartV7] = useState({})
    const [isloading, setisloading] = useState(true)

    const V1 = () => {
        let yearV1 = []
        let yearV2 = []
        let anomaly = []
        let anomaly2 = []
        let anomaly3 = []
        let v2temp = []
        axios.get("http://localhost:8080/v1/climateV1")
            .then(response => {
                for (const dataObj of response.data) {
                    yearV1.push(dataObj.year)
                    anomaly.push(dataObj.anomaly_g)
                    anomaly2.push(dataObj.anomaly_n)
                    anomaly3.push(dataObj.anomaly_s)
                }
                setChartData({
                    labels: yearV1,
                    datasets: [
                        {
                            label: 'Maailmanlaajuiset lämpötilapoikkeamat 1850-2022',
                            data: anomaly,
                            backgroundColor: [
                                '#0000FF'
                            ],
                            borderColor: '#0000FF',
                        },
                        {
                            label: 'Pohjoisen lämpötilapoikkeamat 1850-2022',
                            data: anomaly2,
                            backgroundColor: [
                                '#FE370C'
                            ],
                            borderColor: '#FE370C',
                        },
                        {
                            label: 'Etelän lämpötilapoikkeamat 1850-2022',
                            data: anomaly3,
                            backgroundColor: [
                                '#FEE40C'
                            ],
                            borderColor: '#FEE40C',
                        }
                    ],
                })
            })
        axios.get("http://localhost:8080/v2/climateV2")
            .then(response => {
                for (const dataObj of response.data) {
                    yearV2.push(dataObj.year)
                    v2temp.push(dataObj._t)
                }
                setChartDataV2({
                    labels: yearV2,
                    datasets: [
                        {
                            label: 'Anders Mobergin et al. Paleoklimatologiset lämpötilatiedot',
                            data: v2temp,
                            backgroundColor: [
                                '#0CFF00'
                            ],
                            borderColor: '#0CFF00',

                        },

                    ],
                })
            }).catch(error => {
                alert(error)
                setisloading(true)
            }
            )
    }

    const V1Monthly = () => {
        let year = []
        let anomaly = []
        let anomaly2 = []
        let anomaly3 = []
        axios.get("http://localhost:8080/v1/climateV1monthly")
            .then(response => {
                for (const dataObj of response.data) {
                    year.push(dataObj.year)
                    anomaly.push(dataObj.anomaly_g)
                    anomaly2.push(dataObj.anomaly_n)
                    anomaly3.push(dataObj.anomaly_s)
                }
                setChartDataM({
                    labels: year,
                    datasets: [
                        {
                            label: 'Maailmanlaajuiset lämpötilapoikkeamat 1850-2022',
                            data: anomaly,
                            backgroundColor: [
                                '#0000FF'
                            ],
                            borderColor: '#0000FF',
                        },
                        {
                            label: 'Pohjoisen lämpötilapoikkeamat 1850-2022',
                            data: anomaly2,
                            backgroundColor: [
                                '#FE370C'
                            ],
                            borderColor: '#FE370C',
                        },
                        {
                            label: 'Etelän lämpötilapoikkeamat 1850-2022',
                            data: anomaly3,
                            backgroundColor: [
                                '#FEE40C'
                            ],
                            borderColor: '#FEE40C',
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

    const V3 = () => {
        let year = []
        let yearM = []
        let mean = []
        let meanM = []

        axios.get("http://localhost:8080/v3/climateV3")
            .then(response => {
                for (const dataObj of response.data) {
                    year.push(dataObj.year)
                    mean.push(dataObj._mean)
                }
                setChartV3({
                    labels: year,
                    datasets: [
                        {
                            label: 'Havaijin Mauna Loan ilmakehän hiilidioksidipitoisuudet',
                            data: mean,
                            backgroundColor: [
                                '#8A459A'
                            ],
                            borderColor: '#8A459A',
                        }
                    ],
                })

            })
        axios.get("http://localhost:8080/v3/climateV3monthly")
            .then(response => {
                for (const dataObj of response.data) {
                    yearM.push(dataObj.year)
                    meanM.push(dataObj.mean)
                }
                setChartV3M({
                    labels: yearM,
                    datasets: [
                        {
                            label: 'Havaijin Mauna Loan ilmakehän hiilidioksidipitoisuudet kuukausittain',
                            data: meanM,
                            backgroundColor: [
                                '#0000FF'
                            ],
                            borderColor: '#0000FF',
                        }
                    ],
                })

            })

    }
    const V4 = () => {
        axios.get("http://localhost:8080/v4/climateV4")
            .then(response => {
                setV4Data(response.data)
            

            }).catch(error => {
                alert(error)
                setisloading(true)
            }
            )
    }


    const V5 = () => {
        let year = []
        let ppmv = []

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
            }
            )
    }

    const V6 = () => {
        let year = []
        let co2_ppm = []

        axios.get("http://localhost:8080/v6/climateV6")
            .then(response => {
                for (const dataObj of response.data) {
                    year.push(dataObj.year * -1)
                    co2_ppm.push(dataObj.co2_ppm)
                }

                const yearReverse = [...year].reverse();
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
            }
            )
    }

    const V7 = () => {
        axios.get("http://localhost:8080/v7/climateV7")
            .then(response => {
                setChartV7(response.data)
                for (const dataObj of response.data) {
                   
                }
 

            }).catch(error => {
                alert(error)
                setisloading(true)
            }
            )
    }


    useEffect(() => {
        V1()
        V1Monthly()
        V3()
        V4()
        V5()
        V6()
        V7()
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
                text: '°C'
              }
            }
          }
    };
    //--------------------------------------------V4---------------------------------------------
    const optionsV4 = {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
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
        }
    };

    const graphDataV4 = {
        datasets: [

            {
                showLine: false,
                label: "DSS",
                data: V4Data,
                backgroundColor: '#222222',
                borderColor: '#000000',
                borderWidth: 2,
                parsing: {
                    xAxisKey: 'dss_year',
                    yAxisKey: 'dss_ppm'
                },
                pointRadius: 2,
            },

            {
                showLine: false,
                label: "DE08",
                data: V4Data,
                backgroundColor: '#42f566',
                borderColor: '#42f566',
                borderWidth: 2,
                parsing: {
                    xAxisKey: 'de08_year',
                    yAxisKey: 'de08_ppm'
                },
                pointRadius: 2,
            },

            {
                showLine: false,
                label: "DE082",
                data: V4Data,
                backgroundColor: '#FF0000',
                borderColor: '#FF0000',
                borderWidth: 2,
                parsing: {
                    xAxisKey: 'de082_year',
                    yAxisKey: 'de082_ppm'
                },
                pointRadius: 2,
            }

        ],
    }
    //--------------------------------------------------------------------------------------------------
    // ----------------------------------------------V7-------------------------------------------------
    const configV7 = {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
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
              elements: {
                point: {
                    radius: 0
                },
            },
            title: {
                display: true,
                text: '°C'
              },
            },
          }
      
      };
    
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
          }
        ]
      };
//---------------------------------------------------------------------------------------------------------------------
    if (isloading === true) {
        return (
            <p>Loading</p>
        )
    }

    else {
        return (
            <>
                <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                    <h1>Lämpötilatiedot vuosilta 1850-2022 (v1 ja 2)</h1>
                    <div className="container-fluid py-5">
                        <div><Line data={chartData} options={optionsV1} /></div>
                         <h1>Lämpötilatiedot vuosilta 1850-2022 (kuukausittain)</h1>
                        <div><Line data={chartDataM} options={optionsV1} /></div>
                        <h1>Anders Mobergin et al. Paleoklimatologiset lämpötilatiedot</h1>
                        <div><Line data={chartDataV2} options={optionsV1} /></div>
                    </div>
                </div>
                <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                    <h1>Mauna Loan ilmakehän hiilidioksidipitoisuudet 1959-2021 (v3)</h1>
                    <div className="container-fluid py-5">
                        <div><Line data={chartV3} options={options} /></div>
                        <div><Line data={chartV3M} options={options} /></div>
                        <br></br>
                        <h1>Ilmakehän hiilidioksidipitoisuudet perustuen etelämantereen jääkairauksiin (v4)</h1>
                        <div><Line data={graphDataV4} options={optionsV4} /></div>
                    </div>
                </div>
                <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                    <h1>Ilmakehän hiilidioksidipitoisuudet Vostok asemalla tehtyihin jääkairauksiin perustuen 2342-417160 (v5) </h1>
                    <div className="container-fluid py-5">
                        <div><Line data={chartV5} options={options} /></div>
                    </div>
                </div>
                <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                    <h1>Hiilidioksidipitoisuudet perustuen yhdistelmätutkimuksella tehtyihin etelämantereen jääkairauksiin (aikajakso 800000 vuotta)(v6) </h1>
                    <div className="container-fluid py-5">
                        <div><Line data={chartV6} options={options} /></div>
                    </div>
                </div>
                <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                    <h1>Lämpötilan kehitys maapallolla 2 miljoonan vuoden ajalta (v7) </h1>
                    <div className="container-fluid py-5">
                        <div><Line data={dataV7} options={configV7} /></div>
                    </div>
                </div>


            </>
        )
    }


}

export default Temperature;