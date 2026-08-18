import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="WhatsApp Chat Analyzer Home">
          <div className="brand-icon" aria-hidden="true">
            <MessageSquare size={22} />
          </div>
          <div>
            <span className="brand-name">WhatsApp Chat Analyzer</span>
          </div>
          <span className="brand-badge">v2.0 • Full-Stack</span>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            <ShieldCheck size={16} color="var(--primary)" aria-hidden="true" />
            <span style={{ display: 'inline' }}>100% Client-Safe</span>
          </div>
          <a
            href="https://github.com/saumyap48/Whatsapp-Chat-Analyser"
            target="_blank"
            rel="noreferrer"
            aria-label="View source code on GitHub"
            style={{
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              transition: 'color var(--transition-fast)',
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
