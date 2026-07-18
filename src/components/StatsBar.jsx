import React from 'react'
import { STATUS_OPTIONS } from '../data/seed'
import { fmt } from '../utils/format'

export default function StatsBar({ listings }) {
  const total = listings.length
  const active = listings.filter(l => !['passed', 'lost'].includes(l.status)).length
  const prices = listings.filter(l => l.price).map(l => l.price)
  const avgPrice = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0
  const minPrice = prices.length ? Math.min(...prices) : 0
  const maxPrice = prices.length ? Math.max(...prices) : 0

  const statusCounts = STATUS_OPTIONS.map(s => ({
    ...s,
    count: listings.filter(l => l.status === s.value).length,
  })).filter(s => s.count > 0)

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '10px',
      marginBottom: '18px',
    }}>
      <StatCard label="Total Parcels" value={total} />
      <StatCard label="Active" value={active} accent="var(--accent)" />
      <StatCard label="Price Range" value={`${fmt(minPrice)}–${fmt(maxPrice)}`} small />
      <StatCard label="Avg Price" value={fmt(avgPrice)} />
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px',
        padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px',
        gridColumn: 'span 2',
      }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)' }}>By Status</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {statusCounts.map(s => (
            <span key={s.value} style={{ fontSize: '0.78rem', color: s.color, fontWeight: 600 }}>
              {s.count} {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, accent, small }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px',
      padding: '10px 14px',
    }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '3px' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: small ? '1.15rem' : '1.5rem', color: accent || 'var(--accent2)', lineHeight: 1 }}>{value}</div>
    </div>
  )
}
