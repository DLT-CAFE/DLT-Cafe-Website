'use client';

import dynamic from 'next/dynamic';

const SplineViewer = dynamic(() => import('./SplineViewer'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function HeroSpline() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <SplineViewer />
    </div>
  );
} 