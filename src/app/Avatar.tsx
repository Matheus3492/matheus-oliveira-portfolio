'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from 'three';

interface AvatarProps {
  pose: string;
}

export function Avatar({ pose }: AvatarProps) {
  const group = useRef<THREE.Group>(null);

  const { scene } = useGLTF('/models/avatar.glb');

  // Carregamento das animações FBX
  const idleFBX = useLoader(FBXLoader, '/models/Animations/Idle.fbx');
  const walkingFBX = useLoader(FBXLoader, '/models/Animations/Walking.fbx');
  const talkingFBX = useLoader(FBXLoader, '/models/Animations/Talking.fbx');
  const pointingFBX = useLoader(FBXLoader, '/models/Animations/Pointing.fbx');
  const wavingFBX = useLoader(FBXLoader, '/models/Animations/Waving Gesture.fbx');
  const angryPointFBX = useLoader(FBXLoader, '/models/Animations/Angry Point.fbx');

  const [mixer] = useState(() => new THREE.AnimationMixer(scene));
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});

  useEffect(() => {
    const fbxMap: Record<string, THREE.Group> = {
      Wave: wavingFBX,
      Idle: idleFBX,
      Thinking: walkingFBX,
      Walk: walkingFBX,
      Point: pointingFBX,
      Talk: talkingFBX,
      AngryPoint: angryPointFBX,
    };

    Object.entries(fbxMap).forEach(([name, fbx]) => {
      if (fbx.animations.length > 0) {
        const clip = fbx.animations[0].clone();

        // Remove posições do osso raiz para não mover o avatar do sítio
        clip.tracks = clip.tracks.filter((track) => !track.name.endsWith('.position'));

        const action = mixer.clipAction(clip, scene);

        // Se for uma animação de gesto (Wave, Point, AngryPoint), toca apenas 1 vez
        if (['Wave', 'Point', 'AngryPoint'].includes(name)) {
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true; // Mantém a postura final
        }

        actionsRef.current[name] = action;
      }
    });

    const initialAction = actionsRef.current[pose] || actionsRef.current['Idle'];
    if (initialAction) {
      initialAction.play();
    }

    // Listener para voltar a "Idle" suavemente assim que o gesto de 1 única execução terminar
    const handleFinished = (e: any) => {
      if (e.action !== actionsRef.current['Idle']) {
        const idleAction = actionsRef.current['Idle'];
        if (idleAction) {
          e.action.fadeOut(0.5);
          idleAction.reset().fadeIn(0.5).play();
        }
      }
    };

    mixer.addEventListener('finished', handleFinished);

    return () => {
      mixer.removeEventListener('finished', handleFinished);
      mixer.stopAllAction();
    };
  }, [scene, mixer, idleFBX, walkingFBX, talkingFBX, pointingFBX, wavingFBX, angryPointFBX]);

  useEffect(() => {
    const nextAction = actionsRef.current[pose] || actionsRef.current['Idle'];

    if (nextAction) {
      Object.values(actionsRef.current).forEach((action) => {
        if (action !== nextAction) {
          action.fadeOut(0.3);
        }
      });
      nextAction.reset().fadeIn(0.3).play();
    }
  }, [pose]);

  useFrame((state, delta) => {
    mixer.update(delta);

    if (group.current) {
      // Rotação sutil com base na posição X do rato
      const mouseX = state.pointer.x;
      const targetRotationZ = mouseX * 0.4;

      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        targetRotationZ,
        0.08
      );
    }
  });

  return (
    <group 
      ref={group} 
      position={[0, 0.2, 0]} 
      rotation={[-Math.PI / 2, 0, 0]} 
      scale={[1.6, 1.6, 1.6]}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/avatar.glb');