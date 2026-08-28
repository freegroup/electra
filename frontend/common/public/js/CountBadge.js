// CountBadge — a small numeric badge attached to any element (e.g. a nav tab)
// to show a count like "unread"/"pending". Generic and reusable: pass a
// selector or a jQuery/DOM element; the badge positions itself top-right of
// that host (the host should be position:relative — count_badge.less handles it).
//
// Usage:
//   const badge = new CountBadge("#review_tab")
//   const badge = new CountBadge("#review_tab", { variant: "onTint" })
//   badge.set(3)   // shows "3"
//   badge.set(0)   // hides the badge
//
// options.variant — an extra style hook. "onTint" renders a white badge with
// tint text, for hosts whose background is already the tint color.
export default class CountBadge {

  constructor(host, options = {}) {
    this.$host = host instanceof $ ? host : $(host)
    this.$badge = $(`<span class="countBadge"></span>`)
    if (options.variant === "onTint") this.$badge.addClass("countBadgeOnTint")
    this.$host.addClass("countBadgeHost").append(this.$badge)
    this.set(0)
  }

  // Update the number. 0 (or negative/NaN) hides the badge.
  set(count) {
    let n = Number(count)
    if (Number.isFinite(n) && n > 0) {
      this.$badge.text(n > 99 ? "99+" : n).show()
    } else {
      this.$badge.hide()
    }
  }
}
