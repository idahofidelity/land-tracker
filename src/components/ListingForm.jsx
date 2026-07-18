import React, { useState, useEffect } from 'react'
import { STATUS_OPTIONS, AREA_OPTIONS } from '../data/seed'

const EMPTY = {
  address: '', mlsNumber: '', price: '', daysOnMarket: '', lotSize: '',
  zoning: '', water: '', sewer: '', hoaCcr: '', waterfrontStreamMoratorium: '',
  agent: '', brokerage: '', area: AREA_OPTIONS[0], source: '', status: 'researching',
  notes: '', dateAdded: new Date().toISOString().slice(0, 10),
}

function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '4px' }}>{label}</div>
      {children}
    </div>
  )
}

export default function ListingForm({ editing, onSave, onClose }) {
  const [form, setForm] = useState(editing || EMPTY)

  useEffect(() => { setForm(editing || EMPTY) }, [editing])

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSubmit = () => {
    if (!form.address.trim()) return
    const payload = {
      ...form,
      id: form.id || `l${Date.now()}`,
      price: form.price ? parseInt(form.price) : null,
      daysOnMarket: form.daysOnMarket ? parseInt(form.daysOnMarket) : null,
    }
    onSave(payload)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px',
        padding: '22px', maxWidth: '640px', width: '100%', maxHeight: '85vh', overflowY: 'auto',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '1.5px', color: 'var(--accent)' }}>
            {editing ? 'Edit Listing' : 'Add New Listing'}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '1.3rem', lineHeight: 1 }}>×</button>
        </div>

        <FormField label="Address *">
          <input value={form.address} onChange={e => set('address', e.target.value)} placeholder="123 S Example Dr, Coeur d'Alene, ID 83814" />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <FormField label="MLS Number">
            <input value={form.mlsNumber} onChange={e => set('mlsNumber', e.target.value)} placeholder="26-1234" />
          </FormField>
          <FormField label="Price ($)">
            <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="79000" />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <FormField label="Days on Market">
            <input type="number" value={form.daysOnMarket} onChange={e => set('daysOnMarket', e.target.value)} />
          </FormField>
          <FormField label="Lot Size">
            <input value={form.lotSize} onChange={e => set('lotSize', e.target.value)} placeholder="0.25 acres" />
          </FormField>
        </div>

        <FormField label="Zoning">
          <input value={form.zoning} onChange={e => set('zoning', e.target.value)} placeholder="AGSUB, County-RUR, etc." />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <FormField label="Water Status">
            <input value={form.water} onChange={e => set('water', e.target.value)} />
          </FormField>
          <FormField label="Sewer Status">
            <input value={form.sewer} onChange={e => set('sewer', e.target.value)} />
          </FormField>
        </div>

        <FormField label="HOA / CC&Rs">
          <input value={form.hoaCcr} onChange={e => set('hoaCcr', e.target.value)} />
        </FormField>

        <FormField label="Waterfront / Stream / Moratorium Flags">
          <textarea rows={2} value={form.waterfrontStreamMoratorium} onChange={e => set('waterfrontStreamMoratorium', e.target.value)} />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <FormField label="Agent">
            <input value={form.agent} onChange={e => set('agent', e.target.value)} />
          </FormField>
          <FormField label="Brokerage">
            <input value={form.brokerage} onChange={e => set('brokerage', e.target.value)} />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <FormField label="Area">
            <select value={form.area} onChange={e => set('area', e.target.value)}>
              {AREA_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </FormField>
          <FormField label="Status">
            <select value={form.status} onChange={e => set('status', e.target.value)}>
              {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </FormField>
        </div>

        <FormField label="Source">
          <input value={form.source} onChange={e => set('source', e.target.value)} placeholder="Redfin, Zillow, Persinger Group, etc." />
        </FormField>

        <FormField label="Notes">
          <textarea rows={3} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Key findings, risks, next steps..." />
        </FormField>

        <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
          <button onClick={handleSubmit} style={{
            background: 'var(--accent)', color: 'var(--bg)', border: 'none',
            padding: '9px 20px', borderRadius: '4px', fontWeight: 700, fontSize: '0.85rem',
          }}>
            {editing ? 'Save Changes' : 'Add Listing'}
          </button>
          <button onClick={onClose} style={{
            background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)',
            padding: '9px 20px', borderRadius: '4px', fontWeight: 600, fontSize: '0.85rem',
          }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
