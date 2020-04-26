import React, { useMemo, useCallback, useReducer, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Chip from '@material-ui/core/Chip'
import { CircularProgress, Button, Snackbar, SnackbarContent } from '@material-ui/core';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    marginTop: 20
};

const activeStyle = {
    borderColor: '#2196f3'
};

const chipStyle = {
    marginTop: '10px',
    marginRight: '5px'
}

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function FileDropper(props) {

    const firebase = props.firebase;
    const user = props.user;
    const [showLoader, setShowLoader] = useState(false)
    const allowedTypes = props.allowedTypes
    const maxSize = 20 * 1048576
    const [isFileTooLarge, setFileTooLarge] = useState(false)
    const [file, setFile] = useState({
        name: "",
        metadata: "",
        link: ""
    })

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach((file) => {

            setShowLoader(true)
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
            firebase.upload_file(file, user).then(function (snapshot) {
                snapshot.ref.getDownloadURL().then(function (url) {
                    var fileName = file.name
                    setFile({ ...file, name: fileName, metadata: snapshot.metadata, link: url })
                    props.setFile({name: fileName, metadata: snapshot.metadata, link: url})
                    setShowLoader(false)
                })
            })
        })
        rejectedFiles.forEach((file) => {
            if (file.size > maxSize) {
                setFileTooLarge(true)
            }
        })
    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ accept: '.zip', onDrop, maxSize: maxSize });

    function deleteFile() {
        console.log("Attempting to delete the file")
        setFile({ ...file, 'name': "", 'metadata': "", 'link': "" })
        props.setFile(file)
    }

    const FileChips = () => {
        if (file.name !== "") {
            return (
                <Chip
                    style={chipStyle}
                    key={file.name}
                    label={file.name.split('.').slice(0, -1).join('.')}
                    color='primary'>
                </Chip>
            )
        }
        else {
            return (null)
        }
    }

    const ShowDropbox = () => {
        if (isFileTooLarge) {
            return (
                <div style={{ marginTop: 40 }}>
                    <h4>Your file seems to be larger than 100mb, upload it from Dropbox instead</h4>
                    <Button color='primary' variant='contained' onClick={connectToDropbox}>
                        Connect to dropbox
                </Button>
                </div>
            )
        }
        else {
            return null
        }
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
                var link = file[0].link
                var metadata = {}
                setFile({ ...file, name: filename, link: link, metadata: metadata })
            },
            cancel: function () {

            },
            linkType: "direct", // or "direct"
            multiselect: false, // or true
            folderselect: false, // or true
            extensions: ['.zip']
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

    const ShowLoader = () => {
        return (showLoader ? (<CircularProgress />) : (null))
    }

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject
    ]);

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drop your .zip file here or click to select a file to upload</p>
                <ShowLoader />
            </div>
            <ShowDropbox />
            <div>
                <FileChips />
            </div>
            <Snackbar open={isFileTooLarge} autoHideDuration={6000} anchorOrigin={{ 'horizontal': "right", 'vertical': "bottom" }}>
                <SnackbarContent
                    message={"Your file is too large. Please use Dropbox instead"}
                />
            </Snackbar>
        </div>
    );
}