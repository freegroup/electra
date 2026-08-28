// Shared inline-SVG icons, vendored from Lucide (https://lucide.dev, ISC — see
// THIRD-PARTY-NOTICES.md). Strings, so there is no icon font, no CDN, no build
// step. Every path strokes in currentColor / fill:none, so the colour set in CSS
// flows straight through (light/dark via the theme tokens).
//
//   icon("user")  ->  "<svg …><path …/>…</svg>"
//
// CommonJS, nicht ESM: die Galerie rendert serverseitig und laeuft in Node.
// Webpack loest den named import der Browser-Apps gegen ein CJS-Modul auf, also
// bedient eine Datei beide Seiten - eine zweite Kopie waere die Alternative.

const PATHS = {
  check:    `<path d="M20 6 9 17l-5-5"/>`,
  clock:    `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
  x:        `<path d="M18 6 6 18"/><path d="M6 6l12 12"/>`,
  trash:    `<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`,
  undo:     `<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/>`,
  userPlus: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>`,
  bell:     `<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>`,
  user:     `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
  pencil:     `<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/><path d="m15 5 4 4"/>`,
  copy:       `<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>`,
  circleHelp: `<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>`,
  folder:     `<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>`,
  cornerUpLeft: `<polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>`,
  play:       `<polygon points="6 3 20 12 6 21 6 3"/>`,
  square:     `<rect width="18" height="18" x="3" y="3" rx="2"/>`,
  unplug:     `<path d="m19 5 3-3"/><path d="m2 22 3-3"/><path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/><path d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"/>`,
}

// The stroke width can be nudged up for small renderings, where Lucide's 2px
// grid line otherwise thins out.
function icon(name, { strokeWidth = 2 } = {}) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
         `stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">` +
         (PATHS[name] || "") + `</svg>`
}

module.exports = { icon, PATHS }
