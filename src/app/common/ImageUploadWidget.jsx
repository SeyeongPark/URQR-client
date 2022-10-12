import React, {useCallback} from 'react';
import { useState } from 'react';
import {useDropzone} from 'react-dropzone'
import {AiOutlineUpload} from 'react-icons/ai';


function ImageUploadWidget({setFile}) {
    const [src, setSrc] = useState('')

    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        height: 300,
        width: 300
    }

    const dzActive = {
        borderColor: 'green'
    }
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        acceptedFiles.forEach(file=>{
            const reader = new FileReader()

            reader.onload = ()=>{
                setSrc(reader.result)
            }
            reader.readAsDataURL(file);
            setFile(file);
        })
      }, [setFile, setSrc])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return (
        <div>
            <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
                <input {...getInputProps()} />
                {
                    src ?
                    <img style={{height:'300px'}} src={src} alt='Uploaded image'/>
                    :
                    <AiOutlineUpload size='huge'/>
                }
            </div>
        </div>
    )
}

export default ImageUploadWidget;