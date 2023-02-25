import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import useStateContext from '../../context/ContextProvider';



const DataTable = () => {
  const { fetchAllUsersForAdmin, cookieUser } = useStateContext();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cookieUser) {
      fetchAllUsersForAdmin(cookieUser.id, setData, setIsLoading);
    }
  }, [cookieUser])

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 150,
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 180,
      renderCell: params => {
        return (
          <a key={params.row.email} className={`text-blue-600 hover:underline`} href={`mailto:${params.row.email}`}>
            {params.row.email}
          </a>

        )
      },
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 110,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'calendarsLink',
      headerName: 'Calendars',
      width: 200,
      renderCell: params => {
        return (
          <a target="__blank" key={params.row.calendarsLink} className={`text-blue-600 hover:underline`} href={params.row.calendarsLink}>
            {params.row.calendarsLink}
          </a>

        )
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 110,
    },
    {
      field: 'timeZone',
      headerName: 'Time Zone',
      width: 160,
    },
    {
      field: 'language',
      headerName: 'Language',
      width: 110,
    },
    {
      field: 'subscription',
      headerName: 'Subscription Status',
      renderCell: params => {
        return (
          <p key={params.row.id} className={`${params.row.subscription.status === "trial" ? "text-yellow-500" :
            params.row.subscription.status === "monthly" || params.row.subscription.status === "yearly" ?
              "text-green-500" : "text-red-500"} capitalize`} >{params.row.subscription.status}</p>
        )
      },
      width: 160,
    },
    {
      field: "googleAuth",
      headerName: "Google Auth",
      renderCell: params => {
        return (
          <p key={params.row.id} className={`${params.row.googleAuth ? "text-green-500" : "text-red-500"} capitalize`} >{params.row.googleAuth.toString()}</p>
        )
      },
      width: 120,
    },
    {
      field: "isAdmin",
      headerName: "Role",
      renderCell: params => {
        return (
          <p key={params.row.id} className={`${params.row.isAdmin ? "text-green-500" : "text-red-500"} capitalize`} >{params.row.isAdmin ? "Admin" : "User"}</p>
        )
      },
      width: 90,
    },
    // {
    //   field: 'edit',
    //   headerName: 'Edit',
    //   renderCell: params => {
    //     return (
    //       <div key={params.row.id} className='flex gap-2 items-center' >

    //         <button className='rounded-md py-1 px-3 text-white  bg-violet-600 hover:bg-violet-400 transition-all' >Edit</button>

    //         <IconButton aria-label="delete">
    //           <DeleteIcon className="text-red-600 hover:text-red-300 transition-all cursor-pointer" />
    //         </IconButton>
    //       </div>
    //     )
    //   },
    //   width: 140,
    // },
  ];


  return (
    <div className='flex-[4] h-[660px] transition-all duration-300'>
      <Box sx={{
        width: "100%",
        height: "100%",
        "& 	.MuiDataGrid-root": {
          borderRadius: "8px"
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          color: "rgba(255 255 255)",
          fontWeight: "600"
        },
        "& .MuiDataGrid-columnHeaders": {
          background: "rgb(109 40 217)",
          borderRadius: "0px",
        },
        "& .MuiDataGrid-footerContainer": {
          color: "rgba(255 255 255)",
          background: "rgb(109 40 217)",
          borderRadius: "0 0 6px 6px"
        },
        "& .MuiDataGrid-menuIconButton": {
          color: "rgb(255 255 255)"
        },
        "& .MuiDataGrid-sortIcon": {
          // background: "rgba(0, 0, 0, 0.1)",
          color: "rgb(255 255 255)",

        },
        "& 	.MuiDataGrid-columnSeparator": {
          color: "rgb(167 139 250)"

        },
        "& 		.MuiDataGrid-checkboxInput": {
          color: "rgb(59 130 246 )",

        },
        "& .MuiToolbar-root": {
          color: "rgb(255 255 255)",
        },
        "& .MuiTablePagination-actions > button": {
          color: "rgb(255 255 255)",
        },
        "& .MuiDataGrid-toolbarContainer": {
          background: "rgb(91 33 182)",
          gap: "15px",
          borderRadius: "6px 6px 0 0",
          borderBottom: "2px solid rgb(167 139 250)"
        },
        "& .MuiDataGrid-toolbarContainer > button ": {
          color: "rgb(255 255 255)",
        },
        "& .MuiDataGrid-columnHeaderTitleContainerContent >  span": {
          color: "rgb(255 255 255)",
        },
        "& .MuiDataGrid-row:hover": {
          background: "rgb(237 233 254)"
        }

      }} >

        <DataGrid
          rows={data}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          getRowId={(row) => row._id}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}

        // disableRowSelectionOnClick
        />
      </Box>
    </div>
  )
}

export default DataTable