import React, {useCallback} from 'react';
import { useState } from 'react';
import {useDropzone} from 'react-dropzone'
import {AiOutlineUpload} from 'react-icons/ai';


function ImageUploadWidget({setFile, srcInit = ''}) {
    const [src, setSrc] = useState(srcInit)

    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        height: 150,
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
                    <img style={{height:'150px'}} src={src} alt='Image'/>
                    :
                    <AiOutlineUpload size='huge'/>
                }
            </div>
        </div>
    )
}

export default ImageUploadWidget;