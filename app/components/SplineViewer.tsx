'use client';

import { useEffect, useRef } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'loading-anim-type'?: string;
        url?: string;
      }, HTMLElement>;
    }
  }
}

const SplineViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.62/build/spline-viewer.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <spline-viewer
        loading-anim-type="spinner-small-dark"
        url="https://prod.spline.design/AZ9F0JfO33-gi30U/scene.splinecode"
      />
    </div>
  );
};

export default SplineViewer; 