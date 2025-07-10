// Professional Portfolio Theme System
export const theme = {
  // Core Brand Colors
  brand: {
    primary: '#3b82f6',      // Professional blue
    secondary: '#6366f1',    // Indigo accent
    accent: '#0ea5e9',       // Sky blue for highlights
  },

  // Background System
  backgrounds: {
    primary: '#0f172a',      // Main dark background
    secondary: '#1e293b',    // Secondary dark background  
    tertiary: '#334155',     // Lighter dark sections
    card: '#1e293b',         // Card backgrounds
    glass: 'rgba(30, 41, 59, 0.4)', // Glass morphism
    overlay: 'rgba(15, 23, 42, 0.8)', // Overlays
  },

  // Text Colors
  text: {
    primary: '#f1f5f9',      // Primary text (slate-100)
    secondary: '#cbd5e1',    // Secondary text (slate-300)
    muted: '#94a3b8',        // Muted text (slate-400)
    subtle: '#64748b',       // Subtle text (slate-500)
  },

  // Border System
  borders: {
    primary: 'rgba(100, 116, 139, 0.3)',    // Main borders
    secondary: 'rgba(100, 116, 139, 0.2)',  // Subtle borders
    accent: 'rgba(59, 130, 246, 0.5)',      // Accent borders
    glow: 'rgba(59, 130, 246, 0.3)',        // Glow effects
  },

  // Interactive States
  interactive: {
    hover: 'rgba(59, 130, 246, 0.1)',       // Hover backgrounds
    active: 'rgba(59, 130, 246, 0.2)',      // Active states
    focus: 'rgba(59, 130, 246, 0.3)',       // Focus states
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    text: 'linear-gradient(135deg, #3b82f6 0%, #f1f5f9 50%, #3b82f6 100%)',
    glow: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
  },

  // Shadows and Effects
  shadows: {
    sm: '0 1px 3px rgba(59, 130, 246, 0.1)',
    md: '0 4px 12px rgba(59, 130, 246, 0.15)',
    lg: '0 8px 25px rgba(59, 130, 246, 0.2)',
    glow: '0 0 30px rgba(59, 130, 246, 0.3)',
  },

  // Animation Easing
  easing: {
    smooth: [0.25, 0.1, 0.25, 1],
    bounce: [0.34, 1.56, 0.64, 1],
    spring: [0.175, 0.885, 0.32, 1.275],
  },

  // Spacing System
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem', 
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  // Professional Status Colors
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Technology Category Colors
  tech: {
    frontend: '#61dafb',     // React cyan
    backend: '#68d391',      // Node green
    database: '#f6ad55',     // Database orange
    cloud: '#a78bfa',        // Cloud purple
    tools: '#fbb6ce',        // Tools pink
  }
} as const;

// CSS Custom Properties Export
export const cssVariables = {
  '--color-brand-primary': theme.brand.primary,
  '--color-brand-secondary': theme.brand.secondary,
  '--color-bg-primary': theme.backgrounds.primary,
  '--color-bg-secondary': theme.backgrounds.secondary,
  '--color-text-primary': theme.text.primary,
  '--color-text-secondary': theme.text.secondary,
  '--color-border-primary': theme.borders.primary,
  '--gradient-primary': theme.gradients.primary,
} as const;