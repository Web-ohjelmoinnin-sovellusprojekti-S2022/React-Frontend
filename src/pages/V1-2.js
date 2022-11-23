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
    const [chartV4de082, setChartV4de082] = useState({})
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
                            ]
                        },
                        {
                            label: 'Pohjoisen lämpötilapoikkeamat 1850-2022',
                            data: anomaly2,
                            backgroundColor: [
                                '#FE370C'
                            ]
                        },
                        {
                            label: 'Etelän lämpötilapoikkeamat 1850-2022',
                            data: anomaly3,
                            backgroundColor: [
                                '#FEE40C'
                            ]
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
                            ]
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
                            ]
                        },
                        {
                            label: 'Pohjoisen lämpötilapoikkeamat 1850-2022',
                            data: anomaly2,
                            backgroundColor: [
                                '#FE370C'
                            ]
                        },
                        {
                            label: 'Etelän lämpötilapoikkeamat 1850-2022',
                            data: anomaly3,
                            backgroundColor: [
                                '#FEE40C'
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
                                '#0000FF'
                            ]
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
                            ]
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
                    year.push(dataObj.year)
                    ppmv.push(dataObj.ppmv)
                }
                setChartV5({
                    labels: year,
                    datasets: [
                        {
                            label: 'Vostok CO2',
                            data: ppmv,
                            backgroundColor: [
                                '#FF0000'
                            ]
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
                    year.push(dataObj.year)
                    co2_ppm.push(dataObj.co2_ppm)
                }
                setChartV6({
                    labels: year,
                    datasets: [
                        {
                            label: 'CO2',
                            data: co2_ppm,
                            backgroundColor: [
                                '#FF0000'
                            ]
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
        let year1 = []
        let temp1 = []
        let year2 = []
        let ppm2 = []

        axios.get("http://localhost:8080/v7/climateV7")
            .then(response => {
                for (const dataObj of response.data) {
                    if (dataObj.year1 !== 0) {
                        year1.push(dataObj.year1)
                        temp1.push(dataObj.temp1)
                    }
                    if (dataObj.year2 !== 0) {
                        year2.push(dataObj.year2)
                        ppm2.push(dataObj.ppm2)
                    }

                }
                const data = {
                    labels: year1,
                    datasets: [{
                        axis: 'y',
                        label: 'My First Dataset',
                        data: temp1,
                        fill: false,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                };
                const config = {
                    type: 'line',
                    data: data,
                    options: {
                        indexAxis: 'y',
                        scales: {
                            x: {
                                beginAtZero: true
                            }
                        }
                    }
                };
                setChartV7({
                    labels: year1,
                    datasets: [
                        {
                            label: 'CO2',
                            data: temp1,
                            backgroundColor: [
                                '#FF0000'
                            ]
                        },
                        {
                            label: 'CO2',
                            data: ppm2,
                            backgroundColor: [
                                '#FF0000'
                            ]
                        }

                    ],
                })

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
        scales: {
            x: {
                type: 'linear',

            },
            y: {
                type: 'linear'
            }
        },
        elements: {
            point: {
                radius: 0
            }
        }
    };

    const graphData = {
        datasets: [

            {
                showLine: false,
                label: "DSS",
                data: V4Data,
                backgroundColor: ['#222222'],
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
                backgroundColor: ['#42f566'],
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
                backgroundColor: ['#00000'],
                borderColor: '#000000',
                borderWidth: 2,
                parsing: {
                    xAxisKey: 'de082_year',
                    yAxisKey: 'de082_ppm'
                },
                pointRadius: 2,
            }

        ],
    }

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
                        <div><Line data={chartData} options={{
                            responsive: true,
                        }} /></div>
                        <h1>Anders Mobergin et al. Paleoklimatologiset lämpötilatiedot</h1>
                        <div><Line data={chartDataV2} options={{
                            responsive: true,
                        }} /></div>
                        <div><Line data={chartDataM} options={{
                            responsive: true,
                        }} /></div>
                    </div>
                </div>
                <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                    <h1>Mauna Loan ilmakehän hiilidioksidipitoisuudet 1959-2021 (v3)</h1>
                    <div className="container-fluid py-5">
                        <div><Line data={chartV3} options={{
                            responsive: true,
                        }} /></div>
                        <div><Line data={chartV3M} options={{
                            responsive: true,
                        }} /></div>
                        <br></br>
                        <h1>Ilmakehän hiilidioksidipitoisuudet perustuen etelämantereen jääkairauksiin (v4)</h1>
                        <div><Line data={graphData} options={options} /></div>
                    </div>
                </div>
                <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                    <h1>Ilmakehän hiilidioksidipitoisuudet Vostok asemalla tehtyihin jääkairauksiin perustuen 2342-417160 (v5) </h1>
                    <div className="container-fluid py-5">
                        <div><Line data={chartV5} options={{
                            responsive: true,
                        }} /></div>
                    </div>
                </div>
                <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                    <h1>Hiilidioksidipitoisuudet perustuen yhdistelmätutkimuksella tehtyihin etelämantereen jääkairauksiin (aikajakso 800000 vuotta)(v6) </h1>
                    <div className="container-fluid py-5">
                        <div><Line data={chartV6} options={{
                            responsive: true,
                        }} /></div>
                    </div>
                </div>
                <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                    <h1>Hiilidioksidipitoisuudet perustuen yhdistelmätutkimuksella tehtyihin etelämantereen jääkairauksiin (aikajakso 800000 vuotta)(v7) </h1>
                    <div className="container-fluid py-5">
                        <div><Line data={chartV7} options={{
                            responsive: true,
                        }} /></div>
                    </div>
                </div>


            </>
        )
    }


}

export default Temperature;