import React from 'react';

export default function Footer({ setCurrentPage }) {
  const handleNav = (id) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div 
                className="nav-logo" 
                onClick={() => handleNav('home')} 
                style={{ cursor: 'pointer', marginBottom: '16px' }}
              >
                <div className="logo-badge">S</div>
                <span>SENTINEL</span>
              </div>
              <p className="footer-desc">
                Personal safety that reacts before you can. Automatic threat detection powered by dual-sensor AI, designed for the moment it matters most.
              </p>
            </div>

            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-list">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>Home</a></li>
                <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); handleNav('how-it-works'); }}>How It Works</a></li>
                <li><a href="#technology" onClick={(e) => { e.preventDefault(); handleNav('technology'); }}>Technology</a></li>
                <li><a href="#app" onClick={(e) => { e.preventDefault(); handleNav('app'); }}>App</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Company</h4>
              <ul className="footer-list">
                <li><a href="#pricing" onClick={(e) => { e.preventDefault(); handleNav('pricing'); }}>Pricing</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNav('about'); }}>About</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }}>Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© Sentinel Safety Technologies. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              <a href="#cookies" onClick={(e) => e.preventDefault()}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed Emergent Badge exactly matching live site */}
      <a
        id="emergent-badge"
        target="_blank"
        rel="noopener noreferrer"
        href="https://app.emergent.sh/?utm_source=emergent-badge"
        className="emergent-badge"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M15.5702 8.13142C15.7729 8.0412 16.0007 8.18878 15.9892 8.4103C15.8374 11.3192 14.0965 14.0405 11.2531 15.3065C8.40964 16.5725 5.2224 16.0453 2.95912 14.2117C2.78676 14.072 2.82955 13.804 3.03219 13.7137L4.95677 12.8568C5.04866 12.8159 5.15446 12.823 5.24204 12.8725C6.73377 13.7153 8.59176 13.8649 10.2772 13.1145C11.9626 12.3641 13.0947 10.8833 13.4665 9.21075C13.4883 9.11256 13.5539 9.02918 13.6457 8.98827L15.5702 8.13142Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M15.3066 4.74698L15.5067 5.19653C15.5759 5.35178 15.5061 5.53366 15.3508 5.60278L1.29992 11.8586C1.14467 11.9278 0.962794 11.8579 0.893675 11.7027L0.701732 11.2716L0.693457 11.2531C-1.10317 7.21778 0.711626 2.49007 4.74692 0.693443C8.78221 -1.10318 13.51 0.711693 15.3066 4.74698ZM2.82356 8.55367C2.63552 8.63739 2.41991 8.51617 2.40853 8.31065C2.28373 6.05724 3.53858 3.85787 5.72286 2.88536C7.90715 1.91286 10.3813 2.45199 11.9724 4.05256C12.1175 4.19854 12.0633 4.43988 11.8753 4.5236L2.82356 8.55367Z" fill="white"/>
        </svg>
        <span>Made with Emergent</span>
      </a>
    </>
  );
}
