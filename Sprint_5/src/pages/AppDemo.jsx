import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, MapPin, Phone, RefreshCw, Battery, Wifi, Activity, Play } from 'lucide-react';

export default function AppDemo({ setCurrentPage }) {
  const [status, setStatus] = useState('nominal'); // 'nominal', 'countdown', 'notified'
  const [countdown, setCountdown] = useState(5);
  const [currentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    let timer;
    if (status === 'countdown' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (status === 'countdown' && countdown === 0) {
      setStatus('notified');
    }
    return () => clearInterval(timer);
  }, [status, countdown]);

  const handleStartSim = () => {
    setCountdown(5);
    setStatus('countdown');
  };

  const handleCancel = () => {
    setStatus('nominal');
    setCountdown(5);
  };

  const handleReset = () => {
    setStatus('nominal');
    setCountdown(5);
  };

  return (
    <div className="app-demo-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Your Sentinel, right now</h1>
          <p>
            This is a live simulation of the companion app dashboard. Watch how threat detection works in real-time.
          </p>
        </div>
      </section>

      {/* Simulator Dashboard */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sim-dashboard">
            
            {/* Status Banner */}
            <div className={`status-banner ${status === 'nominal' ? 'status-nominal' : 'status-alert'}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {status === 'nominal' ? <CheckCircle size={22} /> : <AlertTriangle size={22} />}
                <span>
                  {status === 'nominal' && "Protected. All systems nominal"}
                  {status === 'countdown' && `THREAT VERIFIED — Cancel in ${countdown}s if false alarm`}
                  {status === 'notified' && "EMERGENCY RESPONSE ACTIVATED — Contacts Notified"}
                </span>
              </div>
              <div>
                {status === 'countdown' && (
                  <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff', background: '#EF4444', padding: '4px 12px', borderRadius: '20px' }}>
                    00:0{countdown}
                  </span>
                )}
              </div>
            </div>

            {/* Graphs Row */}
            <div className="grid-2" style={{ marginBottom: '28px' }}>
              {/* Heart Rate Box */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>LIVE HEART RATE</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: status === 'nominal' ? '#10B981' : '#FF4500' }}>
                    {status === 'nominal' ? '74 BPM' : status === 'countdown' ? '172 BPM' : '165 BPM'}
                  </span>
                </div>
                {/* SVG Animated Waveform */}
                <svg viewBox="0 0 300 60" style={{ width: '100%', height: '60px' }}>
                  <path
                    d={status === 'nominal' 
                      ? "M 0 30 L 40 30 L 50 10 L 60 50 L 70 30 L 140 30 L 150 10 L 160 50 L 170 30 L 240 30 L 250 10 L 260 50 L 270 30 L 300 30"
                      : "M 0 30 L 20 5 L 30 55 L 40 10 L 50 50 L 60 5 L 80 50 L 100 5 L 120 55 L 140 10 L 160 50 L 180 5 L 200 55 L 220 10 L 240 50 L 260 5 L 280 55 L 300 30"
                    }
                    fill="none"
                    stroke={status === 'nominal' ? '#10B981' : '#FF4500'}
                    strokeWidth="3"
                  />
                </svg>
              </div>

              {/* Motion Intensity Box */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>MOTION INTENSITY</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: status === 'nominal' ? '#10B981' : '#FF4500' }}>
                    {status === 'nominal' ? '12%' : '96% (Erratic)'}
                  </span>
                </div>
                {/* SVG Animated Waveform */}
                <svg viewBox="0 0 300 60" style={{ width: '100%', height: '60px' }}>
                  <path
                    d={status === 'nominal' 
                      ? "M 0 40 Q 50 38 100 42 T 200 39 T 300 40"
                      : "M 0 30 L 15 5 L 30 55 L 45 10 L 60 50 L 75 5 L 90 55 L 115 10 L 130 50 L 150 5 L 180 55 L 210 10 L 240 50 L 270 5 L 300 30"
                    }
                    fill="none"
                    stroke={status === 'nominal' ? '#3B82F6' : '#FF4500'}
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>

            {/* Device Info Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px 20px', marginBottom: '32px', flexWrap: 'wrap', gap: '16px', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Battery size={18} color="#10B981" /> Battery: <strong>94% (6 days left)</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wifi size={18} color="#10B981" /> Connection: <strong>BLE Connected</strong>
              </div>
              <div>
                Last Sync: <strong style={{ color: 'var(--text-secondary)' }}>Live ({currentTime})</strong>
              </div>
            </div>

            {/* Action Area based on status */}
            {status === 'nominal' && (
              <div style={{ textAlign: 'center' }}>
                <button 
                  onClick={handleStartSim} 
                  className="btn-primary btn-lg" 
                  style={{ width: '100%', maxWidth: '380px' }}
                >
                  <Play size={20} /> Simulate an Event
                </button>
              </div>
            )}

            {status === 'countdown' && (
              <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '16px', border: '1px dashed #EF4444' }}>
                <p style={{ color: '#EF4444', fontWeight: 700, marginBottom: '16px', fontSize: '1.1rem' }}>
                  ⚠️ Threat detected! Automatic emergency dispatch will fire in {countdown} seconds.
                </p>
                <button 
                  onClick={handleCancel}
                  style={{ background: 'transparent', color: '#EF4444', border: '2px solid #EF4444', padding: '14px 36px', borderRadius: '12px', fontSize: '1.15rem', fontWeight: 800 }}
                >
                  Press to stop false alarm
                </button>
              </div>
            )}

            {status === 'notified' && (
              <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid #EF4444', borderRadius: '16px', padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <AlertTriangle size={28} color="#EF4444" />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Emergency Response Activated</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Silent dispatch initiated. GPS coordinates and encrypted audio stream transmitted to your emergency circle.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.4)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>CONTACT 1</div>
                    <div style={{ fontWeight: 700, color: '#fff', margin: '4px 0' }}>Mom (Primary)</div>
                    <div style={{ color: '#10B981', fontSize: '0.85rem', fontWeight: 600 }}>✅ Notified via SMS & Call</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.4)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>CONTACT 2</div>
                    <div style={{ fontWeight: 700, color: '#fff', margin: '4px 0' }}>Best Friend</div>
                    <div style={{ color: '#10B981', fontSize: '0.85rem', fontWeight: 600 }}>✅ Live GPS Shared</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.4)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.4)' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>DISPATCH</div>
                    <div style={{ fontWeight: 700, color: '#fff', margin: '4px 0' }}>🚨 Emergency Services</div>
                    <div style={{ color: '#EF4444', fontSize: '0.85rem', fontWeight: 600 }}>🚨 Dispatch Alerted</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
                    <MapPin color="#FF4500" /> Location: <strong>28.6139° N, 77.2090° E (New Delhi)</strong>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Alert timestamp: {new Date().toLocaleTimeString()}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button onClick={handleReset} className="btn-outline" style={{ border: '1px solid var(--border-strong)' }}>
                    <RefreshCw size={18} /> Reset Demo
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* What just happened Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card">
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px' }}>What just happened?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <p>
                <strong>1. Detect:</strong> Both heart rate and motion sensors spiked simultaneously, matching a verified threat signature.
              </p>
              <p>
                <strong>2. Verify:</strong> The on-device AI analyzed both signals together and confirmed a genuine emergency condition (distinguishing it from rhythmic exercise or accidental impact).
              </p>
              <p>
                <strong>3. Alert:</strong> After the configurable 5-second false-alarm cancel window elapsed, GPS coordinates and encrypted audio evidence were automatically transmitted to your emergency contacts — all without you lifting a finger.
              </p>
            </div>
            <div style={{ marginTop: '28px' }}>
              <button 
                onClick={() => setCurrentPage('how-it-works')}
                style={{ background: 'transparent', color: '#FF4500', fontWeight: 700, fontSize: '1.05rem' }}
              >
                Learn more about how it works →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
