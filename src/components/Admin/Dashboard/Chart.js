import React from 'react'

import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, ArcElement, Legend
} from 'chart.js'

import { Line, Doughnut } from 'react-chartjs-2'


ChartJS.register(
    CategoryScale, LinearScale, LineElement,
    PointElement, Title, Tooltip, ArcElement, Legend
)


export const LineChart = ({ stats }) => {

    const labels = getLastYearMonths()

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: 'Yearly Views'
            },
        }
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Views',
                data: [stats[0].views, stats[1].views, stats[2].views, stats[3].views, stats[4].views, stats[5].views, stats[6].views, stats[7].views, stats[8].views, stats[9].views, stats[10].views, stats[11].views],
                borderColor: "rgba(107,70,193,0.5)",
                backgroundColor: '#6B46C1'
            }
        ]
    }


    return (
        <Line options={options} data={data} />
    )
}


export const DoughnutChart = ({ usersData = [] }) => {

    const labels = ["Subscribed", 'Not Subscribed']
    const data = {
        labels,
        datasets: [
            {
                data: usersData,
                backgroundColor: ['rgba(0, 200, 81, 0.8)', 'rgba(255, 68, 68, 0.8)'],
                borderColor: ['#00C851', '#FF4444'],
                borderWidth: 1
            }
        ]
    }


    return (
        <>
            <Doughnut data={data} />
        </>
    )
}


function getLastYearMonths() {
    const labels = []

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ]

    const currentMonth = new Date().getMonth()
    const remaining = 11 - currentMonth

    for (let i = currentMonth; i < months.length; i--) {
        const element = months[i]
        labels.unshift(element)

        if (i === 0) break;
    }

    for (let i = 11; i > remaining; i--) {
        if (i === currentMonth) break;

        const element = months[i]
        labels.unshift(element)

    }
    return labels

}