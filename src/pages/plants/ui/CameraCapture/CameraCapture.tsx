import React, { useEffect, useRef, useState } from "react";

interface CameraCaptureProps {
  onCapture: (image: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const [hasCamera, setHasCamera] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setHasCamera(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Capture the photo
  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
        const capturedImage = canvasRef.current.toDataURL("image/png");
        setImageSrc(capturedImage);
      }
    }
  };

  // Submit the captured photo
  const submitPhoto = () => {
    if (imageSrc) {
      onCapture(imageSrc);
    }
  };

  // Retake photo
  const retakePhoto = () => {
    setImageSrc(null);
  };

  // Stop the camera when the component unmounts
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setHasCamera(false);
    }
  };

  // Start the camera when the component is mounted
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  if (!hasCamera) {
    <h1>You have no camera</h1>;
  }
  return (
    <div className='relative w-full h-full bg-black rounded-md overflow-hidden flex flex-col'>
      {/* Video feed or captured image */}
      <div className='flex-grow flex items-center justify-center'>
        {imageSrc ? (
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <h3 className='text-white text-xl mb-4'>Captured Photo:</h3>
            <div className='relative max-w-md max-h-[60vh] overflow-hidden'>
              <img
                src={imageSrc}
                alt='Captured'
                className='max-w-full max-h-[60vh] object-contain'
              />
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className='max-w-full max-h-full object-contain'
          ></video>
        )}
      </div>

      {/* Hidden canvas for capturing the photo */}
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      ></canvas>

      {/* Controls */}
      <div className='p-4 bg-black w-full flex justify-center gap-4'>
        {imageSrc ? (
          <>
            <button
              onClick={retakePhoto}
              className='bg-gray-500 text-white py-2 px-4 rounded-md'
            >
              Retake
            </button>
            <button
              onClick={submitPhoto}
              className='bg-green-500 text-white py-2 px-4 rounded-md'
            >
              Use Photo
            </button>
          </>
        ) : (
          <>
            <button
              onClick={stopCamera}
              className='bg-red-500 text-white py-2 px-4 rounded-md'
            >
              Stop Camera
            </button>
            <button
              onClick={capturePhoto}
              className='bg-blue-500 text-white py-2 px-4 rounded-md'
            >
              Capture Photo
            </button>
          </>
        )}
      </div>
    </div>
  );
};
