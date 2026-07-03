import React from 'react';
import { Cpu, Bluetooth, BatteryCharging, Droplets, Smile, DollarSign, Lock, ShieldCheck, Database, ArrowRight } from 'lucide-react';

export default function Technology({ setCurrentPage }) {
  const hardwareSpecs = [
    { icon: <Cpu size={28} color="#FF4500" />, title: "Dual Biometric Sensors", desc: "Heart rate + 3-axis accelerometer fusion for continuous physiological monitoring." },
    { icon: <Bluetooth size={28} color="#FF4500" />, title: "Bluetooth Low Energy", desc: "Minimal power consumption with instant secure packet transfer to mobile." },
    { icon: <BatteryCharging size={28} color="#FF4500" />, title: "7-day Battery Life", desc: "One full charge per week ensures continuous, uninterrupted protection." },
    { icon: <Droplets size={28} color="#FF4500" />, title: "Water Resistant", desc: "IP67 rated — fully functional in rain, showers, and accidental immersion." },
    { icon: <Smile size={28} color="#FF4500" />, title: "Comfortable Form", desc: "Lightweight 28g medical-grade silicone band designed for 24/7 wear." },
    { icon: <DollarSign size={28} color="#FF4500" />, title: "Affordable Hardware", desc: "Engineered for accessibility at a fraction of luxury wearable pricing." },
  ];

  const techSpecs = [
    { label: "Sensors", val: "PPG heart rate + 3-axis accelerometer" },
    { label: "Connectivity", val: "Bluetooth 5.2 Low Energy" },
    { label: "Battery Life", val: "7 days typical use" },
    { label: "Charging", val: "USB-C, 2 hours full charge" },
    { label: "Water Resistance", val: "IP67 (1m for 30 minutes)" },
    { label: "Weight", val: "28 grams" },
    { label: "Band Material", val: "Medical-grade silicone" },
    { label: "Processor", val: "ARM Cortex-M4 32-bit" },
  ];

  return (
    <div className="technology-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Built for the moment it matters most</h1>
          <p>
            Every design decision prioritizes reliability, privacy, and accessibility.
          </p>
        </div>
      </section>

      {/* Hardware Cards Grid */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Hardware Architecture</h2>
            <p>Purpose-built sensors designed for maximum accuracy and comfort.</p>
          </div>
          <div className="grid-3">
            {hardwareSpecs.map((item, idx) => (
              <div key={idx} className="card">
                <div style={{ marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tethered Edge Architecture Diagram */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="section-heading">
            <h2>Tethered Edge Architecture</h2>
            <p>Real-time distributed processing between your wearable and smartphone.</p>
          </div>
          <div className="card" style={{ padding: '40px', background: '#090C14', border: '1px solid var(--border-strong)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', textAlign: 'center' }}>
              
              <div style={{ flex: '1 1 240px', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FF4500', marginBottom: '8px' }}>⌚ Wearable</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Heart Rate Sensor<br />3-Axis Accelerometer<br />BLE Transmitter</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', color: '#FF4500', fontWeight: 700 }}>
                BLE 5.2 <ArrowRight size={20} style={{ marginLeft: '6px' }} />
              </div>

              <div style={{ flex: '1 1 240px', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FF4500', marginBottom: '8px' }}>📱 Smartphone</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>On-Device AI Verification<br />GPS Coordinate Fusion<br />Audio Evidence Capture</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', color: '#FF4500', fontWeight: 700 }}>
                Encrypted 5G <ArrowRight size={20} style={{ marginLeft: '6px' }} />
              </div>

              <div style={{ flex: '1 1 240px', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10B981', marginBottom: '8px' }}>🚨 Emergency</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Contacts Notified<br />Live Location Shared<br />Evidence Vault Access</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* AI & Privacy */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>AI & Privacy</h2>
            <p>Your biometric data belongs exclusively to you.</p>
          </div>
          <div className="grid-3">
            <div className="card">
              <Lock size={28} color="#FF4500" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>On-Device Processing</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                All AI analysis happens locally on your phone. Heart rate patterns, motion analysis, and threat verification never touch our servers unless an alert is confirmed.
              </p>
            </div>
            <div className="card">
              <ShieldCheck size={28} color="#FF4500" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>Encrypted Evidence Storage</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                When an alert is triggered, recorded audio is immediately encrypted with end-to-end encryption. Only you and designated emergency contacts can decrypt and access the evidence.
              </p>
            </div>
            <div className="card">
              <Database size={28} color="#FF4500" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '12px' }}>Minimal Transmission</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                The wearable only transmits sensor readings to your phone via Bluetooth Low Energy. No cloud sync. No continuous uploads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reliability Stats */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>Reliability</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
            Dual-signal verification reduces false alarms dramatically while preserving instant responsiveness.
          </p>
          <div className="stats-bar" style={{ margin: '0 auto 40px' }}>
            <div className="stat-item">
              <h3>&lt;5%</h3>
              <p>False Alarm Rate</p>
            </div>
            <div className="stat-item" style={{ borderLeft: '1px solid var(--border-subtle)', borderRight: '1px solid var(--border-subtle)', padding: '0 36px' }}>
              <h3>&lt;1s</h3>
              <p>Verification Time</p>
            </div>
            <div className="stat-item">
              <h3>2</h3>
              <p>Signals Required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Grid */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-heading">
            <h2>Technical Specifications</h2>
            <p>Comprehensive engineering specifications of the Sentinel Core.</p>
          </div>
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
              {techSpecs.map((spec, idx) => (
                <div 
                  key={idx} 
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', borderBottom: idx < techSpecs.length - 1 ? '1px solid var(--border-subtle)' : 'none', background: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{spec.label}</span>
                  <span style={{ fontWeight: 700, color: '#fff' }}>{spec.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>See the software side in action</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Try the interactive companion app dashboard.
          </p>
          <button className="btn-primary btn-lg" onClick={() => setCurrentPage('app')}>
            Try the live demo
          </button>
        </div>
      </section>
    </div>
  );
}
