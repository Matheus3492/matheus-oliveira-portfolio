'use client';

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Avatar3DCanvas = dynamic(() => import('./Avatar3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-xs text-cyan-400 font-mono animate-pulse">
      Loading 3D Avatar...
    </div>
  ),
});

const USAR_VIDEO = true;

const STEP_TIMES: Record<number, number> = {
  0: 0,   // Passo 01
  1: 5,   // Passo 02
  2: 10,  // Passo 03
  3: 15,  // Passo 04
};

interface AvatarViewerProps {
  activeStep: number;
  pose: string;
}

export default function AvatarViewer({ activeStep, pose }: AvatarViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (USAR_VIDEO && videoRef.current && STEP_TIMES[activeStep] !== undefined) {
      videoRef.current.currentTime = STEP_TIMES[activeStep];
      videoRef.current.play().catch(() => {});
    }
  }, [activeStep]);

  if (!USAR_VIDEO) {
    return <Avatar3DCanvas pose={pose} />;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        src="/videos/avatar-principal.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Camada escura / degradê para destacar o texto da interface */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
    </div>
  );
}