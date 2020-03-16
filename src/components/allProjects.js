import React from 'react'
import ProjectsTable from './projectsTable'


export default function AllProjects(props) {
    const user = props.user;
    const firebase = props.firebase;
    const data = props.data;

    return (
        <div>
            <ProjectsTable data={data}/>
        </div>
    )
}