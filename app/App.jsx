'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import './App.css';
import ScreenshotTrigger from './ScreenshotTrigger'; // Adjust the import path as needed

const App = () => {
  const [triggerScreenshot, setTriggerScreenshot] = useState(false);
  const color = 'red';

  return (
    <>
      <Canvas
        style={{ width: '100vw', height: '75vh' }}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
        }}
        camera={{ position: [5, 5, 5] }}
      >
        <ScreenshotTrigger trigger={triggerScreenshot} setTrigger={setTriggerScreenshot} />
        <directionalLight position={[10, 20, -20]} intensity={2} />
        <ambientLight intensity={1} />
        <color attach="background" args={[color ? color : 'blue']} />
        <Box scale={4}>
          <meshStandardMaterial color="blue" />
        </Box>
        <OrbitControls />
      </Canvas>
      <button onClick={() => setTriggerScreenshot(true)}>Download Image</button>
    </>
  );
};

export default App;
