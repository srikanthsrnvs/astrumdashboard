import React, {useMemo, useCallback, useReducer, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import Chip from '@material-ui/core/Chip'
import { CircularProgress } from '@material-ui/core';

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
    const [files, setFiles] = useReducer((files, { type, value }) => {
        switch (type) {
          case "add":
            return [...files, value];
          case "remove":
            return files.filter((_, index) => index !== value);
          default:
            return files;
        }
      }, []);

    const onDrop = useCallback((acceptedFiles) => {
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
            firebase.upload_file(file, user).then(function(snapshot){
                snapshot.ref.getDownloadURL().then(function(url){
                    var fileName = file.name
                    const newFile = {
                        name: fileName,
                        metadata: snapshot.metadata,
                        link: url
                    }
                    setFiles({ type: "add", value: newFile})
                    setShowLoader(false)
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
        props.setFilesAction(files)
        var chips = []
        for (var i=0; i<files.length; i++){
            chips.push(<Chip variant='default' onDelete={() => setFiles({type: 'remove', value: i})} style={chipStyle} key={files[i].name} label={files[i].name.split('.').slice(0, -1).join('.')} color='primary'></Chip>)
        }
        return (
            <div>
                {chips}
            </div>
        )
    }

    const ShowLoader = () => {
        return ( showLoader ? (<CircularProgress />) : (null) )
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
            <FileChips />
        </div>
    );
}