import { memo } from 'react';

function Footer() {
  return (
    <footer className="app-footer" role="contentinfo">
      <div className="app-footer-content">
        <div className="app-footer-brand">
          <span className="brand-logo-icon" aria-hidden="true">⚡</span>
          <span className="brand-name">CINEVERSE</span>
          <span className="brand-tag">AI STUDIO</span>
        </div>
        <p className="app-footer-text">
          Powered by TMDB & Google Gemini AI. Netflix-Lite Production Architecture.
        </p>
        <div className="app-footer-links">
          <span className="app-footer-link">Privacy</span>
          <span className="app-footer-link">Terms</span>
          <span className="app-footer-link">API Docs</span>
          <span className="app-footer-link">System Status: Operational ●</span>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
