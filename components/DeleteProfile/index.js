import React from 'react';
import get from 'lodash/get';
import { useMutation } from '@apollo/react-hooks';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import CustomAlert from '../CustomAlert';
import AlertDialog from '../AlertDialog';
import { clearToken, getDecodedToken, getToken } from '../../helpers/jwt';
import { DELETE_USER_MUTATION } from '../../graphql/user/mutations';

const DeleteProfile = () => {
  const handleOnCompleted = (data) => {
    if (data?.deleteUser?.id) {
      clearToken();
    }
  };

  const [deleteUser, _deleteUserResponse] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: handleOnCompleted,
  });

  const handleDelete = async (_event) => {
    try {
      const user = getDecodedToken(getToken());
      const userId = get(user, '_id');
      await deleteUser({ variables: { userId } });
    } catch (err) {
      return err;
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="h5">
          Permanently deleted account
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <CustomAlert
          canClose={false}
          severity="warning"
          compact
          message={`
          Please note that you won't be able to reactivate your account or 
          retrieve any information from it.
        `}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <AlertDialog
          title="Permanently delete account?"
          handleYes={handleDelete}
          buttonText="Permanently Delete My Account"
          buttonProps={{
            variant: 'contained',
            color: 'primary',
          }}
        >
          <Typography variant="body2">
            Are you sure you want to permanently delete this account? This action cannot be undone.
          </Typography>
        </AlertDialog>
      </Grid>
    </Grid>
  );
};

export default DeleteProfile;
