import React, { useState } from 'react';
import { Lock, ShieldAlert, HeartHandshake, FileText, ChevronDown, ChevronUp, User } from 'lucide-react';

export default function About({ setCurrentPage }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const principles = [
    { icon: <Lock size={28} color="#FF4500" />, title: "Privacy by Design", desc: "All processing happens on your device. Your data never leaves unless there's a confirmed threat." },
    { icon: <ShieldAlert size={28} color="#FF4500" />, title: "Built for the Worst Moment", desc: "We designed for panic, restraint, and zero reaction time — not the best-case scenario." },
    { icon: <HeartHandshake size={28} color="#FF4500" />, title: "Accessible, Not Exclusive", desc: "Premium safety tech shouldn't cost like a luxury gadget. Everyone deserves protection." },
    { icon: <FileText size={28} color="#FF4500" />, title: "Evidence-First", desc: "Automatic, tamper-proof evidence collection strengthens accountability and legal response." }
  ];

  const privacyFaqs = [
    { q: "What data does Sentinel collect?", a: "Sentinel continuously monitors heart rate and motion patterns locally on your device. It only logs temporary physiological buffers that are routinely overwritten every few minutes unless a threat is confirmed." },
    { q: "When does data leave my device?", a: "Data only transmits over network when an alert is verified (after the 5-second cancel window). Only your GPS location, timestamp, and encrypted audio stream are sent to your designated emergency contacts." },
    { q: "How is evidence encrypted?", a: "Audio recordings are end-to-end encrypted right at the moment of capture. Only you and your authorized emergency contacts hold the decryption keys. Neither Sentinel nor network providers can listen." },
    { q: "Who can access my data?", a: "Only you and those you explicitly authorize in your emergency circle. We never monetize, sell, or share biometric or location data with third-party advertisers or insurance companies." },
    { q: "Can I delete my data?", a: "Yes. You have full ownership. Via the companion app, you can execute immediate and permanent deletion of incident logs, biometric history, and account records at any time." }
  ];

  const teamMembers = [
    { name: "Priya Sharma", role: "CEO & Co-founder", bio: "Former embedded hardware engineer with a passion for personal safety technology." },
    { name: "Arjun Reddy", role: "CTO & Co-founder", bio: "Specialist in edge AI and low-latency biometric signal processing architectures." },
    { name: "Maya Patel", role: "Head of Hardware", bio: "12+ years designing rugged, medical-grade consumer wearables." },
    { name: "Rohan Kumar", role: "Lead AI Engineer", bio: "Ph.D. in machine learning focused on multi-modal sensor fusion and acoustic recognition." }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Safety technology shouldn't require a crisis to matter</h1>
          <p>
            We're building Sentinel because the gap between existing safety apps and real emergencies is unacceptable.
          </p>
        </div>
      </section>

      {/* The Problem We Saw Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '850px' }}>
          <div className="card" style={{ padding: '48px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '20px', color: '#FF4500' }}>
              The Problem We Saw
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.8 }}>
              <p>
                When examining real-world emergency incidents, a glaring disconnect emerges: conventional personal safety apps assume a calm, rational user who has the time and freedom to reach into their pocket, unlock their smartphone, locate an app, and hold down an SOS button.
              </p>
              <p>
                In reality, violent threats or sudden medical crises induce severe adrenaline spikes, cognitive paralysis, and physical restraint. Asking a victim to perform complex fine-motor navigation under duress is a fundamental design failure.
              </p>
              <p>
                Sentinel was born from a simple thesis: safety devices must monitor physiological stress directly and react automatically. By shifting the burden of activation from the human to on-device edge AI, we bridge the panic gap and ensure help arrives when the wearer cannot call for it themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles Grid */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container">
          <div className="section-heading">
            <h2>Our Principles</h2>
            <p>Core commitments guiding every piece of hardware and code we build.</p>
          </div>
          <div className="grid-2">
            {principles.map((p, idx) => (
              <div key={idx} className="card" style={{ padding: '36px' }}>
                <div style={{ marginBottom: '16px' }}>{p.icon}</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>{p.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Data Q&A */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-heading">
            <h2>Privacy & Data Security</h2>
            <p>Clear, direct answers on how we protect your information.</p>
          </div>
          <div>
            {privacyFaqs.map((faq, idx) => (
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

      {/* Team Grid */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.015)' }}>
        <div className="container">
          <div className="section-heading">
            <h2>The Team</h2>
            <p>Engineers, researchers, and designers dedicated to building proactive protection.</p>
          </div>
          <div className="grid-2">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,69,0,0.15)', border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <User size={36} color="#FF4500" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{member.name}</h3>
                  <div style={{ color: '#FF4500', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>{member.role}</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>Have questions or want to get involved?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            We'd love to hear from you.
          </p>
          <button className="btn-primary btn-lg" onClick={() => setCurrentPage('contact')}>
            Get in touch
          </button>
        </div>
      </section>
    </div>
  );
}
