import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import useResponsive from '../../hooks/useResponsive';

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
    id: 'portfolio',
    name: 'Portfolio',
    icon: '💼',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    htmlContent: `
      <div class="portfolio-content p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Interactive 3D Portfolio</h2>
        <p class="text-gray-600 mb-4">A modern portfolio website featuring interactive 3D elements, smooth animations, and responsive design.</p>
        <div class="tech-stack mb-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Tech Stack:</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">TypeScript</span>
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Three.js</span>
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Tailwind</span>
          </div>
        </div>
        <div class="features">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Features:</h3>
          <ul class="text-gray-600 text-sm space-y-1">
            <li>• Interactive 3D MacBook model</li>
            <li>• Smooth scroll animations</li>
            <li>• Responsive design</li>
            <li>• Glass morphism effects</li>
          </ul>
        </div>
      </div>
    `,
    layout: {
      top: '0px',
      left: '117px',
      right: '128px',
      bottom: '0px',
    },
  },
  {
    id: 'task-manager',
    name: 'Task Manager',
    icon: '📋',
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    htmlContent: `
      <div class="task-manager-content p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Enterprise Task Management</h2>
        <p class="text-gray-600 mb-4">A comprehensive task management platform with real-time collaboration and advanced analytics.</p>
        <div class="features mb-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Key Features:</h3>
          <ul class="text-gray-600 text-sm space-y-1">
            <li>• Real-time collaboration</li>
            <li>• Advanced analytics</li>
            <li>• Drag-and-drop functionality</li>
            <li>• Team workspace features</li>
          </ul>
        </div>
        <div class="tech-stack">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Tech Stack:</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">React</span>
            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Node.js</span>
            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Express</span>
            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">MongoDB</span>
          </div>
        </div>
      </div>
    `,
    layout: {
      top: '0px',
      left: '117px',
      right: '128px',
      bottom: '0px',
    },
  },
  {
    id: 'ecommerce-api',
    name: 'E-Commerce API',
    icon: '🛒',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    htmlContent: `
      <div class="ecommerce-content p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Scalable E-Commerce API</h2>
        <p class="text-gray-600 mb-4">High-performance RESTful API for e-commerce platforms with advanced authentication and payment processing.</p>
        <div class="features mb-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Features:</h3>
          <ul class="text-gray-600 text-sm space-y-1">
            <li>• Advanced authentication</li>
            <li>• Payment processing</li>
            <li>• Inventory management</li>
            <li>• High-performance design</li>
          </ul>
        </div>
        <div class="tech-stack">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Tech Stack:</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Node.js</span>
            <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Express</span>
            <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">MongoDB</span>
            <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">TypeScript</span>
          </div>
        </div>
      </div>
    `,
    layout: {
      top: '0px',
      left: '117px',
      right: '128px',
      bottom: '0px',
    },
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: '📊',
    color: 'bg-gradient-to-br from-red-500 to-red-600',
    htmlContent: `
      <div class="analytics-content p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Data Analytics Dashboard</h2>
        <p class="text-gray-600 mb-4">Real-time data visualization and analytics platform with interactive charts and reporting.</p>
        <div class="features mb-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Features:</h3>
          <ul class="text-gray-600 text-sm space-y-1">
            <li>• Real-time data visualization</li>
            <li>• Interactive charts</li>
            <li>• Custom reporting</li>
            <li>• Data export capabilities</li>
          </ul>
        </div>
        <div class="tech-stack">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Tech Stack:</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">React</span>
            <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">D3.js</span>
            <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Node.js</span>
            <span class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">PostgreSQL</span>
          </div>
        </div>
      </div>
    `,
    layout: {
      top: '0px',
      left: '117px',
      right: '128px',
      bottom: '0px',
    },
  },
  {
    id: 'video-editor',
    name: 'Video Editor',
    icon: '🎬',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    customStyles: `
    .video-section {
      padding: 1.5rem;
      background: linear-gradient(135deg, #f97316, #ea580c);
      color: white;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }
  
    .video-section h3 {
      color: white;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
  
    .video-section ul {
      padding-left: 1.25rem;
      list-style-type: disc;
      color: #fef3c7;
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
      left: 'responsive',
      right: 'responsive',
      bottom: '0px',
    },
  }
];

const HomeScreen = () => {
  const [activeApp, setActiveApp] = useState<AppState | null>(null);
  const [anchorPos, setAnchorPos] = useState<DOMRect | null>(null);
  const responsive = useResponsive();

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
    
    // Calculate responsive layout values
    const basePadding = responsive.isMobile ? 60 : responsive.isTablet ? 80 : 117;
    const defaultWidth = responsive.screenDimensions.uiWidth;
    const defaultHeight = responsive.screenDimensions.uiHeight;

    const style: React.CSSProperties = {
      position: 'absolute',
      top: `${anchorPos.top + parseInt(layout.top ?? '0')}px`,
      left: `${anchorPos.left + parseInt(layout.left ?? basePadding.toString())}px`,
      width:
        layout.left !== undefined && layout.right !== undefined
          ? `${anchorPos.width - parseInt(layout.left) - parseInt(layout.right)}px`
          : layout.width ?? `${defaultWidth}px`,
      height:
        layout.top !== undefined && layout.bottom !== undefined
          ? `calc(100vh - ${layout.top} - ${layout.bottom})`
          : layout.height ?? `${defaultHeight}px`,
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