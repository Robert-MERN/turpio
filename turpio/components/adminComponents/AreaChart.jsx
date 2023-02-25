import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';


const AreaChart = ({ subscriptionStats }) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
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
                label: 'Monthly Subscription',
                data: Array.from({ length: 12 }, (_, index) => {
                    const filterUser = subscriptionStats.find(e => e._id.status === "monthly" && e._id.month === index + 1);
                    if (filterUser) {
                        return filterUser.total;
                    } else {
                        return 0;
                    }
                }),
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
            },
            {
                label: 'Yearly Subscription',
                data: Array.from({ length: 12 }, (_, index) => {
                    const filterUser = subscriptionStats.find(e => e._id.status === "yearly" && e._id.month === index + 1);
                    if (filterUser) {
                        return filterUser.total;
                    } else {
                        return 0;
                    }
                }),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
                label: 'Trial Period',
                data: Array.from({ length: 12 }, (_, index) => {
                    const filterUser = subscriptionStats.find(e => e._id.status === "trial" && e._id.month === index + 1);
                    if (filterUser) {
                        return filterUser.total;
                    } else {
                        return 0;
                    }
                }),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
            },
            {
                label: 'Expired Subscription',
                data: Array.from({ length: 12 }, (_, index) => {
                    const filterUser = subscriptionStats.find(e => e._id.status === "expired" && e._id.month === index + 1);
                    if (filterUser) {
                        return filterUser.total;
                    } else {
                        return 0;
                    }
                }),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
            },
        ],
    };
    return (
        <Line options={options} data={data} />
    )
}

export default AreaChart