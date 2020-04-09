import React, { useEffect, useState, useRef } from 'react';
import ProjectBuilder from './projectBuilder'
import SideMenu from './sideMenu'
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import ProjectsTable from './projectsTable';

export default function Dashboard(props) {

  const user = props.user;
  const firebase = props.firebase;
  const [jobData, setJobData] = useState({})
  let match = useRouteMatch()
  const ref = useRef(jobData)
  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    firebase.listenForData(user, function (job, job_data) {
      ref.current = {...ref.current, [job]: job_data}
      setJobData(ref.current)
    })
  }

  return (
    <div>
      <SideMenu
        firebase={firebase}
      />
      <Switch>
        <Route path={`${match.path}/new_project`}>
          <ProjectBuilder user={user} firebase={firebase} />
        </Route>
        <Route exact path={`${match.path}/all_projects`}>
          <ProjectsTable user={user} data={jobData} firebase={firebase} />
        </Route>
        <Route path={`${match.path}/settings`}>
          <div>
            Settings page
          </div>
        </Route>
      </Switch>
    </div>
  )
}
