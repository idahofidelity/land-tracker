import React, { useState, useMemo } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { SEED_LISTINGS } from './data/seed'
import StatsBar from './components/StatsBar'
import Toolbar from './components/Toolbar'
import ListingCard from './components/ListingCard'
import ListingForm from './components/ListingForm'

export default function App() {
  const [listings, setListings] = useLocalStorage('land-tracker-listings', SEED_LISTINGS)
  const [filters, setFilters] = useState({ search: '', status: '', area: '' })
  const [sortBy, setSortBy] = useState('price_asc')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const handleSave = (listing) => {
    setListings(prev => {
      const exists = prev.some(l => l.id === listing.id)
      return exists ? prev.map(l => l.id === listing.id ? listing : l) : [...prev, listing]
    })
    setFormOpen(false)
    setEditing(null)
  }

  const handleDelete = (id) => {
    if (confirm('Delete this listing?')) {
      setListings(prev => prev.filter(l => l.id !== id))
    }
  }

  const handleStatusChange = (id, status) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  const handleEdit = (listing) => {
    setEditing(listing)
    setFormOpen(true)
  }

  const handleAddNew = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const filtered = useMemo(() => {
    let result = [...listings]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(l =>
        l.address?.toLowerCase().includes(q) ||
        l.mlsNumber?.toLowerCase().includes(q) ||
        l.agent?.toLowerCase().includes(q)
      )
    }
    if (filters.status) result = result.filter(l => l.status === filters.status)
    if (filters.area) result = result.filter(l => l.area === filters.area)

    result.sort((a, b) => {
      if (sortBy === 'price_asc') return (a.price || Infinity) - (b.price || Infinity)
      if (sortBy === 'price_desc') return (b.price || 0) - (a.price || 0)
      if (sortBy === 'dom_desc') return (b.daysOnMarket || 0) - (a.daysOnMarket || 0)
      if (sortBy === 'dateAdded_desc') return (b.dateAdded || '').localeCompare(a.dateAdded || '')
      return 0
    })

    return result
  }, [listings, filters, sortBy])

  return (
    <div className="app-shell" style={{ minHeight: '100vh', padding: '20px 24px 60px' }}>
      <header style={{
        borderBottom: '2px solid var(--accent)', paddingBottom: '16px', marginBottom: '20px',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', letterSpacing: '3px', color: 'var(--accent)', lineHeight: 1 }}>
          Land Tracker
        </div>
        <div style={{ color: 'var(--muted)', fontSize: '0.78rem', letterSpacing: '1.2px', textTransform: 'uppercase', marginTop: '4px' }} className="mono">
          Kootenai County, ID · VA/FHA Buildable Parcels
        </div>
      </header>

      <StatsBar listings={listings} />
      <Toolbar filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy} onAddNew={handleAddNew} />

      <div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
            No listings match your filters.
          </div>
        ) : (
          filtered.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>

      {formOpen && (
        <ListingForm
          editing={editing}
          onSave={handleSave}
          onClose={() => { setFormOpen(false); setEditing(null) }}
        />
      )}
    </div>
  )
}
