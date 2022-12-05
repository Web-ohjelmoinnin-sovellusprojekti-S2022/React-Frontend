import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from "chart.js/auto";
import axios from 'axios';
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';

function convertToLuxonDate(dataObj) {
    return { ...dataObj, year: DateTime.fromISO(dataObj.year) }
}
function convertToLuxonDate1(dataObj) {
    return { ...dataObj, year: DateTime.fromISO(dataObj.dss_year) }
}
function convertToLuxonDate2(dataObj) {
    return { ...dataObj, year: DateTime.fromISO(dataObj.de082_year) }
}
function convertToLuxonDate3(dataObj) {
    return { ...dataObj, year: DateTime.fromISO(dataObj.de08_year) }
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

function Temperature() {
    const [chartData, setChartData] = useState({})
    const [chartV3M, setChartV3M] = useState({})
    const [chartV5, setChartV5] = useState({})
    const [chartV6, setChartV6] = useState({})
    const [chartV7, setChartV7] = useState({})
    const [isloading, setisloading] = useState(true)
    let dataV1 = []
    let year1 = []
    let co2_ppm = []
    let year = []
    let ppmv = []
    let dataV3 = []

    //V1 ja 2
    let V1Axios = "http://localhost:8080/v1/climateV1"
    let V1M = "http://localhost:8080/v1/climateV1monthly"
    let V2 = "http://localhost:8080/v2/climateV2"
    const requestV1Axios = axios.get(V1Axios);
    const requestV1M = axios.get(V1M);
    const requestV2 = axios.get(V2);

    //V3
    let one = "http://localhost:8080/v3/climateV3"
    let two = "http://localhost:8080/v3/climateV3monthly"
    let three = "http://localhost:8080/v4/climateV4"
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const reuestThree = axios.get(three);


    const V1 = () => {
        axios.all([requestV1Axios, requestV1M, requestV2]).then(axios.spread((...responses) => {
            for (const dataObj of responses[0].data) {
                dataV1.push(dataObj)
            }
            for (const dataObj of responses[1].data) {
                dataV1.push(convertM(dataObj))
            }
            for (const dataObj of responses[2].data) {
                dataV1.push(convert(dataObj))
            }

            console.log(dataV1)
            
            setChartData({
                datasets: [
                    {
                        label: 'Maailmanlaajuiset lämpötilapoikkeamat 1850-2022',
                        data: dataV1,
                        backgroundColor: [
                            '#8A459A'
                        ],
                        borderColor: '#8A459A',
                        parsing: {
                            xAxisKey: 'year',
                            yAxisKey: 'anomaly_g'
                        },
                    },
                    {
                        label: 'Pohjoiset lämpötilapoikkeamat 1850-2022',
                        data: dataV1,
                        backgroundColor: [
                            '#D0D700'
                        ],
                        borderColor: '#D0D700',
                        parsing: {
                            xAxisKey: 'year',
                            yAxisKey: 'anomaly_n'
                        },
                    },
                    {
                        label: 'Eteläiset lämpötilapoikkeamat 1850-2022',
                        data: dataV1,
                        backgroundColor: [
                            '#FF0000'
                        ],
                        borderColor: '#FF0000',
                        parsing: {
                            xAxisKey: 'year',
                            yAxisKey: 'anomaly_s'
                        },
                    },
                    {
                        label: 'Maailmanlaajuiset lämpötilapoikkeamat 1850-2022 kuukausittain',
                        data: dataV1,
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
                        data: dataV1,
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


        axios.all([requestOne, requestTwo, reuestThree]).then(axios.spread((...responses) => {
            for (const dataObj of responses[0].data) {
                dataV3.push(dataObj)

            }
            for (const dataObj of responses[1].data) {
                dataV3.push(dataObj)

            }
            for (const dataObj of responses[2].data) {
                dataV3.push(dataObj)

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
                        showLine: false,
                        label: "DSS",
                        data: dataV3.map(d => convertToLuxonDate1(d)),
                        backgroundColor: '#222222',
                        borderColor: '#000000',
                        borderWidth: 2,
                        parsing: {
                            xAxisKey: 'year',
                            yAxisKey: 'dss_ppm'
                        },
                        pointRadius: 2,
                    },

                    {
                        showLine: false,
                        label: "DE08",
                        data: dataV3.map(d => convertToLuxonDate3(d)),
                        backgroundColor: '#42f566',
                        borderColor: '#42f566',
                        borderWidth: 2,
                        parsing: {
                            xAxisKey: 'year',
                            yAxisKey: 'de08_ppm'
                        },
                        pointRadius: 2,
                    },

                    {
                        showLine: false,
                        label: "DE082",
                        data: dataV3.map(d => convertToLuxonDate2(d)),
                        backgroundColor: '#FF0000',
                        borderColor: '#FF0000',
                        borderWidth: 2,
                        parsing: {
                            xAxisKey: 'year',
                            yAxisKey: 'de082_ppm'
                        },
                        pointRadius: 2,
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
            })


        axios.get("http://localhost:8080/v7/climateV7")
            .then(response => {
                setChartV7(response.data)
                for (const dataObj of response.data) {

                }

                setisloading(false)

            }).catch(error => {
                alert(error)
                setisloading(true)
            }
            )
    }

    useEffect(() => {
        V1()
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
        type: 'line',
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
        }
    };

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
                    </div>
                </div>
                <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                    <h1>Mauna Loan ilmakehän hiilidioksidipitoisuudet 1959-2021 (v3)</h1>
                    <div className="container-fluid py-5">
                        <div><Line data={chartV3M} options={optionsV3} /></div>
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