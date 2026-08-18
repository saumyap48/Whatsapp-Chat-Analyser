import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, BarChart2, Shield } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <MessageSquare size={22} />
          </div>
          <div>
            <span className="brand-name">WhatsApp Chat Analyzer</span>
          </div>
          <span className="brand-badge">v2.0 • Full-Stack</span>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <Shield size={16} color="var(--primary)" />
            <span>Client-Side Privacy Protected</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
