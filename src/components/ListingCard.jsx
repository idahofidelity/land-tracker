import React, { useState } from 'react'
import StatusBadge from './StatusBadge'
import { STATUS_OPTIONS } from '../data/seed'
import { fmt, fmtDOM } from '../utils/format'

function Field({ label, value, flag }) {
  if (!value) return null
  return (
    <div>
      <div style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '0.84rem', color: flag ? 'var(--warn)' : 'var(--text)', lineHeight: 1.5 }}>{value}</div>
    </div>
  )
}

export default function ListingCard({ listing, onEdit, onDelete, onStatusChange }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${expanded ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: '6px',
      marginBottom: '8px',
      overflow: 'hidden',
      transition: 'border-color 0.15s',
    }}>
      {/* Collapsed header row */}
      <div
        className="listing-header-row"
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto auto auto',
          gap: '10px',
          alignItems: 'center',
          padding: '12px 16px',
          cursor: 'pointer',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {listing.address}
          </div>
          <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '2px' }}>
            MLS# {listing.mlsNumber || '—'} · {listing.area}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--accent2)', lineHeight: 1 }}>{fmt(listing.price)}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{listing.lotSize}</div>
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--muted)', flexShrink: 0, textAlign: 'right' }} className="mono">
          {fmtDOM(listing.daysOnMarket)} DOM
        </div>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }} onClick={e => e.stopPropagation()}>
          <StatusBadge status={listing.status} size="sm" />
          <select
            value={listing.status}
            onChange={e => onStatusChange(listing.id, e.target.value)}
            style={{ width: 'auto', fontSize: '0.75rem', padding: '5px 8px' }}
          >
            {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div style={{ color: 'var(--muted)', flexShrink: 0, fontSize: '0.8rem' }}>
          {expanded ? '▲' : '▼'}
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ padding: '4px 16px 16px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '12px', marginBottom: '12px' }}>
            <Field label="Zoning" value={listing.zoning} />
            <Field label="Water" value={listing.water} />
            <Field label="Sewer" value={listing.sewer} />
            <Field label="HOA / CC&Rs" value={listing.hoaCcr} />
            <Field label="Agent" value={listing.agent} />
            <Field label="Brokerage" value={listing.brokerage} />
            <Field label="Source" value={listing.source} />
            <Field label="Date Added" value={listing.dateAdded} />
          </div>

          {listing.waterfrontStreamMoratorium && (
            <div style={{ marginBottom: '12px' }}>
              <Field label="Waterfront / Stream / Moratorium Flags" value={listing.waterfrontStreamMoratorium} flag />
            </div>
          )}

          {listing.notes && (
            <div style={{
              background: 'var(--surface2)', borderLeft: '3px solid var(--accent)',
              borderRadius: '0 4px 4px 0', padding: '10px 12px', marginBottom: '12px',
              fontSize: '0.83rem', color: 'var(--text)', lineHeight: 1.6,
            }}>
              {listing.notes}
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => onEdit(listing)} style={{
              background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)',
              padding: '6px 14px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600,
            }}>
              Edit
            </button>
            <button onClick={() => onDelete(listing.id)} style={{
              background: 'var(--surface2)', border: '1px solid var(--red)', color: 'var(--red)',
              padding: '6px 14px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600,
            }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
