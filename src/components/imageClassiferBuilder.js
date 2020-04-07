import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import FileDropper from './fileDropper'
import Button from '@material-ui/core/Button'



const styles = {
    buildButton: {
        marginTop: '20px'
    }
}

export default function ImageClassiferBuilder(props){

    const [files, setFiles] = useState([])
    const user = props.user;
    const [datasetID, setDatasetID] = useState("")
    const [jobID, setJobID] = useState("")

    function upload_dataset(){
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://astrumdashboard.appspot.com/datasets')
        xhr.setRequestHeader("Content-Type", "application/json");

        var post_body = {
            "type": "image_classification",
            "uploaded_by": user.uid
        }
        for (const index in files){
            // const file = files[index]
            // const filename = file['name']
            // const filedata = {'link': file['link'], 'metadata': file['metadata']}
            post_body["child_datasets"] = files
        }
        xhr.send(JSON.stringify(
            post_body
        ))
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const datasetID = JSON.parse(xhr.response).dataset_id
                setDatasetID(datasetID)
                beginTraining(datasetID)
            }
        })
    }

    function beginTraining(dID){
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://astrumdashboard.appspot.com/jobs')
        xhr.setRequestHeader("Content-Type", "application/json");

        var post_body = {
            "type": "image_classification",
            "dataset": dID,
            "created_by": user.uid,
            "created_at": Math.floor(new Date()/1000)
        }

        xhr.send(JSON.stringify(
            post_body
        ))
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const jobID = JSON.parse(xhr.response).job_id
                console.log("Recieved jobID "+jobID)
                setJobID(jobID)
            }
        })
    }

    function build_classifer(){
        upload_dataset()
    }

    return (
        <div>
            <Typography>First we'll need to upload data. In the box below, drop folders containing your image classes</Typography>
            <Typography>You'll need to organize your images into folders to make sure that the algorithm learns correctly. For instance, if you want to classify dogs vs. cats, you'll need to create two folders. One containing dog images, and another containing cat images.</Typography>
            <FileDropper setFilesAction={setFiles} firebase={props.firebase} user={props.user}></FileDropper>
            <div>
                <Button style={styles.buildButton} variant='outlined' color='primary' disabled={Object.keys(files).length < 2} onClick={build_classifer}>Build Predictor</Button>
            </div>
        </div>
    )
}