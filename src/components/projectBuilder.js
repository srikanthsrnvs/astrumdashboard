import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TaskTypePicker from './taskTypePicker'
import ImageClassiferBuilder from './imageClassiferBuilder';


const styles = makeStyles(theme => ({
    dropboxButton: {
        marginTop: '20px'
    },
    chip: {
        marginTop: '10px'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        paddingTop: 75,
        paddingLeft: 100,
    }
}));

export default function ProjectBuilder(props) {

    const classes = styles();
    const [selectedType, setSelectedType] = useState(0)
    const user = props.user
    const firebase = props.firebase

    const ShowBuilder = (function() {
        if (selectedType == 0){
            return(
                <TaskTypePicker onClick={setSelectedType}/>
            )
        }else if (selectedType == 1){
            return(
                <ImageClassiferBuilder firebase={firebase} user={props.user}/>
            )
        }else if (selectedType == 2){
            return(
                null
            )
        }else if (selectedType == 3){
            return(
                null
            )
        }
    })

    return (
        <div className={classes.content}>
            <h1>Let's get started</h1>
            <ShowBuilder />
        </div>
    )
}