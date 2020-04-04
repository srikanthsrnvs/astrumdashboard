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

    const [files, setFiles] = useState({})

    function upload_dataset(){
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://astrumdashboard.appspot.com/datasets')
        xhr.setRequestHeader("Content-Type", "application/json");

        // var post_body = {
        //     "type": "image_classifier"
        // }

        // for (file in files){
        //     post_body["child_datasets"][file] = files[file]
        // }
        // xhr.send(JSON.stringify({
        //     post_body
        // }))
        // xhr.addEventListener('load', () => {
        //     if (xhr.status === 200) {
        //         var headers = JSON.parse(xhr.response).features
        //         setCSVHeaders(headers)
        //         setFeatures(headers)
        //     }
        // })
    }


    function build_classifer(){
        console.log("BNutton pressed")
    }

    return (
        <div>
            <Typography>First we'll need to upload data. In the box below, drop folders containing your image classes</Typography>
            <Typography>You'll need to organize your images into folders to make sure that the algorithm learns correctly. For instance, if you want to classify dogs vs. cats, you'll need to create two folders. One containing dog images, and another containing cat images.</Typography>
            <FileDropper setFilesAction={setFiles} firebase={props.firebase} user={props.user}></FileDropper>
            <div>
                {console.log(files)}
                <Button style={styles.buildButton} variant='contained' color='primary' disabled={Object.keys(files).length < 2} onClick={build_classifer()}>Build Predictor</Button>
            </div>
        </div>
    )
}