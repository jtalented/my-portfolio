import useResponsive from '../../hooks/useResponsive';

const StaticGlassOverlay = () => {
  const responsive = useResponsive();
  const { blurSettings } = responsive;

  return (
    <>
      {/* Only the Unified Glass Surface Overlay - matches original exactly */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.8,
            background: 'transparent',
            backdropFilter: `blur(${blurSettings.glassBlur}px) saturate(1.4) brightness(1.03)`,
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.03))',
          }}
        />
      </div>
    </>
  );
};

export default StaticGlassOverlay; 