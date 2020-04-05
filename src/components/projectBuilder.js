import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DropboxIcon from './Icons/dropboxIcon'
import Chip from '@material-ui/core/Chip'
import FeatureChips from './featureChips'
import TargetSelector from './targetSelector';
import ParsingContainer from './parsingContainer'
import CircularProgress from '@material-ui/core/CircularProgress';
import Dropzone from 'react-dropzone'
import FileDropper from './fileDropper'
import TaskTypePicker from './taskTypePicker'
import ImageClassiferBuilder from './imageClassiferBuilder';


const styles = makeStyles(theme => ({
    dropboxButton: {
        marginTop: '20px'
    },
    chip: {
        marginTop: '10px'
    }
}));

export default function ProjectBuilder(props) {

    const classes = styles();
    const [filename, setFilename] = useState("No file selected");
    const [filelink, setFilelink] = useState("");
    const [csvHeaders, setCSVHeaders] = useState([])
    const [features, setFeatures] = useState([])
    const [target, setTarget] = useState("")
    const [selectedType, setSelectedType] = useState(0)
    const user = props.user
    const firebase = props.firebase

    function deleteSelectedFile() {
        setFilename("No file selected")
        setFilelink("")
        setCSVHeaders([])
        setFeatures([])
        setTarget("")
    }

    function getHeaders(link, size) {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://astrumdashboard.appspot.com/datasets')
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ "link": link, "size":  size, "uid": user.uid}))
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var headers = JSON.parse(xhr.response).features
                setCSVHeaders(headers)
                setFeatures(headers)
            }
        })
    }

    function connectToDropbox() {

        var script = document.createElement('script')
        script.setAttribute('data-app-key', 'z5p9y3pr6ufqsbh')
        script.src = "https://www.dropbox.com/static/api/2/dropins.js"
        script.id = "dropboxjs"
        script.type = "text/javascript"
        document.head.appendChild(script);

        console.log("clicked")
        var options = {

            // Required. Called when a user selects an item in the Chooser.
            success: function (file) {
                var filename = file[0].name
                setFilelink(file[0].link)
                setFilename(filename)
                getHeaders(file[0].link, file[0].bytes)
            },
            cancel: function () {

            },
            linkType: "direct", // or "direct"
            multiselect: false, // or true
            folderselect: false, // or true
            extensions: ['.csv']
        };
        script.onerror = function () {
            console.log("Err")
        }
        script.onload = function () {
            window.Dropbox.choose(options)
        }
        if (window.Dropbox) {
            console.log("Trying to open picker")
            window.Dropbox.choose(options)
        }

    }

    function targetSelected(target) {
        setTarget(target)
        console.log(target)
    }

    function featuresSelected(features) {
        setFeatures(features)
        console.log(features)
    }

    function buildPressed(response) {
        console.log(response)
    }

    const ShowFeatures = (function () {
        if (features.length > 0) {
            return (
                <div>
                    <FeatureChips features={features} onSelection={featuresSelected} />
                    <br></br>
                    <TargetSelector target={target} features={csvHeaders} onSelection={targetSelected} />
                    <br></br>
                    <ParsingContainer target={target} features={features} onBuild={buildPressed}></ParsingContainer>
                </div>
            )
        } else {
            return (
                null
            )
        }
    })

    const ShowBuilder = (function() {
        if (selectedType == 0){
            return(
                <TaskTypePicker onClick={setSelectedType}/>
            )
        }else if (selectedType == 1){
            return(
                <ImageClassiferBuilder firebase={firebase} user={props.user}/>
            )
        }else if (selectedType == 2){
            return(
                null
            )
        }else if (selectedType == 3){
            return(
                null
            )
        }
    })

    return (
        <div>
            <h1>Let's get started</h1>
            <ShowBuilder />
        </div>
    )
}