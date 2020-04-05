import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TaskTypeCard from './taskTypeCard'
import predictor from '../images/2.png'
import img_classifier from '../images/1.png'
import classifier from '../images/3.png'
import custom from '../images/4.png'


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
                <Grid container justify="flex-start" spacing={spacing}>
                    <Grid key="image_classification" item>
                        <TaskTypeCard
                            onClick={props.onClick.bind(null, 1)}
                            image={img_classifier}
                            title="Image Classification" 
                            text="Image classifiers are use to predict the object in an image. For instance, classifying whether an image contains a cat, or a dog" 
                        />
                    </Grid>
                    <Grid key="structured_predictor" item>
                        <TaskTypeCard 
                            onClick={props.onClick.bind(null, 2)}
                            image={predictor}
                            title="Data prediction" 
                            text="Choose this option if the prediction target is continuous. For instance, predict revenue next month given a set of features in a CSV file." 
                        />
                    </Grid>
                    <Grid key="structured_classifier" item>
                        <TaskTypeCard 
                            onClick={props.onClick.bind(null, 3)}
                            image={classifier}
                            title="Data classification" 
                            text="Choose this option if the prediction target is discrete. For instance, predict if a customer would default on a loan." 
                        />
                    </Grid>
                    <Grid key="custom" item>
                        <TaskTypeCard 
                            onClick={props.onClick.bind(null, 3)}
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