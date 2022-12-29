import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';



const DataTable = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 180,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 110,
    },
    {
      field: 'bookingPage',
      headerName: 'Booking Page',
      width: 180,
      renderCell: params => {
        return (
          <a key={params.row.bookingPage} className={`text-blue-600 hover:underline`} href="#">
            {params.row.bookingPage}
          </a>

        )
      },
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: "isAdmin",
      headerName: "Role",
      renderCell: params => {
        return (
          <p key={params.row.id} className={`${params.row.isAdmin ? "text-green-500" : "text-red-500"} capitalize`} >{params.row.isAdmin.toString()}</p>
        )
      },
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      renderCell: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },

    {
      field: 'edit',
      headerName: 'Edit',
      renderCell: params => {
        return (
          <div key={params.row.id} className='flex gap-2 items-center' >

            <button className='rounded-md py-1 px-3 text-white  bg-violet-600 hover:bg-violet-400 transition-all' >Edit</button>

            <IconButton aria-label="delete">
              <DeleteIcon className="text-red-600 hover:text-red-300 transition-all cursor-pointer" />
            </IconButton>
          </div>
        )
      },
      width: 140,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, email: "joe@gmail.com", gender: "Male", isAdmin: true, bookingPage: "https://turpio.com" },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, email: "joe@gmail.com", gender: "Male", isAdmin: false, bookingPage: "https://turpio.com" },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, email: "joe@gmail.com", gender: "Male", isAdmin: false, bookingPage: "https://turpio.com" },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, email: "joe@gmail.com", gender: "Male", isAdmin: false, bookingPage: "https://turpio.com" },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 110, email: "joe@gmail.com", gender: "Male", isAdmin: false, bookingPage: "https://turpio.com" },
    { id: 6, lastName: 'Melisandre', firstName: "joe", age: 150, email: "joe@gmail.com", gender: "Male", isAdmin: false, bookingPage: "https://turpio.com" },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, email: "joe@gmail.com", gender: "Male", isAdmin: false, bookingPage: "https://turpio.com" },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, email: "joe@gmail.com", gender: "Male", isAdmin: false, bookingPage: "https://turpio.com" },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: "joe@gmail.com", gender: "Male", isAdmin: false, bookingPage: "https://turpio.com" },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: "joe@gmail.com", gender: "Male", isAdmin: false, bookingPage: "https://turpio.com" },
    { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: "joe@gmail.com", gender: "Male", isAdmin: false, bookingPage: "https://turpio.com" },
    { id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: "joe@gmail.com", gender: "Male", isAdmin: false, bookingPage: "https://turpio.com" },
    { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: "joe@gmail.com", gender: "Male", isAdmin: false, bookingPage: "https://turpio.com" },
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
          rows={rows}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}

          checkboxSelection
          components={{ Toolbar: GridToolbar }}

        // disableRowSelectionOnClick
        />
      </Box>
    </div>
  )
}

export default DataTable