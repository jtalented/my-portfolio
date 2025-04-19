import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface AppState {
  id: string;
  name: string;
  icon: string;
  color?: string;
  iframe: string;
  layout?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    width?: string;
    height?: string;
  };
}

const apps: AppState[] = [
  {
    id: 'dino',
    name: 'Dino Game',
    icon: '',
    color: 'bg-purple-400/20',
    iframe: 'https://dino-chrome.com/',
    layout: {
      top: '0px',
      left: '137px',
      right: '138px',
      bottom: '0px',
    },
  },
  {
    id: 'march',
    name: 'March Madness',
    icon: '/icons/march.svg',
    color: 'bg-blue-500/20',
    iframe: 'https://example.com/march-madness',
    layout: {
      top: '00px',
      left: '137px',
      right: '138px',
      bottom: '0px',
    },
  },
];

const HomeScreen = () => {
  const [activeApp, setActiveApp] = useState<AppState | null>(null);
  const [anchorPos, setAnchorPos] = useState<DOMRect | null>(null);

  // Locate the anchor element position
  useEffect(() => {
    const anchor = document.getElementById('macbook-app-anchor');
    if (anchor && activeApp) {
      const rect = anchor.getBoundingClientRect();
      setAnchorPos(rect);
    }
  }, [activeApp]);

  if (activeApp?.iframe && anchorPos) {
    const layout = activeApp.layout ?? {};

    const style: React.CSSProperties = {
      position: 'absolute',
      top: `${anchorPos.top + parseInt(layout.top ?? '0')}px`,
      left: `${anchorPos.left + parseInt(layout.left ?? '0')}px`,
      width:
        layout.left !== undefined && layout.right !== undefined
          ? `${anchorPos.width - parseInt(layout.left) - parseInt(layout.right)}px`
          : layout.width ?? '900px',
      height:
        layout.top !== undefined && layout.bottom !== undefined
          ? `calc(100vh - ${layout.top} - ${layout.bottom})`
          : layout.height ?? '560px',
      zIndex: 999,
    };

    return ReactDOM.createPortal(
      <div
        className="rounded-md overflow-hidden shadow-2xl border border-white/10 bg-white"
        style={style}
      >
        <iframe
          src={activeApp.iframe}
          title={activeApp.name}
          className="w-full h-full rounded-md"
          style={{ border: 'none' }}
          allowFullScreen
        />
        <button
          onClick={() => setActiveApp(null)}
          className="absolute top-4 right-4 bg-blue-500/80 text-white font-medium px-4 py-2 rounded-full backdrop-blur-md shadow-lg hover:bg-blue-500 transition-all duration-200 z-20"
        >
          ⬅︎ Back To Projects
        </button>
      </div>,
      document.body
    );
  }

  return (
    <div className="w-full h-full px-6 pb-6 pt-16 select-none flex items-start">
      <div className="flex flex-col gap-8">
        {apps.map((app) => (
          <div
            key={app.id}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-150"
            onClick={() => setActiveApp(app)}
          >
            <div
              className={`w-20 h-20 ${app.color} rounded-[22%] overflow-hidden shadow-md backdrop-blur-sm border border-white/10 hover:shadow-lg transition flex items-center justify-center`}
              style={{ userSelect: 'none' }}
            >
              {app.icon.startsWith('/') ? (
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              ) : (
                <span className="text-white text-3xl">{app.icon}</span>
              )}
            </div>
            <span
              className="text-white mt-2 text-sm text-center w-24 leading-tight"
              style={{ userSelect: 'none' }}
            >
              {app.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
