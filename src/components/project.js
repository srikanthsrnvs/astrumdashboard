import React, { useEffect, useState, useRef } from 'react';
import { useRouteMatch, Link } from 'react-router-dom'
import ImageUploader from 'react-images-upload'
import { Button, Typography, Divider } from '@material-ui/core'
import { GetApp } from '@material-ui/icons'
import { CodeBlock, dracula } from 'react-code-blocks'

export default function Project(props) {

    const match = useRouteMatch()
    const data = props.data[match.params.id]
    const [image, setImage] = useState(null)
    const [results, setResults] = useState({})
    var title = ''
    if (data.type == 'image_classification'){
        title = 'Classify a new image below'
    }

    function onDrop(uploadedImages, url) {
        setImage(uploadedImages[0])
    }

    function performPrediction() {
        setResults({})
        const url = 'http://127.0.0.1:8080/predict/' + match.params.id
        const formData = new FormData()
        formData.append('image', image)
        const options = {
            method: 'POST',
            body: formData
        }
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                setResults(result)
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    function downloadTensorboard(){
        window.open(data.tb_logs, '_blank');
    }

    const ShowResults = () => {
        const predictions = results['predictions']
        return (
            <div>
                <h2>
                    Predicted {results['label_map'][predictions[0].indexOf(Math.max(...predictions[0])).toString()]} with {Math.max(...predictions[0]) * 100}% confidence
                </h2>
                <p>
                    Did we make a wrong prediction? Check out this article to see why machine learning can sometimes make errors.
                </p>
            </div>
        )
    }

    const ShowPredictor = () => {
        return (
            <div>
                <Button variant='contained' color='primary' onClick={performPrediction}>Predict</Button>
            </div>
        )
    }

    const ShowCodeBlock = () => {
        return (
            <div>
                <h2>
                    Make predictions in your apps
                </h2>
                <CodeBlock
                    text={`url = 'https://predictions.astrum.ai/predict/${match.params.id}'\n# We have to send images using multipart-form data\nimage = open(PATH_TO_IMAGE)\nimage.upload()`}
                    language={'python'}
                    showLineNumbers={true}
                    wrapLines
                    theme={dracula}
                />
            </div>
        )
    }


    return (
        <div>
            <h1>{data.name}</h1>
            <Divider style={{marginBottom: 30}}></Divider>
            {/* <Button variant='text' color='primary' onClick={downloadTensorboard} endIcon={<GetApp />}>
                Tensorboard logs
            </Button> */}
            <h2>{title}</h2>
            <ImageUploader
                withIcon={true}
                buttonText='Upload Image'
                onChange={onDrop}
                imgExtension={['.jpg', '.jpeg', '.png']}
                singleImage={true}
                withPreview={true}
            />
            {image && <ShowPredictor />}
            {Object.keys(results).length > 0 && <ShowResults />}
            <Divider style={{marginBottom: 30, marginTop: 30}}></Divider>
            <ShowCodeBlock />
        </div>
    )
}