import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { documentAPI } from '../services/api';

const FileUploadZone = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setUploadError('Only PDF files are allowed');
      return;
    }

    const file = acceptedFiles[0];
    setUploading(true);
    setUploadError('');

    try {
      const response = await documentAPI.uploadDocument(file);
      onUploadSuccess(response.data.document);
      setUploadError('');
    } catch (err) {
      setUploadError(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
  });

  return (
    <div className="card">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-8 rounded text-center cursor-pointer transition ${
          isDragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-lg font-semibold mb-2">
          {isDragActive ? 'Drop your PDF here' : 'Drag PDF files here or click to select'}
        </p>
        <p className="text-sm text-gray-600">Only PDF files are supported</p>
      </div>

      {uploadError && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {uploadError}
        </div>
      )}

      {uploading && (
        <div className="mt-4 text-center">
          <p className="text-blue-600 font-semibold">Uploading...</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
