import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TaskTypePicker from './taskTypePicker'
import ImageClassiferBuilder from './imageClassiferBuilder';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import ObjectDetectionBuilder from './objectDetectionBuilder'


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
    const match = useRouteMatch()

    return (
        <div className={classes.content}>
            <Switch>
                <Route exact path={`${match.path}`}>
                    <TaskTypePicker />
                </Route>
                <Route path={`${match.path}/image_classification`}>
                    <ImageClassiferBuilder firebase={firebase} user={props.user}/>
                </Route>
                <Route path={`${match.path}/object_detection`}>
                    <ObjectDetectionBuilder firebase={firebase} user={props.user}/>
                </Route>
                <Route path={`${match.path}/object_localization`}>
                    <ImageClassiferBuilder firebase={firebase} user={props.user}/>
                </Route>
                <Route path={`${match.path}/structured_classification`}>
                    <ImageClassiferBuilder firebase={firebase} user={props.user}/>
                </Route>
                <Route path={`${match.path}/structured_prediction`}>
                    <ImageClassiferBuilder firebase={firebase} user={props.user}/>
                </Route>
                <Route path={`${match.path}/custom`}>
                    <ImageClassiferBuilder firebase={firebase} user={props.user}/>
                </Route>
            </Switch>
        </div>
    )
}