import React from 'react'
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import GridViewIcon from '@mui/icons-material/GridView';
import useStateContext from '../../context/ContextProvider';
import DeleteIcon from '@mui/icons-material/Delete';

const ControlPanel = () => {
  const { adminControlPanel, handleAdminControlPanel } = useStateContext()
  const options = [
    {
      name: "Table",
      icon: <GridViewIcon className='' />
    },
    {
      name: "Charts",
      icon: <BarChartIcon className='' />
    },
    {
      name: "Add User",
      icon: <PersonAddIcon className='' />
    },
    {
      name: "Edit User",
      icon: <EditIcon className='' />
    },
    {
      name: "Delete User",
      icon: <DeleteIcon className='' />
    },

  ]
  return (
    <div className='flex-[1] bg-white  border border-gray-300 rounded-md overflow-hidden h-[650px] transition-all duration-300' >
      {options.map((i, index) => (
        <p
          onClick={() => handleAdminControlPanel(i.name)}
          key={index}
          className={`w-full py-3 px-6 font-medium transition-all cursor-pointer flex items-center gap-4 active:bg-stone-300 text-stone-600 select-none border-b
          ${adminControlPanel[i.name] ? "bg-stone-300" : "hover:bg-stone-200"}
        `}
        >
          {i.icon}
          {i.name}
        </p>
      ))
      }

    </div>
  )
}

export default ControlPanel