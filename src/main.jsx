import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Design Tokens and Base Reset Styles
import './styles/tokens.css';
import './styles/base.css';

// Lenis Context, Loader Context & App
import { LenisProvider } from './context/LenisContext.jsx';
import { LoaderProvider } from './context/LoaderContext.jsx';
import App from './App.jsx';

// Register GSAP plugins globally once
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Refresh ScrollTrigger once window loads and fonts are ready
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <LenisProvider>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </LenisProvider>
    </HashRouter>
  </React.StrictMode>
);
