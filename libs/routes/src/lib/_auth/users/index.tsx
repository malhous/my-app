import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useDeleteUser, useGetUsers, UserResponse } from '@my-app/users';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';

import { CreateUser } from './-createUser';

export const Route = createFileRoute('/_auth/users/')({
  component: UsersRoute,
});

function UsersRoute() {
  const { data: users } = useGetUsers();
  const { handleDeleteUser, isPending } = useDeleteUser();
  const navigate = useNavigate();

  const columns = useMemo<GridColDef<UserResponse>[]>(
    () => [
      { field: '_id', headerName: 'ID', flex: 0.5 },
      { field: 'firstName', headerName: 'First Name' },
      { field: 'lastName', headerName: 'Last Name' },
      { field: 'age', headerName: 'Age' },
      { field: 'email', headerName: 'Email', flex: 1 },
      { field: 'isAdmin', headerName: 'Is Admin' },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ row }) => {
          return [
            <GridActionsCellItem
              icon={
                isPending ? (
                  <CircularProgress />
                ) : (
                  <Typography component="span" variant="caption" color="error">
                    Delete
                  </Typography>
                )
              }
              label="Delete"
              onClick={() => handleDeleteUser(row._key)}
              color="inherit"
            />,
          ];
        },
      },
    ],
    []
  );

  return (
    <Box style={{ width: '100%' }}>
      <DataGrid
        rows={users?.map((user) => ({ ...user, id: user._key }))}
        columns={columns}
        onRowClick={(e) => navigate({ to: e.id })}
        hideFooter
        disableColumnSorting
      />
      <Box paddingTop="1.5rem" display="flex" justifyContent="flex-end">
        <CreateUser />
      </Box>
    </Box>
  );
}
