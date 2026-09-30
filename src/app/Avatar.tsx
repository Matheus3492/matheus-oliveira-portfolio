'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from 'three';

interface AvatarProps {
  pose: string;
}

export function Avatar({ pose }: AvatarProps) {
  const group = useRef<THREE.Group>(null);

  // Carrega apenas o avatar de início para exibição imediata
  const { scene } = useGLTF('/models/avatar.glb');

  const [mixer] = useState(() => new THREE.AnimationMixer(scene));
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loader = new FBXLoader();

    const animFiles: Record<string, string> = {
      Idle: '/models/Animations/Idle.fbx',
      Wave: '/models/Animations/Waving Gesture.fbx',
      Thinking: '/models/Animations/Walking.fbx',
      Walk: '/models/Animations/Walking.fbx',
      Point: '/models/Animations/Pointing.fbx',
      Talk: '/models/Animations/Talking.fbx',
      AngryPoint: '/models/Animations/Angry Point.fbx',
    };

    // Carrega animações de forma assíncrona em segundo plano para não travar a página
    Object.entries(animFiles).forEach(([name, path]) => {
      loader.load(
        path,
        (fbx) => {
          if (!isMounted) return;

          if (fbx.animations && fbx.animations.length > 0) {
            const clip = fbx.animations[0].clone();
            // Filtra deslocamento nos eixos
            clip.tracks = clip.tracks.filter((track) => !track.name.endsWith('.position'));

            const action = mixer.clipAction(clip, scene);

            if (['Wave', 'Point', 'AngryPoint'].includes(name)) {
              action.setLoop(THREE.LoopOnce, 1);
              action.clampWhenFinished = true;
            }

            actionsRef.current[name] = action;

            // Inicia a animação se for a pose solicitada ou Idle inicial
            if (name === pose || (name === 'Idle' && !activeActionRef.current)) {
              if (activeActionRef.current) {
                activeActionRef.current.crossFadeTo(action, 0.4, false);
              }
              action.reset().play();
              activeActionRef.current = action;
            }
          }
        },
        undefined,
        (err) => console.error(`Erro ao carregar animação ${name}:`, err)
      );
    });

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
      isMounted = false;
      mixer.removeEventListener('finished', handleFinished);
      mixer.stopAllAction();
    };
  }, [scene, mixer]);

  // Transição de poses quando a propriedade muda
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
      // Rotação suave no eixo Y acompanhando o mouse
      const mouseX = state.pointer.x;
      const targetRotationY = mouseX * 0.4;

      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotationY,
        0.08
      );
    }
  });

  return (
    <group 
      ref={group} 
      position={[0, -2.5, 0]} 
      rotation={[Math.PI / 2, 0, 0]} 
      scale={[2.6, 2.6, 2.6]}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/avatar.glb');