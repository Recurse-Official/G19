import React, { useState } from 'react';

const Scan = () => {
  const [images, setImages] = useState([]); // Stores matched images
  const [message, setMessage] = useState(''); // Status message
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const scanAndDownload = async () => {
    setIsLoading(true);
    setMessage('Scanning face...');
    try {
      const response = await fetch('http://localhost:5000/api/face/scan');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      if (data.images && data.images.length > 0) {
        setImages(data.images); // Update the image list
        setMessage('Face matched! You can download your images.');
      } else {
        setMessage('No images matched your face.');
        setImages([]); // Clear image list if no match
      }
    } catch (error) {
      console.error('Error during face scan:', error);
      setMessage('Error during face scan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Scan and Download Images</h2>
      <button onClick={scanAndDownload} disabled={isLoading}>
        {isLoading ? 'Scanning...' : 'Scan Face'}
      </button>
      <p>{message}</p>
      <div>
        {images.map((image, index) => (
          <div key={index} style={{ margin: '10px 0' }}>
            <p>{image.name}</p>
            <a href={image.downloadUrl} download={image.name}>
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scan;
