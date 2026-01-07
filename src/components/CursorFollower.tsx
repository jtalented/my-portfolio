import { useEffect, useRef, useState } from 'react';

const ACCENT_GRADIENT = 'linear-gradient(90deg, #fb923c 0%, #ef4444 50%, #ec4899 100%)';
const TRAIL_LENGTH = 18;
const TRAIL_FADE = 0.06;

const isTouchDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );
};

const PARTICLE_COLORS = [
  '#fb923c', // orange
  '#ef4444', // red
  '#ec4899', // pink
  '#a78bfa', // purple
];

const ParticleBurst = ({ x, y, onDone }: { x: number; y: number; onDone: () => void }) => {
  const [particles] = useState(() =>
    Array.from({ length: 16 }, (_, i) => ({
      angle: (Math.PI * 2 * i) / 16,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      distance: 0,
    }))
  );
  useEffect(() => {
    let frame = 0;
    let raf: number;
    const animate = () => {
      frame++;
      if (frame > 32) {
        onDone();
        return;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            left: x - 6 + Math.cos(p.angle) * 2,
            top: y - 6 + Math.sin(p.angle) * 2,
            width: 12,
            height: 12,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9999,
            background: p.color,
            opacity: 0.7,
            transform: `translate(${Math.cos(p.angle) * 32}px, ${Math.sin(p.angle) * 32}px) scale(0.7)`,
            animation: 'particle-burst 0.6s cubic-bezier(.4,0,.2,1) forwards',
            filter: 'blur(1.5px)',
          }}
        />
      ))}
      <style>{`
        @keyframes particle-burst {
          0% { opacity: 0.7; transform: translate(0,0) scale(1); }
          80% { opacity: 0.5; }
          100% { opacity: 0; transform: translate(var(--tx,0), var(--ty,0)) scale(0.2); }
        }
      `}</style>
    </>
  );
};

const CursorFollower = () => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [trail, setTrail] = useState(Array.from({ length: TRAIL_LENGTH }, () => pos));
  const rafRef = useRef<number | null>(null);
  const [bursts, setBursts] = useState<{ x: number; y: number; id: number }[]>([]);
  const burstId = useRef(0);

  useEffect(() => {
    if (isTouchDevice()) {
      setVisible(false);
      const handleTouch = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          setBursts((prev) => [
            ...prev,
            { x: touch.clientX, y: touch.clientY, id: burstId.current++ },
          ]);
        }
      };
      const handleClick = (e: MouseEvent) => {
        setBursts((prev) => [
          ...prev,
          { x: e.clientX, y: e.clientY, id: burstId.current++ },
        ]);
      };
      window.addEventListener('touchstart', handleTouch, { passive: true });
      window.addEventListener('click', handleClick, { passive: true });
      return () => {
        window.removeEventListener('touchstart', handleTouch);
        window.removeEventListener('click', handleClick);
      };
    }
    setVisible(true);
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const handleMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);
    let last = { ...mouse };
    const animate = () => {
      last.x += (mouse.x - last.x) * 0.22;
      last.y += (mouse.y - last.y) * 0.22;
      setPos({ x: last.x, y: last.y });
      setTrail((prev) => [ { x: last.x, y: last.y }, ...prev.slice(0, TRAIL_LENGTH - 1) ]);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible && bursts.length === 0) return null;

  return (
    <>
      {/* Particle bursts for mobile/touch */}
      {bursts.map((b) => (
        <ParticleBurst key={b.id} x={b.x} y={b.y} onDone={() => setBursts((prev) => prev.filter((p) => p.id !== b.id))} />
      ))}
      {/* Particle trail and follower for desktop */}
      {visible && (
        <>
          {trail.map((p, i) => (
            <div
              key={i}
              style={{
                position: 'fixed',
                left: p.x - 5,
                top: p.y - 5,
                width: 10,
                height: 10,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 50,
                opacity: 1 - i * TRAIL_FADE,
                background: ACCENT_GRADIENT,
                filter: 'blur(2.5px)',
                transition: 'opacity 0.2s',
                boxShadow: '0 0 12px 2px #ec489980',
              }}
            />
          ))}
          <div
            style={{
              position: 'fixed',
              left: pos.x - 12,
              top: pos.y - 12,
              width: 24,
              height: 24,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 51,
              background: ACCENT_GRADIENT,
              boxShadow: '0 0 32px 8px #ec489980',
              border: '2px solid rgba(255,255,255,0.12)',
              filter: 'blur(0.5px)',
              transition: 'opacity 0.2s',
            }}
          />
        </>
      )}
    </>
  );
};

export default CursorFollower; 