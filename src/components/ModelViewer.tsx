import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ModelViewerProps {
  url: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableControls?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  backgroundColor?: string;
  onModelLoaded?: () => void;
}

const Model: React.FC<{ url: string; onLoaded?: () => void }> = ({ url, onLoaded }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  React.useEffect(() => {
    if (scene && onLoaded) {
      onLoaded();
    }
  }, [scene, onLoaded]);

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={1} />
    </group>
  );
};

const Loader: React.FC = () => (
  <Html center>
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="text-white">Loading 3D Model...</p>
    </div>
  </Html>
);

const ModelViewer: React.FC<ModelViewerProps> = ({
  url,
  width = 400,
  height = 400,
  className = '',
  autoRotate = true,
  autoRotateSpeed = 0.5,
  enableControls = true,
  enableZoom = true,
  enablePan = true,
  backgroundColor = '#1a1a1a',
  onModelLoaded
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleModelLoaded = () => {
    setIsLoaded(true);
    onModelLoaded?.();
  };

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: backgroundColor }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        
        <Suspense fallback={<Loader />}>
          <Model url={url} onLoaded={handleModelLoaded} />
        </Suspense>

        {enableControls && (
          <OrbitControls
            enableZoom={enableZoom}
            enablePan={enablePan}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            enableDamping
            dampingFactor={0.05}
          />
        )}

        <Environment preset="city" />
      </Canvas>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-xl">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-white">Loading 3D Model...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelViewer;