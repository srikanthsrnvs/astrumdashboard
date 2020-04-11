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

export default function ImageClassiferBuilder(props) {

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
            "type": "image_classification",
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
            "type": "image_classification",
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
                    <TreeItem nodeId='0' label="data.zip">
                        <TreeItem nodeId="1" label="Dogs">
                            <TreeItem nodeId="2" label="dog1.jpg" />
                            <TreeItem nodeId="3" label="dog2.jpg" />
                            <TreeItem nodeId="4" label="dog3.jpg" />
                        </TreeItem>
                        <TreeItem nodeId="5" label="Cats">
                            <TreeItem nodeId="6" label="cat1.jpg" />
                            <TreeItem nodeId="7" label="cat2.jpg" />
                            <TreeItem nodeId="8" label="cat3.jpg" />
                        </TreeItem>
                        <TreeItem nodeId="9" label="Birds">
                            <TreeItem nodeId="10" label="bird1.jpg" />
                            <TreeItem nodeId="11" label="bird2.jpg" />
                            <TreeItem nodeId="12" label="bird3.jpg" />
                        </TreeItem>
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
            <h2>Image Classification</h2>
            <Typography variant='body2'>First we'll need to upload data. In the box below, drop folders containing images of a particular class.</Typography>
            <br></br>
            <Typography variant='body2'>You'll need to organize your images into folders to make sure that the algorithm learns correctly. Here's a folder structure for a classifier that learns to classify Dogs, Cats, and Birds:</Typography>
            <ShowExampleTree />
            <Typography variant='body2'>Ensure that each folder inside your zipfile is named according to the class of images it contains.</Typography>
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