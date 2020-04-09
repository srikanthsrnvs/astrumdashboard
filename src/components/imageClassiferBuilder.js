import React, { useState } from 'react'
import { Typography, ThemeProvider, TextField, CircularProgress, Snackbar, SnackbarContent } from '@material-ui/core'
import FileDropper from './fileDropper'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import { Link } from 'react-router-dom'


const styles = {
    buildButton: {
        marginTop: '40px'
    },
    projectName: {
        marginTop: '40px'
    }
}

export default function ImageClassiferBuilder(props) {

    const [files, setFiles] = useState([])
    const user = props.user;
    const [jobName, setJobName] = useState("")
    const [jobID, setJobID] = useState("")
    const [loading, isLoading] = useState(false)
    const baseURL = 'https://astrumdashboard.appspot.com/'

    function upload_dataset() {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', baseURL + 'datasets')
        xhr.setRequestHeader("Content-Type", "application/json");

        var post_body = {
            "type": "image_classification",
            "uploaded_by": user.uid
        }
        post_body["child_datasets"] = files
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

    const Redirect = () => {
        if (jobID){
            console.log("Redirecting")
            return (
                <Redirect to='/dashboard/all_projects'/>
            )
        }else{
            console.log("Not yet redirecting")
            return (
                null
            )
        }
    }

    const SnackbarAction = (
        <Link to='/dashboard/all_projects' style={{'textDecoration': 'none', color: '#FFF'}}>
            <Button color='primary' variant='contained' size='small'>
                Track Job
            </Button>
        </Link>
    )

    return (
        <div>
            <Typography>First we'll need to upload data. In the box below, drop folders containing your image classes</Typography>
            <Typography>You'll need to organize your images into folders to make sure that the algorithm learns correctly. For instance, if you want to classify dogs vs. cats, you'll need to create two folders. One containing dog images, and another containing cat images.</Typography>
            <FileDropper setFilesAction={setFiles} firebase={props.firebase} user={props.user}></FileDropper>
            <form style={styles.projectName}>
                <h2>Give your project a name</h2>
                <TextField onChange={e => setJobName(e.target.value)} id='jobName' label='Project Name' variant='outlined' />
            </form>
            <Button style={styles.buildButton} variant='outlined' color='primary' disabled={Object.keys(files).length < 2 || jobID !== "" || jobName === "" || loading} onClick={build_classifer}>Build Predictor</Button>
            <ShowSpinner />
            <Snackbar open={jobID !== ""} autoHideDuration={6000} anchorOrigin={{'horizontal': "right", 'vertical': "bottom"}}>
                <SnackbarContent
                    action={SnackbarAction}
                    message={"Sit tight, we're training a neural network for you ;)"}
                />
            </Snackbar>
        </div>
    )
}