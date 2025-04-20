// src/hooks/useSceneZoom.ts
let setZoomState: (v: boolean) => void = () => {};

export const useSceneZoom = () => {
  const zoomToProjects = () => {
    setZoomState(true);
    setTimeout(() => {
      const projects = document.getElementById('projects');
      projects?.scrollIntoView({ behavior: 'smooth' });
    }, 1400);
  };

  return { zoomToProjects };
};

export const registerZoomSetter = (fn: typeof setZoomState) => {
  setZoomState = fn;
};
