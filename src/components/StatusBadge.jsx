import React from 'react'
import { STATUS_OPTIONS } from '../data/seed'

export default function StatusBadge({ status, size = 'md' }) {
  const opt = STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0]
  const pad = size === 'sm' ? '2px 8px' : '4px 11px'
  const font = size === 'sm' ? '0.65rem' : '0.72rem'
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      backgroundColor: `color-mix(in srgb, ${opt.color} 18%, transparent)`,
      color: opt.color,
      padding: pad,
      borderRadius: '3px',
      fontSize: font,
      fontWeight: 700,
      letterSpacing: '0.6px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: opt.color, flexShrink: 0 }} />
      {opt.label}
    </span>
  )
}
