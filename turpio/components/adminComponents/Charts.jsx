import React from 'react'
import AreaChart from './AreaChart'
import DoughnutChart from './DoughnutChart'
import LineChart from './LineChart'


const Charts = () => {
  return (
    <div className='flex-[3] border-2 border-violet-600 rounded-md min-h-[650px] p-8 flex flex-col gap-12 items-center' >
  
    <div className='flex gap-6' >

      <div className='w-[400px] h-fit' >
        <LineChart />
      </div>

      <div className='w-[400px] h-fit' >
        <AreaChart />
      </div>
    
    </div>

      <div className='w-[400px] h-fit' >
        <DoughnutChart />
      </div>
    </div>
  )
}

export default Charts