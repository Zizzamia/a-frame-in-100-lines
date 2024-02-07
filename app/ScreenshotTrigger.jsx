import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const ScreenshotTrigger = ({ trigger, setTrigger }) => {
  const { gl } = useThree();

  useEffect(() => {
    if (!trigger) return;

    gl.domElement.toBlob((blob) => {
      console.log(blob);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'canvas-screenshot.png';
      link.href = url;
      link.click();

      // Reset the trigger
      setTrigger(false);
    }, 'image/png');
  }, [trigger, gl, setTrigger]);

  return null;
};

export default ScreenshotTrigger;
