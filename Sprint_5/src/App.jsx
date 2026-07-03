import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Technology from './pages/Technology';
import AppDemo from './pages/AppDemo';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import './index.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    document.title = 'Sentinel | Personal safety that reacts before you can';
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'how-it-works':
        return <HowItWorks setCurrentPage={setCurrentPage} />;
      case 'technology':
        return <Technology setCurrentPage={setCurrentPage} />;
      case 'app':
        return <AppDemo setCurrentPage={setCurrentPage} />;
      case 'pricing':
        return <Pricing setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-root">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
