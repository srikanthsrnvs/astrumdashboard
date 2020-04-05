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

    function upload_dataset(){
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://astrumdashboard.appspot.com/datasets')
        xhr.setRequestHeader("Content-Type", "application/json");

        var post_body = {
            "type": "image_classification",
            "uploaded_by": user.uid
        }

        for (const file in files){
            post_body["child_datasets"][file] = files[file]
        }
        xhr.send(JSON.stringify({
            post_body
        }))
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                setDatasetID(JSON.parse(xhr.response).dataset_id)
                console.log("Recieved data ", JSON.parse(xhr.response))
            }
        })
    }

    function beginTraining(){
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://astrumdashboard.appspot.com/jobs')
        xhr.setRequestHeader("Content-Type", "application/json");

        var post_body = {
            "type": "image_classification",
            "dataset": datasetID,
            "created_by": user.uid,
            "created_at": Math.floor(new Date()/1000)
        }

        xhr.send(JSON.stringify({
            post_body
        }))
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var headers = JSON.parse(xhr.response).features
                console.log("Posted dataset")
                
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