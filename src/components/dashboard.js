import React from 'react';
import ProjectBuilder from './projectBuilder'
import SideMenu from './sideMenu'
import AllProjects from './allProjects'

const drawerWidth = 240;

export default function Dashboard(props) {
  const user = props.user;
  const firebase = props.firebase;
  const [data, setData] = React.useState({});

  function loadData(){
    // TODO
  }

  return (
    <div>
      <SideMenu
        newProject={<ProjectBuilder user={user} />}
        allProjects={<AllProjects user={user} data="" firebase={firebase}/>}
        settings={console.log("Hello")}
        firebase={firebase}
      />
    </div>
  );
}
