// Merkt sich, welche Kapitel der Navigation aufgeklappt sind.
//
// Das Auf- und Zuklappen selbst macht der Browser - die Kapitel stehen als
// <details> im HTML und funktionieren ohne eine Zeile JavaScript. Hier kommt
// nur dazu, dass der Zustand einen Seitenwechsel ueberlebt: ohne das klappt bei
// jedem Klick auf ein Kapitel die ganze Navigation wieder zusammen.
//
// Das Kapitel, in dem gerade gelesen wird, kommt bereits mit `open` aus dem
// Generator und wird hier nie zugeklappt - wo man steht, soll sichtbar bleiben,
// auch wenn man dieses Kapitel beim letzten Besuch geschlossen hatte.

const KEY = "electra.book.toc"

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? new Set(JSON.parse(raw)) : null
  } catch (e) {
    // Privater Modus, volle Quota, abgeschaltete Speicherung - alles Faelle, in
    // denen die Navigation trotzdem bedienbar bleiben muss.
    return null
  }
}

function save(open) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...open]))
  } catch (e) { /* siehe oben */ }
}

export default function initToc() {
  const chapters = [...document.querySelectorAll(".toc details[data-chapter]")]
  if (!chapters.length) return

  const stored = load()
  if (stored) {
    for (const d of chapters) {
      // `open` aus dem Generator bedeutet "hier stehen wir gerade" und gewinnt.
      if (d.open) continue
      d.open = stored.has(d.dataset.chapter)
    }
  }

  const remember = () => save(new Set(chapters.filter((d) => d.open).map((d) => d.dataset.chapter)))
  for (const d of chapters) d.addEventListener("toggle", remember)
}
