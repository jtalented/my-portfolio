import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface AppState {
  id: string;
  name: string;
  icon: string;
  color?: string;
  iframe?: string; // optional now for non-iframe apps
  htmlContent?: string; // HTML content string
  customStyles?: string; // New property for custom CSS
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
    id: 'march',
    name: 'March Madness',
    icon: `${import.meta.env.BASE_URL}icons/march.svg`,
    color: 'bg-blue-500/20',
    htmlContent: `
      <div class="flex-1 p-6 overflow-auto text-sm text-gray-700 font-sans">
        <h2 class="text-xl font-bold mb-2 text-blue-700">March Madness Prediction Web App</h2>
        <p class="mb-4 text-gray-800">
          A data-driven NCAA bracket prediction tool built with modern web technologies and custom machine learning.
        </p>
        
        <div class="mb-4">
          <h3 class="font-semibold text-md text-gray-800 mb-1">🔧 Tech Stack</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Frontend:</strong> React.js (TypeScript)</li>
            <li><strong>Backend:</strong> Flask API with Python</li>
            <li><strong>ML Model:</strong> Trained on historical March Madness data (Kaggle)</li>
          </ul>
        </div>

        <div class="mb-4">
          <h3 class="font-semibold text-md text-gray-800 mb-1">📊 Features</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>Machine learning-based tournament prediction</li>
            <li>API endpoints for serving bracket logic</li>
            <li>Interactive bracket builder UI</li>
          </ul>
        </div>

        <div class="mb-4">
          <h3 class="font-semibold text-md text-gray-800 mb-1">🛠️ Future Plans</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>Visualize predictions with confidence levels</li>
            <li>Enable user-specific predictions and saving</li>
            <li>Deploy model with scalable cloud infrastructure</li>
          </ul>
        </div>

        <!-- GitHub button -->
        <div class="pt-4">
          <a
            href="https://github.com/jtalented"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-gray-900 text-white text-xs px-4 py-2 rounded-full hover:bg-gray-800 transition-all shadow-md"
          >
            🔗 View on GitHub
          </a>
        </div>
      </div>
    `,
    customStyles: `
      /* Custom styles for March Madness app */
      .custom-bracket-container {
        background: linear-gradient(to right, #f0f4ff, #e6efff);
        border-radius: 8px;
      }
      
      .team-highlight {
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% { background-color: rgba(59, 130, 246, 0.1); }
        50% { background-color: rgba(59, 130, 246, 0.3); }
        100% { background-color: rgba(59, 130, 246, 0.1); }
      }
    `,
    layout: {
      top: '0px',
      left: '117px',
      right: '128px',
      bottom: '0px',
    },
  },
  {
    id: 'video',
    name: 'Automated Video Compiler',
    icon: '📹',
    color: 'bg-blue-300/30',
    htmlContent: `
      <div class="flex-1 p-6 overflow-auto text-sm text-gray-700 font-sans">
        <h2 class="text-xl font-bold mb-2 text-indigo-700">Automated Video Compiler</h2>
        <p class="mb-4 text-gray-800">
          A Python-powered pipeline that compiles daily trending video segments using social media APIs, editing libraries, and automation tools.
        </p>
        
        <div class="mb-4">
          <h3 class="font-semibold text-md text-gray-800 mb-1">🛠 Technologies Used</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>Python for scripting the pipeline logic</li>
            <li>FFmpeg for stitching and trimming videos</li>
            <li>Pytube and Instagram Graph API for media extraction</li>
          </ul>
        </div>

        <div class="mb-4">
          <h3 class="font-semibold text-md text-gray-800 mb-1">💡 Features</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>Daily fetch and compile of trending video clips</li>
            <li>Overlay of intros/outros, transitions, and captions</li>
            <li>End-to-end automation: trigger, edit, export</li>
          </ul>
        </div>

        <div class="mb-4">
          <h3 class="font-semibold text-md text-gray-800 mb-1">📈 Use Case</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>Batch-creates video compilations for platforms like TikTok, Instagram Reels, and YouTube Shorts</li>
            <li>Streamlines content curation for daily publishing</li>
          </ul>
        </div>

        <!-- GitHub button -->
        <div class="pt-4">
          <a
            href="https://github.com/jtalented"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block bg-gray-900 text-white text-xs px-4 py-2 rounded-full hover:bg-gray-800 transition-all shadow-md"
          >
            🔗 View on GitHub
          </a>
        </div>
      </div>
    `,
    customStyles: `
    /* Custom styles for Automated Video Compiler app */
    .bg-gradient-video {
      background: linear-gradient(to right, #f8fafc, #e2e8f0);
    }
  
    .video-section {
      background-color: white;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
      margin-bottom: 1rem;
    }
  
    .video-section h3 {
      color: #1e293b;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
  
    .video-section ul {
      padding-left: 1.25rem;
      list-style-type: disc;
      color: #334155;
    }
  
    .video-section ul li {
      margin-bottom: 0.4rem;
    }
  
    .github-button {
      background-color: #111827;
      color: white;
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
      border-radius: 9999px;
      display: inline-block;
      text-decoration: none;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      transition: background-color 0.2s ease;
    }
  
    .github-button:hover {
      background-color: #1f2937;
    }
  `,
    layout: {
      top: '0px',
      left: '117px',
      right: '128px',
      bottom: '0px',
    },
  }
];




const HomeScreen = () => {
  const [activeApp, setActiveApp] = useState<AppState | null>(null);
  const [anchorPos, setAnchorPos] = useState<DOMRect | null>(null);

  useEffect(() => {
    const anchor = document.getElementById('macbook-app-anchor');
    if (anchor && activeApp) {
      const rect = anchor.getBoundingClientRect();
      setAnchorPos(rect);
    }
  }, [activeApp]);



  // Function to create unique style ID for each app
  const getStyleId = (appId: string) => `app-style-${appId}`;

  // Function to inject custom CSS
  const injectCustomStyles = (appId: string, cssString: string) => {
    // Remove any existing style element for this app
    const existingStyle = document.getElementById(getStyleId(appId));
    if (existingStyle) {
      existingStyle.remove();
    }




    // Create new style element
    if (cssString) {
      const styleElement = document.createElement('style');
      styleElement.id = getStyleId(appId);
      styleElement.textContent = cssString;
      document.head.appendChild(styleElement);
    }
  };




  // Inject styles when app becomes active
  useEffect(() => {
    if (activeApp && activeApp.customStyles) {
      injectCustomStyles(activeApp.id, activeApp.customStyles);
    }

    // Cleanup function to remove styles when component unmounts or app changes
    return () => {
      if (activeApp) {
        const styleElement = document.getElementById(getStyleId(activeApp.id));
        if (styleElement) {
          styleElement.remove();
        }
      }
    };
  }, [activeApp]);

  if (activeApp && anchorPos) {
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
        className="rounded-md overflow-hidden shadow-2xl border border-white/10 bg-white flex flex-col"
        style={style}
      >
        {/* Fake browserbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-200 border-b border-gray-300 text-sm font-medium">
          <span className="text-gray-700">{activeApp.name}</span>
          <button
            onClick={() => setActiveApp(null)}
            className="text-sm text-white bg-blue-500 px-3 py-1 rounded-full shadow hover:bg-blue-600 transition-all"
          >
            ⬅︎ Back To Projects
          </button>
        </div>

        {/* App Content Container */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* InjectedHTML content or fallback */}
          {activeApp.htmlContent ? (
            <div 
              className="app-content flex-1"
              dangerouslySetInnerHTML={{ __html: activeApp.htmlContent }}
            />
          ) : (
            <div className="flex-1 p-6 overflow-auto text-sm text-gray-700">
              <p>No content available for this app.</p>
            </div>
          )}
        </div>
      </div>,
      document.body
    );
  }




  return (
    <div className="w-full h-full px-6 pb-6 pt-16 select-none flex flex-col gap-6">
      {/* Banner */}
      <div className="text-white text-center text-sm bg-yellow-500/30 rounded-md py-2 backdrop-blur-sm border border-yellow-400">
        🚧 Projects Page Under Construction ** All Projects Repositories may not be visible on Github 🚧
      </div>

      {/* Apps */}
      <div className="flex flex-col gap-8 items-start">
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