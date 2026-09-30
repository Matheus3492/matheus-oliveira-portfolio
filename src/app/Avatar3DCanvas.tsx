'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Avatar } from './Avatar';

interface CanvasProps {
  pose: string;
}

export default function Avatar3DCanvas({ pose }: CanvasProps) {
  return (
    <div className="w-full h-full min-h-[450px] relative">
      <Canvas
        gl={{ alpha: true }}
        // Aproximamos o Z de 3.2 para 2.2 para dar zoom e elevamos levemente o Y para enquadrar o busto/rosto
        camera={{ position: [0, 0.2, 2.2], fov: 45 }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[2, 4, 3]} intensity={2.5} />

        <Suspense fallback={null}>
          <Avatar pose={pose} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          target={[0, 0.1, 0]} // Ajustado o ponto de rotação levemente para cima
        />
      </Canvas>
    </div>
  );
}