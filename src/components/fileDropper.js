import React, {useMemo, useCallback, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import Chip from '@material-ui/core/Chip'
import { Button } from '@material-ui/core';

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
    const [files, setFiles] = useState({})

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
            firebase.upload_file(file, user).then(function(snapshot){
                var files_object = {}
                Object.assign(files_object, files)
                snapshot.ref.getDownloadURL().then(function(url){
                    files_object[file.name] = {'metadata': snapshot.metadata, 'link': url}
                    setFiles(files_object)
                })
            })
        })
    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({accept: '.zip', onDrop});

    const FileChips = () => {
        var chips = []
        for (const file in files){
            props.setFilesAction(files)
            chips.push(<Chip variant='outlined' style={chipStyle} key={file} label={file.split('.').slice(0, -1).join('.')} color='primary'></Chip>)
        }
        return (
            <div>
                {chips}
            </div>
        )
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
            </div>
            <FileChips />
        </div>
    );
}