import React, { useEffect, useState } from 'react'
import useStateContext from '../../context/ContextProvider'
import AreaChart from './AreaChart'
import DoughnutChart from './DoughnutChart'
import LineChart from './LineChart'
import { CircularProgress } from '@mui/material';

const Charts = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { fetchUserStats, fetchEventStats, fetchAllStats, fetchSubscriptionStats } = useStateContext();
  const [statistics, setStatistics] = useState({
    userStats: null,
    eventStats: null,
    subscriptionStats: null,
    allStats: null,
  })
  useEffect(() => {
    fetchUserStats(setStatistics, setIsLoading);
    fetchEventStats(setStatistics, setIsLoading);
    fetchAllStats(setStatistics, setIsLoading);
    fetchSubscriptionStats(setStatistics, setIsLoading);
  }, []);
  console.log(statistics);
  return (
    <div className='flex-[3] border-2 border-violet-600 rounded-md min-h-[650px] p-8 flex flex-col gap-12 items-center' >
      {isLoading ?
        <div className='w-full h-[50vh] grid place-items-center' >
          <div>
            <CircularProgress size={50} />
            <p className='text-[14px] text-stone-400 font-medium' >Loading...</p>
          </div>

        </div>
        : Object.values(statistics).every(e => Boolean(e)) ?
          <div className='flex flex-col gap-12 items-center' >


            <div className='w-[600px] h-fit' >
              <p className='text-zinc-500 font-semibold text-[24px] text-center mb-6' >User and Events Analytics</p>
              <LineChart
                userStats={statistics.userStats}
                eventStats={statistics.eventStats}
              />
            </div>

            <div className='w-[500px] h-fit' >
              <p className='text-zinc-500 font-semibold text-[24px] text-center mb-6' >All Statistics</p>
              <DoughnutChart
                allStats={statistics.allStats}
              />
            </div>

            <div className='w-[600px] h-fit' >
              <p className='text-zinc-500 font-semibold text-[24px] text-center mb-6' >User's Subscription Analytics</p>
              <AreaChart
                subscriptionStats={statistics.subscriptionStats}
              />
            </div>


          </div>
          :
          <div className='w-full h-[50vh] grid place-items-center' >
            <div>
              <p className='text-[20px] font-bold text-stone-600' >No Charts to Show due to lack of data...</p>
            </div>
          </div>
      }
    </div>
  )
}

export default Charts