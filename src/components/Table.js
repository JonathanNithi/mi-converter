import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { configDotenv } from 'dotenv';

export default function DataTable({tableData}) {

    const columns = [
        { field: 'id', headerName: 'No.', width: 50 },
        { field: 'Date', headerName: 'Date', width: 130 },
        {
          field: 'Exchange Rate',
          headerName: 'Exchange Rate',
          type: 'number',
          width: 90,
        }
      ];
      

  return (
    <div style={{ height: 400, width: 'fit-content' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={(tableData) => tableData?.id}
      />
    </div>
  );
}