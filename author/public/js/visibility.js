import renderMode from "./renderMode"

// Which sheet a cell lands on. An "all" cell appears on both; a restricted cell
// only on its own sheet. EDITOR shows everything - the author sees the whole
// document, the badge marks the restricted cells.
export default function visibleIn(section, mode) {
  let visibility = section.visibility ?? "all"
  if (mode === renderMode.EDITOR || visibility === "all") {
    return true
  }
  return visibility === mode
}
