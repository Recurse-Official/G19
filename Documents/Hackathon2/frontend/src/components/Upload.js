import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [images, setImages] = useState([]); // Selected files
  const [message, setMessage] = useState(''); // Status message
  const [isUploading, setIsUploading] = useState(false); // Loading state

  // Handle file input change
  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  // Upload images to the backend
  const uploadImages = async () => {
    if (images.length === 0) {
      setMessage('Please select images to upload.');
      return;
    }

    const formData = new FormData();
    Array.from(images).forEach((image) => formData.append('images', image));

    try {
      setIsUploading(true);
      setMessage('Uploading images...');
      const response = await axios.post('https://www.googleapis.com/auth/drive', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Images uploaded successfully!');
      console.log(response.data);
      setImages([]); // Clear selected files
    } catch (error) {
      console.error('Error uploading images:', error);
      setMessage('Failed to upload images.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <button onClick={uploadImages} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Upload;
