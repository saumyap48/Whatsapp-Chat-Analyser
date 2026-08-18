import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ErrorState = ({ title = 'Analysis Error', message, onRetry }) => {
  return (
    <div style={{
      minHeight: '380px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      padding: '40px',
      textAlign: 'center',
      maxWidth: '560px',
      margin: '0 auto',
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(255, 90, 95, 0.15)',
        border: '1px solid rgba(255, 90, 95, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-rose)',
      }}>
        <AlertTriangle size={30} />
      </div>

      <div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          {message || 'Unable to process this request. Please make sure the backend is active and the file is a valid exported WhatsApp chat.'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        {onRetry && (
          <button onClick={onRetry} className="btn btn-primary">
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        )}
        <Link to="/" className="btn btn-secondary">
          <ArrowLeft size={16} />
          <span>Upload Another Chat</span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorState;
