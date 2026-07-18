# Land Tracker — Kootenai County

Standalone listing tracker for vacant land parcels, seeded with 13 candidates
researched across Kootenai County (Bonanza Ranch, Black Rock, Spirit Lake,
Rathdrum, Harrison).

## Quick Start

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Deploy to Vercel

Push to a GitHub repo, then import it at vercel.com the same way as
`ni-homebuyer`. Auto-deploys on every push.

## Features

- **13 pre-loaded listings** from research — address, MLS#, price, zoning,
  utilities, HOA/CC&R status, agent contact, and risk notes for each
- **Status pipeline**: Researching → Contacted Agent → Verifying Details →
  Offer Made → Under Contract, plus Passed / Lost
- **Add/edit/delete** listings — everything persists to localStorage
- **Search & filter** by address, MLS#, agent, status, or area
- **Sort** by price, days on market, or date added
- **Stats bar** — total parcels, active count, price range, average price,
  breakdown by status

## Data Model

Each listing tracks: address, MLS number, price, days on market, lot size,
zoning, water status, sewer status, HOA/CC&Rs, waterfront/stream/moratorium
flags, agent, brokerage, area, source, status, and freeform notes.

## Stack

React 18 + Vite, zero external UI dependencies, localStorage persistence,
no backend required.
