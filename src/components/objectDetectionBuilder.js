import React, { useState } from 'react'
import { Typography, ThemeProvider, TextField, CircularProgress, Snackbar, SnackbarContent, makeStyles } from '@material-ui/core'
import FileDropper from './fileDropper'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const styles = {
    buildButton: {
        marginTop: '40px'
    },
    projectName: {
        marginTop: '40px'
    }
}
const useStyles = makeStyles((theme) => ({
    root: {
        height: 'auto',
        flexGrow: 1,
        marginTop: 20,
        marginBottom: 20,
    },
}));

export default function ObjectDetectionBuilder(props) {

    const [file, setFile] = useState({})
    const user = props.user;
    const [jobName, setJobName] = useState("")
    const [jobID, setJobID] = useState("")
    const [loading, isLoading] = useState(false)
    const baseURL = 'https://astrumdashboard.appspot.com/'
    const classes = useStyles();


    function upload_dataset() {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', baseURL + 'datasets')
        xhr.setRequestHeader("Content-Type", "application/json");

        var post_body = {
            "type": "object_detection",
            "uploaded_by": user.uid,
            "file": file
        }
        xhr.send(JSON.stringify(
            post_body
        ))
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const datasetID = JSON.parse(xhr.response).dataset_id
                beginTraining(datasetID)
            }
        })
    }

    function beginTraining(dID) {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', baseURL + 'jobs')
        xhr.setRequestHeader("Content-Type", "application/json");

        var post_body = {
            "type": "object_detection",
            "dataset": dID,
            "created_by": user.uid,
            "created_at": Math.floor(new Date() / 1000),
            'name': jobName
        }

        xhr.send(JSON.stringify(
            post_body
        ))
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const jobID = JSON.parse(xhr.response).job_id
                console.log("Recieved jobID " + jobID)
                isLoading(false)
                setJobID(jobID)
            }
        })
    }

    const ShowExampleTree = () => {
        return (
            <div>
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >   
                    <TreeItem nodeId='0' label='data.zip'>
                        <TreeItem nodeId="1" label="images">
                            <TreeItem nodeId="2" label="01.jpg" />
                            <TreeItem nodeId="3" label="02.jpg" />
                            <TreeItem nodeId="4" label="03.jpg" />
                        </TreeItem>
                        <TreeItem nodeId="5" label="data.csv" />
                    </TreeItem>
                </TreeView>
            </div>
        )
    }

    function build_classifer() {
        isLoading(true)
        upload_dataset()
    }

    const ShowSpinner = () => {
        if (loading) {
            return (
                <CircularProgress />
            )
        } else {
            return (
                null
            )
        }
    }

    const SnackbarAction = (
        <Link to='/dashboard/all_projects' style={{ 'textDecoration': 'none', color: '#FFF' }}>
            <Button color='primary' variant='contained' size='small'>
                Track Job
            </Button>
        </Link>
    )

    return (
        <div style={{ marginTop: 20 }}>
            <h2>Object Detection</h2>
            <Typography variant='body2'>First we'll need to upload data. In the box below, you can upload your data</Typography>
            <br></br>
            <Typography variant='body2'>Your data needs to follow the following format;</Typography>
            <ShowExampleTree />
            <Typography variant='body2'>The images folder will need to contain all your images, and the CSV file will need to contain data about your images. Please download the example CSV above to see exactly how your data needs to be format.</Typography>
            <FileDropper setFile={setFile} firebase={props.firebase} user={props.user}></FileDropper>
            <form style={styles.projectName}>
                <h2>Give your project a name</h2>
                <TextField onChange={e => setJobName(e.target.value)} id='jobName' label='Project Name' variant='outlined' />
            </form>
            <Button style={styles.buildButton} variant='outlined' color='primary' disabled={file.name == "" || jobID !== "" || jobName === "" || loading} onClick={build_classifer}>Build Predictor</Button>
            <ShowSpinner />
            <Snackbar open={jobID !== ""} autoHideDuration={6000} anchorOrigin={{ 'horizontal': "right", 'vertical': "bottom" }}>
                <SnackbarContent
                    action={SnackbarAction}
                    message={"Sit tight, we're training a neural network for you ;)"}
                />
            </Snackbar>
        </div>
    )
}