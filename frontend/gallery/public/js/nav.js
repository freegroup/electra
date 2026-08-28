// Progressive enhancement for gallery navigation.
//
// Every link in the gallery is a real <a href> to a full server-rendered page,
// so crawlers and a no-JS browser get complete pages and normal navigation.
// Where JS runs, this intercepts gallery-internal clicks, fetches the target,
// and swaps ONLY the content pane and the tree's active branch - no full reload,
// no flicker of the header or tree. The URL is kept honest via history.pushState
// so back/forward and sharing work.

function isInternalLink(a) {
  // Action links (PDF, author) open in their own tab - leave them alone.
  if (a.target && a.target !== "" && a.target !== "_self") return false
  let url
  try {
    url = new URL(a.href, window.location.href)
  } catch (e) {
    return false
  }
  if (url.origin !== window.location.origin) return false
  return url.pathname.startsWith("/gallery/")
}

function swap(url, push) {
  return fetch(url, { headers: { "X-Requested-With": "gallery-nav" } })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.text()
    })
    .then((html) => {
      const doc = new DOMParser().parseFromString(html, "text/html")
      const newContent = doc.querySelector(".galleryContent")
      const curContent = document.querySelector(".galleryContent")
      if (!newContent || !curContent) throw new Error("no content pane")

      curContent.innerHTML = newContent.innerHTML

      const newTree = doc.querySelector(".galleryTree")
      const curTree = document.querySelector(".galleryTree")
      if (newTree && curTree) curTree.innerHTML = newTree.innerHTML

      document.title = doc.title
      const canonical = doc.querySelector("link[rel=canonical]")
      const curCanonical = document.querySelector("link[rel=canonical]")
      if (canonical && curCanonical) curCanonical.setAttribute("href", canonical.getAttribute("href"))

      if (push) window.history.pushState({ gallery: true }, "", url)

      // Re-localize the freshly injected chrome (data-i18n) for the current
      // language; the folder names and worksheet body are real content already.
      if ($.fn && $.fn.localize) {
        $(curContent).localize()
        if (curTree) $(curTree).localize()
      }
      window.scrollTo(0, 0)
    })
    .catch(() => {
      // Anything unexpected: fall back to a normal full navigation.
      window.location.href = url
    })
}

function onClick(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const a = e.target.closest ? e.target.closest("a") : null
  if (!a || !isInternalLink(a)) return
  e.preventDefault()
  swap(a.href, true)
}

export default function initNav() {
  document.addEventListener("click", onClick)
  window.addEventListener("popstate", () => swap(window.location.href, false))
}
