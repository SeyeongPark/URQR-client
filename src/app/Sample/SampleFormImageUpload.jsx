/* eslint-disable max-len */
import React from 'react';
import {useState} from 'react';
import ImageUploadWidget from '../common/ImageUploadWidget';

const SampleFormImageUpload = () => {
  const [image, setImage]=useState();
  const [inputfield, setInputfield] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Image', image);
    formData.append('field', inputfield);
    formData.append(inputfield);
    let response;
    fetch('http://localhost:3001/upload-image-test', {
      method: 'POST',
      body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          response = data;
        });

    console.log('response', response);
  };
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <form onSubmit={handleSubmit}>
        <ImageUploadWidget setFile={setImage} />
        <input onChange={(e)=>setInputfield(e.target.value)}/>
        <button>
                    upload
        </button>
      </form>
    </div>
  );
};

export default SampleFormImageUpload;
