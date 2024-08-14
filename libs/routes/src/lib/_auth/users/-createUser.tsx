import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { CreateUserRequest, useCreateUser } from '@my-app/users';
import { useRouter } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const CreateUser = () => {
  const { register, handleSubmit } = useForm<CreateUserRequest>();
  const { handleCreateUser, isPending, isError } = useCreateUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      setSnackbarOpen(true);
    }
  }, [isError]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit: SubmitHandler<CreateUserRequest> = async (data) => {
    await router.invalidate();
    handleCreateUser(data);
  };

  return (
    <React.Fragment>
      <Button variant="contained" size="small" onClick={handleDialogOpen}>
        Create User
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a User so that Mr. Nicolas doesn't get angry.
          </DialogContentText>
          <Box
            display="grid"
            gap="1rem"
            paddingY="0.5rem"
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <TextField
              {...register('email', {
                required: true,
                pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
              type="email"
              variant="outlined"
              label="Email"
              size="small"
            />
            <TextField
              {...register('password', {
                required: true,
                minLength: 6,
              })}
              type="password"
              variant="outlined"
              label="Password"
              size="small"
            />
            <TextField
              {...register('firstName', { required: true })}
              type="text"
              variant="outlined"
              label="First Name"
              size="small"
            />
            <TextField
              {...register('lastName', { required: true })}
              type="text"
              variant="outlined"
              label="Last Name"
              size="small"
            />
            <TextField
              {...register('dob', { required: true })}
              type="text"
              variant="outlined"
              label="Date of Birth"
              placeholder="(YYYY-MM-DD)"
              size="small"
            />
            <TextField
              {...register('age', {
                required: true,
                min: 0,
                valueAsNumber: true,
              })}
              type="number"
              variant="outlined"
              label="Age"
              size="small"
            />
            <FormControlLabel
              control={
                <Switch
                  {...register('isAdmin', { required: false })}
                  size="small"
                />
              }
              label="Is Admin"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button type="submit">
            {isPending ? <CircularProgress size="1.75rem" /> : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Error while creating the user!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
