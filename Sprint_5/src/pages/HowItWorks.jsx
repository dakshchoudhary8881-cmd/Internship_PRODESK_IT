import React, { useState } from 'react';
import { Shield, Activity, Radio, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Play } from 'lucide-react';

export default function HowItWorks({ setCurrentPage }) {
  const [simMode, setSimMode] = useState('none'); // 'none', 'jogging', 'assault'
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "What if I bump my wrist hard?",
      a: "Sentinel requires BOTH a heart rate spike AND motion anomaly pattern to trigger. A simple bump won't cause your heart rate to spike dramatically, so it won't trigger an alert. The dual-signal requirement is specifically designed to prevent false alarms from everyday impacts."
    },
    {
      q: "Does it drain my phone battery?",
      a: "No. The wearable uses Bluetooth Low Energy and only sends data when needed. AI processing happens efficiently on your phone only when threat patterns are detected. Most users report less than 2% daily battery impact."
    },
    {
      q: "What if I don't have signal?",
      a: "Sentinel stores the alert and evidence locally and will automatically transmit as soon as connectivity is restored. The device also supports offline emergency protocols depending on your region."
    },
    {
      q: "Can I cancel a false trigger?",
      a: "Yes. You have a brief window (configurable, default 10 seconds) to cancel an alert via the app before emergency contacts are notified. This provides peace of mind while maintaining fast response."
    }
  ];

  return (
    <div className="how-it-works-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Three steps. Under three seconds.</h1>
          <p>
            Sentinel's dual-sensor AI system works completely automatically. No manual activation. No panic required.
          </p>
        </div>
      </section>

      {/* The Panic Gap Comparison Table */}
      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="section-heading">
            <h2>The Panic Gap</h2>
            <p>Why conventional safety apps fail when you need them most.</p>
          </div>
          <div className="card" style={{ padding: '24px', overflowX: 'auto' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>SOS Apps</th>
                  <th style={{ color: '#FF4500' }}>Sentinel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Activation</td>
                  <td>Manual tap required</td>
                  <td className="highlight-col">Automatic detection</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Works while panicking</td>
                  <td>No - requires calm</td>
                  <td className="highlight-col">Yes - fully passive</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>False alarm rate</td>
                  <td>High (manual errors)</td>
                  <td className="highlight-col">&lt;3% (three-signal verification)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Evidence collected</td>
                  <td>Limited / manual</td>
                  <td className="highlight-col">Auto: GPS + audio + timestamp</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Cost</td>
                  <td>$0 - $10 / month</td>
                  <td className="highlight-col">₹450 one-time</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3 Detailed Steps */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Step 1 */}
          <div className="card" style={{ marginBottom: '40px', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div className="logo-badge">1</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Detects. Dual-sensor fusion monitors for threat patterns.</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Sentinel continuously monitors two biometric signals: your heart rate and motion patterns. When both spike simultaneously in a specific way — sharp heart rate increase combined with sudden, erratic movement — it flags a potential threat.
            </p>
            <div style={{ background: 'rgba(255, 69, 0, 0.08)', border: '1px solid rgba(255, 69, 0, 0.25)', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px', fontWeight: 700, color: '#FF4500' }}>
              <Activity size={24} /> Heart Rate Spike + Motion Anomaly = ⚠️ Potential Threat Flagged
            </div>
          </div>

          {/* Step 2 with Interactive Simulation */}
          <div className="card" style={{ marginBottom: '40px', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div className="logo-badge">2</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Verifies. Three-signal verification with audio tiebreaker.</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Sentinel continuously monitors two primary signals: heart rate and motion. If both spike together, that's strong evidence of a threat, and the system proceeds directly to alert verification with a 5-second cancel window. But if only one signal crosses its threshold, the system checks a third signal — on-device audio analysis — listening for sudden screams, shouts, or distress sounds.
            </p>

            {/* Simulation Box */}
            <div style={{ background: '#0B0F19', border: '1px solid var(--border-strong)', borderRadius: '16px', padding: '28px', marginTop: '32px' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play size={18} color="#FF4500" /> Interactive Verification Simulator
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                Test how the AI distinguishes between intense exercise and a real assault:
              </p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <button 
                  onClick={() => setSimMode('jogging')}
                  style={{ background: simMode === 'jogging' ? '#10B981' : 'rgba(16, 185, 129, 0.2)', color: '#fff', border: '1px solid #10B981', padding: '10px 20px', borderRadius: '8px', fontWeight: 600 }}
                >
                  Simulate Jogging
                </button>
                <button 
                  onClick={() => setSimMode('assault')}
                  style={{ background: simMode === 'assault' ? '#FF4500' : 'rgba(255, 69, 0, 0.2)', color: '#fff', border: '1px solid #FF4500', padding: '10px 20px', borderRadius: '8px', fontWeight: 600 }}
                >
                  Simulate Assault
                </button>
              </div>

              {simMode !== 'none' && (
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px', textAlign: 'center' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>HEART RATE</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: simMode === 'assault' ? '#FF4500' : '#10B981' }}>
                        {simMode === 'assault' ? '168 BPM' : '142 BPM'}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>MOTION INTENSITY</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: simMode === 'assault' ? '#FF4500' : '#10B981' }}>
                        {simMode === 'assault' ? '94% (Erratic)' : '85% (Rhythmic)'}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>AUDIO LEVEL</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: simMode === 'assault' ? '#EF4444' : '#10B981' }}>
                        {simMode === 'assault' ? 'High (Distress)' : 'Low (Normal)'}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ padding: '14px', borderRadius: '8px', background: simMode === 'assault' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)', border: `1px solid ${simMode === 'assault' ? '#EF4444' : '#10B981'}`, textAlign: 'center', fontWeight: 700, color: simMode === 'assault' ? '#EF4444' : '#10B981' }}>
                    {simMode === 'assault' 
                      ? '⚠️ THREAT DETECTED: Both primary signals spike together with distress audio → Verification with 5s cancel window' 
                      : '✅ NORMAL ACTIVITY: Motion high, heart rate elevated but rhythmic, no audio anomaly → Exercise detected, no alert'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 3 */}
          <div className="card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div className="logo-badge">3</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Alerts. Silent dispatch with GPS and evidence.</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Once a threat is confirmed, Sentinel silently sends an alert to your emergency contacts and optionally to local responders. The alert includes your precise GPS location, a timestamp, and begins recording encrypted audio evidence.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 500 }}>
                <CheckCircle2 size={18} color="#FF4500" /> GPS location sent to contacts
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 500 }}>
                <CheckCircle2 size={18} color="#FF4500" /> Encrypted audio recording begins
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 500 }}>
                <CheckCircle2 size={18} color="#FF4500" /> Timestamp logged for evidence
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 500 }}>
                <CheckCircle2 size={18} color="#FF4500" /> Silent operation — attacker unaware
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQs */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-heading">
            <h2>Common Questions</h2>
            <p>Everything you need to know about Sentinel's AI behavior.</p>
          </div>
          <div>
            {faqs.map((faq, idx) => (
              <div key={idx} className="accordion-item">
                <button className="accordion-header" onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} color="#FF4500" /> : <ChevronDown size={20} />}
                </button>
                {openFaq === idx && (
                  <div className="accordion-body">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>Want to dive deeper into the technology?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Explore the hardware, architecture, and AI behind Sentinel.
          </p>
          <button className="btn-primary btn-lg" onClick={() => setCurrentPage('technology')}>
            See the technology
          </button>
        </div>
      </section>
    </div>
  );
}
