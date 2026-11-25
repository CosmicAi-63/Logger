import { useState, useEffect, useRef } from 'react';
import { formatTimer } from '../utils/helpers.js';

export default function RestTimer({ duration, active, onDismiss, onDurationChange }) {
  const [remaining, setRemaining] = useState(duration);
  const [editing, setEditing] = useState(false);
  const intervalRef = useRef(null);
  const onDismissRef = useRef(onDismiss);
  useEffect(() => { onDismissRef.current = onDismiss; });

  useEffect(() => {
    if (!active) {
      clearInterval(intervalRef.current);
      return;
    }
    // Wall-clock based so the countdown stays correct if iOS throttles timers in the background
    const endAt = Date.now() + duration * 1000;
    const tick = () => {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) {
        clearInterval(intervalRef.current);
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        onDismissRef.current();
      }
    };
    tick();
    intervalRef.current = setInterval(tick, 250);
    document.addEventListener('visibilitychange', tick);
    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [active, duration]);

  const progress = active ? Math.min(1, remaining / duration) : 1;
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  const adjustDuration = (delta) => {
    const next = Math.max(15, duration + delta);
    onDurationChange(next);
  };

  if (editing && !active) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: '10px 4px',
        borderTop: '1px solid var(--border)',
      }}>
        <button
          onClick={() => adjustDuration(-15)}
          style={{
            width: 32, height: 32,
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            fontSize: 16, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          −
        </button>
        <span style={{
          fontSize: 18,
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          minWidth: 50,
          textAlign: 'center',
        }}>
          {formatTimer(duration)}
        </span>
        <button
          onClick={() => adjustDuration(15)}
          style={{
            width: 32, height: 32,
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            fontSize: 16, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          +
        </button>
        <button
          onClick={() => setEditing(false)}
          style={{
            padding: '4px 12px',
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-secondary)',
          }}
        >
          Done
        </button>
      </div>
    );
  }

  if (!active) {
    return (
      <button
        onClick={() => setEditing(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '6px 4px',
          borderTop: '1px solid var(--border)',
          width: '100%',
        }}
      >
        <span style={{
          fontSize: 12,
          color: 'var(--text-muted)',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {formatTimer(duration)}
        </span>
      </button>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: '8px 4px',
      background: 'var(--highlight)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="18" cy="18" r={radius} fill="none" stroke="var(--border)" strokeWidth="2.5" />
          <circle
            cx="18" cy="18" r={radius}
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          color: 'var(--text)',
        }}>
          {formatTimer(remaining)}
        </div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>
        Rest
      </div>

      <button
        onClick={() => { clearInterval(intervalRef.current); onDismiss(); }}
        style={{
          padding: '6px 14px',
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--text-muted)',
          background: 'transparent',
          border: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        Skip
      </button>
    </div>
  );
}
