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
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);

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

        // Filtra estritamente todas as posições dos ossos para eliminar deslocamentos no ar
        clip.tracks = clip.tracks.filter((track) => !track.name.endsWith('.position'));

        const action = mixer.clipAction(clip, scene);

        if (['Wave', 'Point', 'AngryPoint'].includes(name)) {
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
        }

        actionsRef.current[name] = action;
      }
    });

    const initialAction = actionsRef.current[pose] || actionsRef.current['Idle'];
    if (initialAction) {
      initialAction.play();
      activeActionRef.current = initialAction;
    }

    // Ao término de uma animação de disparo único (como acenar ou apontar), transiciona suavemente de volta para Idle
    const handleFinished = (e: any) => {
      const idleAction = actionsRef.current['Idle'];
      if (e.action !== idleAction && idleAction) {
        idleAction.reset().play();
        e.action.crossFadeTo(idleAction, 0.5, false);
        activeActionRef.current = idleAction;
      }
    };

    mixer.addEventListener('finished', handleFinished);

    return () => {
      mixer.removeEventListener('finished', handleFinished);
      mixer.stopAllAction();
    };
  }, [scene, mixer, idleFBX, walkingFBX, talkingFBX, pointingFBX, wavingFBX, angryPointFBX]);

  // Transição contínua e sem sobressaltos ("recarregamento") entre poses ao mudar de etapa
  useEffect(() => {
    const nextAction = actionsRef.current[pose] || actionsRef.current['Idle'];
    const currentAction = activeActionRef.current;

    if (nextAction && nextAction !== currentAction) {
      nextAction.reset().play();
      
      if (currentAction) {
        currentAction.crossFadeTo(nextAction, 0.4, false);
      }
      
      activeActionRef.current = nextAction;
    }
  }, [pose]);

  useFrame((state, delta) => {
    mixer.update(delta);

    if (group.current) {
      // Movimento suave acompanhando o cursor no eixo Z
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
      scale={[1.8, 1.8, 1.8]}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/avatar.glb');