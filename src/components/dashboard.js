import React from 'react';
import ProjectBuilder from './projectBuilder'
import SideMenu from './sideMenu'
import AllProjects from './allProjects'

export default class Dashboard extends React.Component {

  constructor(props){
    super(props)
    this.user = props.user
    this.firebase = props.firebase
    this.state = {
      data: {}
    }
  }

  loadData(){
    let dashboard = this;
    this.firebase.get_user_data(this.user, function(data){
      dashboard.setState({data: data})
    })
  }

  componentDidMount(){
    this.loadData()
  }

  render(){
    return (
      <div>
        <SideMenu
          newProject={<ProjectBuilder firebase={this.firebase} user={this.user} />}
          allProjects={<AllProjects user={this.user} data={this.state.data} firebase={this.firebase}/>}
          settings={5}
          firebase={this.firebase}
        />
      </div>
    );
  }
}
