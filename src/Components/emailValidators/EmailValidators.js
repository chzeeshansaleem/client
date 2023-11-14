import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './EmailValidators.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const EmailValidator = () => {
  const [files, setFiles] = useState([]);
  const [showDownloadButton, setShowDownloadButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const notify = () => toast.success('file downloading start', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
    const notifyForRemove = () => {
      console.log("toastify call")
      toast.success('file removed Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    };
    const notifyForSubmit=()=>{
      toast.success('file submit successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const allowedFileTypes = ["csv", "xsls"];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!allowedFileTypes.includes(fileExtension)) {
        console.log(fileExtension);
        return alert("Please choose a correct file type");
      }

      setFiles([file]);
      setShowDownloadButton(true);
    }
  };

  const removeFile = () => {
    setFiles([]);
    setShowDownloadButton(true);
  
  };
  // inherited function
const fileRemove=()=>{
  removeFile();
  notifyForRemove();
}
  const handleSubmit = () => {
    if (files.length === 0) {
      console.log('No files to submit.');
      return;
    }

    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });
    notifyForSubmit();
    setLoading(true);

    axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('File submission successful:', response.data);
    
        removeFile();
      })
      .catch((error) => {
        console.error('Error submitting files:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDownloadData = () => {
       notify();
    setLoading(true);

    try {
      axios.get('https://dummyjson.com/products', {
        responseType: 'blob',
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'downloadedFile.csv');
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.error('Error downloading file:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error('An error occurred:', error);
      setLoading(false);
    }
  };
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="file-uploader-container">
      <div>
        <h1>Welcome to Email Validator platform.</h1>
      </div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Click or drag a file to upload</p>
      </div>
      {files.length > 0 && (
        <div className="file-list">
          <p>Uploaded File:</p>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
                <button onClick={fileRemove} className='remove-button'> Remove</button>
               
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
          <ToastContainer />
        </div>
      )}
      {showDownloadButton && (files.length === 0 || files === null) && (
        <div className="download-button-container">
          <button onClick={handleDownloadData} disabled={loading}>
            {loading ? 'Processing...' : 'Download'}
          </button>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default EmailValidator;
