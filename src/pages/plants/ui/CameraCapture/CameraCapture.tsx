import React, { useEffect, useRef, useState } from "react";

interface CameraCaptureProps {
  onCapture: (image: string) => void;
  imageQuality?: number; // Optional: image quality between 0 and 1
  imageFormat?: string; // Optional: image format (png, jpeg, webp)
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  imageQuality = 0.9,
  imageFormat = "jpeg",
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Try to use back camera first
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setError(null);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setError("Unable to access camera. Please check permissions.");
    }
  };

  // Capture the photo with correct base64 format
  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Set canvas to video dimensions
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Draw the current video frame to the canvas
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );

        // Convert canvas to base64 image
        const mimeType = `image/${imageFormat}`;
        const capturedImage = canvasRef.current.toDataURL(
          mimeType,
          imageQuality,
        );

        // Validate the base64 image
        if (capturedImage === "data:,") {
          setError("Failed to capture image. Please try again.");
          return;
        }

        setImageSrc(capturedImage);
      }
    }
  };

  // Submit the captured photo
  const submitPhoto = () => {
    if (imageSrc) {
      // Ensure the base64 string is correctly formatted
      if (!imageSrc.startsWith("data:image")) {
        setError("Invalid image format. Please try again.");
        return;
      }

      onCapture(imageSrc);
    }
  };

  // Retake photo
  const retakePhoto = () => {
    setImageSrc(null);
    setError(null);
  };

  // Stop the camera when the component unmounts
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handleCapture = () => {
    capturePhoto();
    stopCamera();
  };

  // Start the camera when the component is mounted
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className='relative w-full h-full bg-black rounded-md overflow-hidden flex flex-col'>
      {/* Video feed or captured image */}
      <div className='flex-grow flex items-center justify-center'>
        {imageSrc ? (
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <h3 className='text-white text-xl mb-4'>Фото:</h3>
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

      {/* Error display */}
      {error && (
        <div className='p-2 bg-red-500 text-white text-center'>{error}</div>
      )}

      {/* Controls */}
      <div className='p-4 bg-black w-full flex justify-center gap-4'>
        {imageSrc ? (
          <>
            <button
              onClick={retakePhoto}
              className='bg-gray-500 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out
              hover:bg-blue-600 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:bg-blue-700 active:scale-95'
            >
              Переснять
            </button>
            <button
              onClick={submitPhoto}
              className='bg-green-500 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out
              hover:bg-blue-600 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:bg-blue-700 active:scale-95'
            >
              Использовать
            </button>
          </>
        ) : (
          <>
            <button
              onClick={stopCamera}
              className='bg-red-500 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out
              hover:bg-blue-600 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:bg-blue-700 active:scale-95'
            >
              Назад
            </button>
            <button
              onClick={handleCapture}
              className='bg-blue-500 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out
              hover:bg-blue-600 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:bg-blue-700 active:scale-95'
            >
              Сфоткать
            </button>
          </>
        )}
      </div>
    </div>
  );
};
