import React from 'react'
import { STATUS_OPTIONS, AREA_OPTIONS } from '../data/seed'

export default function Toolbar({ filters, setFilters, sortBy, setSortBy, onAddNew }) {
  const update = (key, val) => setFilters(prev => ({ ...prev, [key]: val }))

  return (
    <div className="toolbar-row" style={{
      display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center',
      marginBottom: '14px', padding: '12px 14px',
      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px',
    }}>
      <input
        placeholder="Search address, MLS#, agent..."
        value={filters.search}
        onChange={e => update('search', e.target.value)}
        style={{ flex: '1 1 220px', minWidth: '180px' }}
      />

      <select value={filters.status} onChange={e => update('status', e.target.value)} style={{ width: 'auto', flex: '0 0 auto' }}>
        <option value="">All Statuses</option>
        {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>

      <select value={filters.area} onChange={e => update('area', e.target.value)} style={{ width: 'auto', flex: '0 0 auto' }}>
        <option value="">All Areas</option>
        {AREA_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
      </select>

      <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto', flex: '0 0 auto' }}>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="dom_desc">Days on Market</option>
        <option value="dateAdded_desc">Recently Added</option>
      </select>

      <button onClick={onAddNew} style={{
        background: 'var(--accent)', color: 'var(--bg)', border: 'none',
        padding: '8px 16px', borderRadius: '4px', fontWeight: 700, fontSize: '0.82rem',
        letterSpacing: '0.5px', flexShrink: 0,
      }}>
        + Add Listing
      </button>
    </div>
  )
}
