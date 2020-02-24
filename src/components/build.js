import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUpload from '@material-ui/icons/CloudUpload'
import Chip from '@material-ui/core/Chip'
import FeatureChips from './featureChips'
import TargetSelector from './targetSelector';
import ParsingContainer from './parsingContainer'


const styles = makeStyles(theme => ({
    dropboxButton:{
        marginTop: '20px'
    },
    chip: {
        marginTop: '10px'
    }
  }));

export default function Builder(props){

    const classes = styles();
    const [filename, setFilename] = useState("No file selected");
    const [filelink, setFilelink] = useState("");
    const [csvHeaders, setCSVHeaders] = useState([])
    const [features, setFeatures] = useState([])
    const [target, setTarget] = useState("")
    const user = props.user

    function deleteSelectedFile(){
        setFilename("No file selected")
        setFilelink("")
        setCSVHeaders([])
        setFeatures([])
        setTarget("")
    }

    function getHeaders(link){
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://127.0.0.1:8080/datasets')
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({"link": link}))
        xhr.addEventListener('load', () => {
            if (xhr.status === 200){
                var headers = JSON.parse(xhr.response).headers
                setCSVHeaders(headers)
                setFeatures(headers)
            }
        })
    }

    function connectToDropbox(){

        var script = document.createElement('script')
        script.setAttribute('data-app-key', 'z5p9y3pr6ufqsbh')
        script.src = "https://www.dropbox.com/static/api/2/dropins.js"
        script.id = "dropboxjs"
        script.type = "text/javascript"
        document.head.appendChild(script);

        console.log("clicked")
        var options = {

            // Required. Called when a user selects an item in the Chooser.
            success: function(file) {
                var filename = file[0].name
                setFilelink(file[0].link)
                setFilename(filename)
                getHeaders(file[0].link)
            },
            cancel: function() {
        
            },
            linkType: "direct", // or "direct"
            multiselect: false, // or true
            folderselect: false, // or true
            extensions: ['.csv']
        };
        script.onerror = function(){
            console.log("Err")
        }
        script.onload = function(){
            window.Dropbox.choose(options)
        }
        if (window.Dropbox){
            console.log("Trying to open picker")
            window.Dropbox.choose(options)
        }
        
    }

    function targetSelected(target){
        setTarget(target)
        console.log(target)
    }

    function featuresSelected(features){
        setFeatures(features)
        console.log(features)
    }

    function buildPressed(response){
        console.log(response)
    }

    const ShowFeatures = (function(){
        if(csvHeaders.length > 0){
            return(
                <div>
                    <FeatureChips features={features} onSelection={featuresSelected}/>
                    <br></br>
                    <TargetSelector target={target} features={csvHeaders} onSelection={targetSelected}/>
                    <br></br>
                    <ParsingContainer target={target} features={features} onBuild={buildPressed}></ParsingContainer>
                </div>
            )
        }else{
            return (
                null
            )
        }
    })


    return (
        <div>
            <h1>Let's get started</h1>
            <span>First, you'll need to prepare a dataset. <a href="http://www.astrum.ai">Click here</a> to check out how your data needs to be prepared before being uploaded to Dropbox.</span>
            <br></br>
            <div>
                <Button startIcon={<CloudUpload/>} variant='outlined' color='primary' onClick={connectToDropbox} className={classes.dropboxButton}>Connect to dropbox</Button>
                <br></br>
                <Chip className={classes.chip} label={filename} onDelete={deleteSelectedFile} color="primary" />
                <br></br>
                <ShowFeatures />
            </div>
        </div>
    )
}