import React, {useCallback} from 'react';
import { useState, useEffect } from 'react';
import {useDropzone} from 'react-dropzone'
import {AiOutlineUpload} from 'react-icons/ai';

function ImageUploadWidget({setFile, srcInit = '', isMobile}) {
    const [src, setSrc] = useState(srcInit)
    let height, width;

    if(isMobile) {
        height = 50;
        width = '100%';
    } else {
        height = 455;
         width = '370px';
    }


    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        height: height,
        width:  width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
                { isMobile ? <UploadMobile src={src}/> : <UploadWeb src={src}/>}
            </div>
        </div>
    )
}

const UploadMobile = ({src}) => {
    return (
        <>
        {
            src ?
            <p style={{color: 'green'}}> Upload Successful! </p>  
            :
            <AiOutlineUpload size='huge'/>
        }
        </>
    )

}

const UploadWeb = ({src}) => { 
    console.log('mobile, web : ', src)
    return (
        <>
        {
            src ?
            <div>
                <img style={{ objectFit: 'contain', width: '380px', height: '470px'}} src={src} alt='Image'/>
            </div>
            :
            <AiOutlineUpload size='huge'/>
        }
        </>
    )
}


export default ImageUploadWidget;