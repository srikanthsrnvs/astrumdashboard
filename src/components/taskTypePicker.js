import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TaskTypeCard from './taskTypeCard'
import predictor from '../images/2.png'
import img_classifier from '../images/1.png'
import classifier from '../images/3.png'
import custom from '../images/4.png'
import puppy from '../images/puppy.jpg'
import dog_and_cat from '../images/dog_and_cat.jpeg'
import bounding_box from '../images/bounding_box.png'
import { Typography, Divider } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function TaskTypePicker(props) {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <h2 style={{paddingTop: 20}}>Computer Vision</h2>
                <Grid container justify="flex-start" style={{paddingBottom: 50}} spacing={spacing}>
                    <Grid key="image_classification" item>
                        <TaskTypeCard
                            linkTo='/image_classification'
                            image={puppy}
                            title="Image Classification" 
                            text="Detect the class of an image."
                            tags={['Dog']}
                        />
                    </Grid>
                    <Grid key="object_detection" item>
                        <TaskTypeCard
                            linkTo='/object_detection'
                            image={dog_and_cat}
                            title="Object Detection" 
                            text="Detect multiple objects within an single image."
                            tags={['Dog', 'Cat']}
                        />
                    </Grid>
                    <Grid key="object_localization" item>
                        <TaskTypeCard
                            linkTo='/object_localization'
                            image={bounding_box}
                            title="Object Localization" 
                            text="Detect multiple objects in a single image, and draw bounding boxes around them"
                            tags={['Dog', 'Cat', 'Bird']}
                        />
                    </Grid>
                </Grid>
                <Divider />
                <h2 style={{paddingTop: 20}}>Tabular Data</h2>
                <Grid container justify="flex-start" style={{paddingBottom: 50}} spacing={spacing}>
                    <Grid key="structured_prediction" item>
                        <TaskTypeCard
                            linkTo='/structured_prediction'
                            image={predictor}
                            title="Data prediction" 
                            text="Choose this option if the prediction target is continuous. For instance, predict revenue next month given a set of features in a CSV file." 
                        />
                    </Grid>
                    <Grid key="structured_classification" item>
                        <TaskTypeCard
                            linkTo='/structured_classification'
                            image={classifier}
                            title="Data classification" 
                            text="Choose this option if the prediction target is discrete. For instance, predict if a customer would default on a loan." 
                        />
                    </Grid>
                    <Grid key="custom" item>
                        <TaskTypeCard
                            linkTo='/custom'
                            image={custom}
                            title="Custom model" 
                            text="Choose this option if you want to build a custom deep learning model, tuned to your data. We'll find you the best possible model, billed at $4/hr to search for an architecture & train the model. (Recommended only for experts)" 
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}