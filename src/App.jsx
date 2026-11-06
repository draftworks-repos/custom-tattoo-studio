import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './context/LenisContext.jsx';
import { PageTransitionProvider } from './components/PageTransition/PageTransition.jsx';
import { Cursor } from './components/Cursor/Cursor.jsx';
import { Navbar } from './components/Navbar/Navbar.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { Services } from './pages/Services.jsx';
import { About } from './pages/About.jsx';
import { Contact } from './pages/Contact.jsx';
import { InitialLoader } from './components/InitialLoader/InitialLoader.jsx';
import './App.css';

/**
 * Handles scroll reset, title updates, and ScrollTrigger refreshes on route changes.
 */
function RouteChangeHandler() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // 1. Reset scroll immediately
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // 2. Refresh ScrollTrigger after next animation frame so new layout is ready
    const frameId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // 3. Update document title for SEO
    const routeTitles = {
      '/': 'INKED — Custom Tattoo Studio | Fine Line, Realism & Blackwork',
      '/services': 'Services & Disciplines | INKED Tattoo Studio',
      '/about': 'Our Story & Resident Crew | INKED Tattoo Studio',
      '/contact': 'Consultation & Booking | INKED Tattoo Studio',
    };
    document.title = routeTitles[location.pathname] || 'INKED — Custom Tattoo Studio';

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [location.pathname, lenis]);

  return null;
}

export default function App() {
  return (
    <PageTransitionProvider>
      {/* Initial 0% to 100% Image Preload Screen */}
      <InitialLoader />

      {/* Skip to Content Accessibility Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Custom Desktop Cursor */}
      <Cursor />

      {/* Global Navbar */}
      <Navbar />

      {/* Route-change scroll & title synchronizer */}
      <RouteChangeHandler />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Global Editorial Footer */}
      <Footer />
    </PageTransitionProvider>
  );
}
