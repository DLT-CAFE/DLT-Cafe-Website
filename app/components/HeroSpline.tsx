'use client';

import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

export default function HeroSpline() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new Application(canvasRef.current);
    app.load('https://prod.spline.design/AZ9F0JfO33-gi30U/scene.splinecode')
      .then(() => {
        console.log('Scene loaded successfully');
      })
      .catch((error) => {
        console.error('Error loading scene:', error);
      });

    return () => {
      app.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} />
    </div>
  );
} 