// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import { createClient } from '@supabase/supabase-js';
import './styles/global.css';
import './il8n';
import './index.css';


//const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
//const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

//export const supabase = createClient(supabaseUrl, supabaseAnonKey);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);