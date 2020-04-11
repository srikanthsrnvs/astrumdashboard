import React, {useEffect, useState, useReducer} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton, Button, LinearProgress } from '@material-ui/core';
import {GetApp} from '@material-ui/icons'
import { useHistory, useRouteMatch, Route, Switch } from 'react-router';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  content:{
    paddingLeft: 100,
    paddingTop: 75,
    paddingRight: 50
  }
});

export default function ProjectsTable(props) {
  const classes = useStyles();
  const firebase = props.firebase
  const user = props.user
  const data = props.data
  const history = useHistory()
  const match = useRouteMatch()

  const handleClick = (dataInstance) => {
    console.log(dataInstance)
    history.push(match.path+'/'+dataInstance)
  }

  const ProjectTableContents = () => {
    var contents = []
    Object.keys(data).forEach(instance => {
      const jobData = data[instance]
      contents.push(
        <StyledTableRow key={instance} style={{cursor:'pointer'}} hover>
          <StyledTableCell onClick={handleClick.bind(null, instance)} component="th" scope="row">
            {jobData.name}
          </StyledTableCell>
          <StyledTableCell onClick={handleClick.bind(null, instance)} align="center">
            <LinearProgress variant="determinate" value={(jobData.status/3)*100} valueBuffer={50} />
          </StyledTableCell>
          <StyledTableCell onClick={handleClick.bind(null, instance)} align="center">{jobData.type}</StyledTableCell>
          <StyledTableCell align="center">
            <IconButton>
              <a style={{color: 'blue'}} href={jobData.model} target="_blank">
                <GetApp />
              </a>
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
      )
    })
    return contents == [] ? null : contents
  }


  return (
    <div className={classes.content}>
      <h1>
        All Projects
      </h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Projects Table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Model Type</StyledTableCell>
              <StyledTableCell align="center">Download Model</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ProjectTableContents />
          </TableBody>
        </Table>
      </TableContainer>
      <Switch>
        <Route path={`${match.path}/:instanceid`}>
          <div>
            {console.log(match.path)}
          </div>
        </Route>
      </Switch>
    </div>
  );
}
