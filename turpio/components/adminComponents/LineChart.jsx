import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const LineChart = ({ userStats, eventStats }) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    const options = {
        responsive: true,
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Users',
                data: Array.from({ length: 12 }, (_, index) => {
                    const filterUser = userStats.find(e => e._id === index + 1);
                    if (filterUser) {
                        return filterUser.total;
                    } else {
                        return 0;
                    }
                }),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',

            },
            {
                label: 'Events',
                data: Array.from({ length: 12 }, (_, index) => {
                    const filterUser = eventStats.find(e => e._id === index + 1);
                    if (filterUser) {
                        return filterUser.total;
                    } else {
                        return 0;
                    }
                }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Line options={options} data={data} />
    )
}

export default LineChart