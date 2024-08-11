"use client"
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const WebcamCapture = () => {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        } else {
          console.log('Video element not found');
        }
      } catch (e) {
        console.error('Error accessing webcam: ', e);
      }
    };

    startVideo();

    const interval = setInterval(() => {
      captureAndSendImage();
    }, 10000); // Changed to 10 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      // Adjust canvas size to match video dimensions
      canvasRef.current.width = 48;
      canvasRef.current.height = 48;

      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const image = canvasRef.current.toDataURL('image/png');
        console.log(image)
        setImageSrc(image);
        return image;
      }
    }
    return null;
  };


  const sendImage = async (image : string) => {
    try {
      const response = await axios.post('/api/predict/123', { image });
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending image:', error);
    }
  };
  

  const captureAndSendImage = () => {
    const image = captureImage();
    if (image) {
      sendImage(image);
    }
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" style={{ display: 'block' }} />
      <button onClick={captureAndSendImage}>Capture Now</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {imageSrc && (
        <div>
          <h2>Captured Image</h2>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
