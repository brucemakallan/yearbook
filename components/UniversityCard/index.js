import React from 'react';
import { Link } from 'next/router';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

import useStyles from './styles';
import CustomNextLink from '../CustomNextLink';

const UniversityProfile = ({ university }) => {
  const classes = useStyles();

  const { id, name, user } = university;

  const handleDelete = () => {
    console.log(id); // TOOD: finish this
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="primary" variant="h2" gutterBottom>
          {name}
        </Typography>
        <Typography variant="overline" gutterBottom>
          {`CREATED BY: ${user.firstName} ${user.lastName}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="outlined" color="primary" size="small" startIcon={<EditIcon />}>
                  <CustomNextLink className={classes.link} href={`${id}/edit`}>Edit</CustomNextLink>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="outlined" color="primary" size="small">
                  <CustomNextLink className={classes.link} href={'departments'}>Departments</CustomNextLink>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary" size="small">
                  <CustomNextLink className={classes.link} href={'students'}>Students</CustomNextLink>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default UniversityProfile;
