import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';

interface CameraControllerProps {
  zoomIn: boolean;
  rotationDone: boolean;
}

const CameraController = ({ zoomIn, rotationDone }: CameraControllerProps) => {
  const { camera } = useThree();
  const progress = useRef(0);
  const curve = useRef<THREE.CatmullRomCurve3 | null>(null);
  const cachedZoomInEnd = useRef<THREE.Vector3 | null>(null);
  const [finalLookTarget] = useState(new THREE.Vector3(0, 0.3, -0.45));
  const [defaultLookTarget] = useState(new THREE.Vector3(0, 0.2, 0));

  useEffect(() => {
    if (!rotationDone) return;

    progress.current = 0;
    curve.current = null;

    //console.log('[CameraController] zoomIn changed to:', zoomIn);
  }, [zoomIn, rotationDone]);

  useFrame((_, delta) => {
    if (!rotationDone) return;

    progress.current += delta * 0.5;
    const t = Math.min(progress.current, 1);

    if (!curve.current) {
      let start: THREE.Vector3;
      const end = zoomIn
        ? new THREE.Vector3(0, -0.4, 3)
        : new THREE.Vector3(0, 1.2, 2);
      const control = zoomIn
        ? new THREE.Vector3(4, 2, 6)
        : new THREE.Vector3(-4, 2.5, 6);

      if (zoomIn) {


        // Going in use camera position
        start = camera.position.clone();
      } else {
        // Going out use cached end of zoom-in
        start = cachedZoomInEnd.current
          ? cachedZoomInEnd.current.clone()
          : camera.position.clone(); // fallback
      }

      curve.current = new THREE.CatmullRomCurve3([start, control, end]);
      //console.log('[CameraController] Created new', zoomIn ? 'zoom-in' : 'zoom-out', 'curve');
    }

    const point = curve.current.getPoint(t);
    camera.position.copy(point);

    const lookTarget = new THREE.Vector3().lerpVectors(
      defaultLookTarget,
      finalLookTarget,
      zoomIn ? t : 1 - t
    );

    camera.lookAt(lookTarget);



    // Cache zoom-in end position for use in zoom-out
    if (zoomIn && t === 1) {
      cachedZoomInEnd.current = camera.position.clone();
      //console.log('[CameraController] Cached zoom-in end position');
    }

    if (t === 1) {
      //console.log('[CameraController] Finished', zoomIn ? 'zoom-in' : 'zoom-out');
    }
  });

  return null;
};

export default CameraController;
