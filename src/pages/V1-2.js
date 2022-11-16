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
    const [chartV4de08, setChartV4de08] = useState({})
    const [chartV4dss, setChartV4dss] = useState({})
    const [chartV4de082, setChartV4de082] = useState({})
    const [chartV5, setChartV5] = useState({})
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
        let de_year = []
        let dss_year = []
        let de08_year = []
        let V4_years = []
        let mean = []
        let meanM = []
        let ppm = []
        let dssppm = []
        let de08ppm = []
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
        axios.get("http://localhost:8080/v4/climateV4")
            .then(response => {
                for (const dataObj of response.data) {
                    if (dataObj.de082_year != 0) {
                        de_year.push(dataObj.de082_year)
                        ppm.push(dataObj.de082_ppm)
                    }
                    if (dataObj.dss_year != 0) {
                        dssppm.push(dataObj.dss_ppm)
                        dss_year.push(dataObj.dss_year)
                    }
                    if (dataObj.de08_year != 0) {
                        de08_year.push(dataObj.de08_year)
                        de08ppm.push(dataObj.de08_ppm)
                    }
                    
                }
                V4_years.push(de_year)
                V4_years.push(dss_year)
                V4_years.push(de08_year)
                console.log(V4_years)
                setChartV4de082({
                    labels: V4_years[0],
                    datasets: [
                        {
                            label: 'de082_ppm',
                            data: ppm,
                            backgroundColor: [
                                '#0000FF'
                            ]
                        },
                        {
                            label: 'dss_ppm',
                            data: dssppm,
                            backgroundColor: [
                                '#0000FF'
                            ]
                        },
                        {
                            label: 'de08_ppm',
                            data: de08ppm,
                            backgroundColor: [
                                '#0000FF'
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


    useEffect(() => {
        V1()
        V1Monthly()
        V3()
        V5()
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
                    <h1>Lämpötilatiedot vuosilta 1850-2022</h1>
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
                    <h1>Mauna Loan ilmakehän hiilidioksidipitoisuudet 1959-2021</h1>
                    <div className="container-fluid py-5">
                        <div><Line data={chartV3} options={{
                            responsive: true,
                        }} /></div>
                        <div><Line data={chartV3M} options={{
                            responsive: true,
                        }} /></div>
                        <br></br>
                        <h1>Ilmakehän hiilidioksidipitoisuudet perustuen etelämantereen jääkairauksiin</h1>
                        <div><Line data={chartV4de082} options={{
                            responsive: true,
                        }} /></div>
                    </div>
                </div>
                <div id='chart' style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="p-5 mb-4 bg-light rounded-3">
                    <h1>Ilmakehän hiilidioksidipitoisuudet Vostok asemalla tehtyihin jääkairauksiin perustuen 2342-417160 </h1>
                    <div className="container-fluid py-5">
                        <div><Line data={chartV5} options={{
                            responsive: true,
                        }} /></div>
                    </div>
                </div>


            </>
        )
    }


}

export default Temperature;