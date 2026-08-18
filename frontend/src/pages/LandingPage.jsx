import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  ShieldCheck,
  Zap,
  BarChart3,
  Users,
  Smile,
  Calendar,
  Sparkles,
  ArrowRight,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import api from '../api/api';

export const LandingPage = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateAndSetFile = (selectedFile) => {
    setErrorMessage(null);
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith('.txt')) {
      setErrorMessage('Please upload a valid WhatsApp chat export (.txt) file.');
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setErrorMessage('File size exceeds 50MB limit.');
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a WhatsApp .txt export file first.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setErrorMessage(null);

    try {
      const response = await api.uploadChat(file, (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || file.size)
        );
        setUploadProgress(percentCompleted);
      });

      if (response && response.analysis_id) {
        navigate(`/dashboard/${response.analysis_id}`);
      } else {
        throw new Error('Analysis ID was not returned by the server.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      const detail = err.response?.data?.detail || err.message || 'Failed to upload and analyze chat file.';
      setErrorMessage(detail);
      setUploading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '820px', margin: '20px auto 0' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: 'rgba(37, 211, 102, 0.12)',
          border: '1px solid rgba(37, 211, 102, 0.3)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.86rem',
          fontWeight: 600,
          color: 'var(--primary)',
          marginBottom: '20px',
        }}>
          <Sparkles size={16} />
          <span>Next-Gen Analytics Engine</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          color: '#FFFFFF',
          marginBottom: '16px',
        }}>
          WhatsApp Chat <span style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Analyzer</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          maxWidth: '680px',
          margin: '0 auto 28px',
        }}>
          Turn your WhatsApp conversations into meaningful insights. Discover message trends, activity heatmaps, participant leaderboards, word clouds, and emoji sentiment.
        </p>
      </section>

      {/* Upload Box Card */}
      <section style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}>
        <div
          className="glass-card"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            padding: '36px 28px',
            border: isDragging ? '2px dashed var(--primary)' : '1px solid var(--border-subtle)',
            background: isDragging ? 'rgba(37, 211, 102, 0.06)' : 'rgba(17, 27, 33, 0.85)',
            textAlign: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt,text/plain"
            style={{ display: 'none' }}
          />

          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(37, 211, 102, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
            margin: '0 auto 18px',
            boxShadow: '0 0 24px var(--primary-glow)',
          }}>
            <UploadCloud size={36} />
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
            {file ? file.name : 'Upload your WhatsApp chat export'}
          </h3>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            {file
              ? `${(file.size / 1024).toFixed(1)} KB • Ready for deep analysis`
              : 'Drag and drop your exported .txt chat file here, or click to browse'}
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary"
              disabled={uploading}
              onClick={(e) => {
                e.stopPropagation();
                if (file) {
                  handleUpload();
                } else {
                  fileInputRef.current?.click();
                }
              }}
              style={{ minWidth: '180px' }}
            >
              {uploading ? (
                <span>Analyzing ({uploadProgress}%)...</span>
              ) : file ? (
                <>
                  <span>Analyze Your Chat</span>
                  <ArrowRight size={18} />
                </>
              ) : (
                <>
                  <FileText size={18} />
                  <span>Select .txt File</span>
                </>
              )}
            </button>
          </div>

          {/* Progress bar */}
          {uploading && (
            <div style={{ marginTop: '20px', width: '100%', background: 'var(--bg-card-subtle)', height: '6px', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                width: `${uploadProgress}%`,
                transition: 'width 0.2s ease',
              }} />
            </div>
          )}

          {/* Error display */}
          {errorMessage && (
            <div style={{
              marginTop: '20px',
              padding: '12px 16px',
              background: 'rgba(255, 90, 95, 0.12)',
              border: '1px solid rgba(255, 90, 95, 0.3)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--accent-rose)',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </section>

      {/* Feature Grid */}
      <section style={{ marginTop: '10px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Comprehensive Conversation Analytics
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Everything you need to understand group dynamics and message habits
          </p>
        </div>

        <div className="grid-3">
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ color: 'var(--primary)', marginBottom: '12px' }}><BarChart3 size={28} /></div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Volume & Timelines</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Interactive monthly and daily trend lines charting conversation peaks over months and years.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ color: 'var(--secondary)', marginBottom: '12px' }}><Users size={28} /></div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Member Leaderboard</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Identify the most active chat participants, compare message proportions, and filter insights per user.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ color: 'var(--accent-amber)', marginBottom: '12px' }}><Calendar size={28} /></div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Activity Heatmap</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Uncover busy days of the week and peak chatting hours with a 24×7 activity density matrix.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ color: 'var(--accent-purple)', marginBottom: '12px' }}><Smile size={28} /></div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Emoji Analysis</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Deep sentiment through emoji distribution breakdown and top-used emoji charts.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ color: 'var(--primary-dark)', marginBottom: '12px' }}><Zap size={28} /></div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Word Cloud & Keywords</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Hinglish-aware vocabulary extraction with ranked word bars and an interactive tag cloud.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ color: 'var(--accent-rose)', marginBottom: '12px' }}><ShieldCheck size={28} /></div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>100% Private & Secure</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Files are processed with strict isolation. No personal phone numbers or contact data are broadcast.
            </p>
          </div>
        </div>
      </section>

      {/* Export Instructions Guide */}
      <section className="glass-card" style={{ padding: '30px', maxWidth: '880px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <HelpCircle size={22} color="var(--primary)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>How to Export Your WhatsApp Chat</h3>
        </div>

        <div className="grid-2">
          <div style={{ background: 'var(--bg-card-subtle)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '8px' }}>📱 Android Instructions</strong>
            <ol style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <li>Open any WhatsApp conversation.</li>
              <li>Tap the <strong>three dots (⋮)</strong> at the top right.</li>
              <li>Select <strong>More</strong> &gt; <strong>Export chat</strong>.</li>
              <li>Choose <strong>Without Media</strong>.</li>
              <li>Save and upload the resulting <code style={{ color: 'var(--primary)' }}>.txt</code> file here.</li>
            </ol>
          </div>

          <div style={{ background: 'var(--bg-card-subtle)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <strong style={{ color: 'var(--secondary)', display: 'block', marginBottom: '8px' }}>🍏 iOS (iPhone) Instructions</strong>
            <ol style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <li>Open the chat on your iPhone.</li>
              <li>Tap the <strong>Contact or Group name</strong> at the top.</li>
              <li>Scroll down and tap <strong>Export Chat</strong>.</li>
              <li>Select <strong>Without Media</strong>.</li>
              <li>Save to Files and upload the <code style={{ color: 'var(--secondary)' }}>.txt</code> export here.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
