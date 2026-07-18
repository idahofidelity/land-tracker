export const fmt = n => n == null ? '—' : '$' + Math.round(n).toLocaleString()
export const fmtDOM = n => n == null ? '—' : `${n}d`
