import { createPortal } from 'react-dom';
import { TERMS, PRIVACY, LEGAL_UPDATED } from '../data/legal.js';

export default function LegalModal({ doc, onClose }) {
  const sections = doc === 'privacy' ? PRIVACY : TERMS;
  const title = doc === 'privacy' ? 'Privacy Policy' : 'Terms of Service';

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ padding: 28, maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
      >
        <h3 style={{
          fontSize: 18,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 4,
        }}>
          {title}
        </h3>
        <div style={{
          fontSize: 11,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 16,
        }}>
          Last updated: {LEGAL_UPDATED}
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {sections.map(section => (
            <div key={section.heading} style={{ marginBottom: 18 }}>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: 6,
              }}>
                {section.heading}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {section.body}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            fontSize: 20,
            background: 'transparent',
          }}
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
}
