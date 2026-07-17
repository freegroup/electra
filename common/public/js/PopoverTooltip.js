// PopoverTooltip — a reusable speech-bubble popover for contextual info.
// Appears below an anchor element with an upward-pointing CSS arrow.
// Dismisses on outside-click or ESC. Fully generic — no app assumptions.
//
// Usage:
//   import PopoverTooltip from "../PopoverTooltip"
//   PopoverTooltip.show({ anchor: $el, title: "Private", body: "Only you..." })
//   PopoverTooltip.dismiss()

const PopoverTooltip = (() => {
  let $current = null

  function dismiss() {
    if ($current) { $current.remove(); $current = null }
    $(document).off("mousedown.popoverTooltip keydown.popoverTooltip")
  }

  function show({ anchor, title, body }) {
    dismiss()

    let $pop = $(`<div class="popoverTooltip">
      <strong class="popoverTooltipTitle"></strong>
      <p class="popoverTooltipBody"></p>
    </div>`)
    $pop.find(".popoverTooltipTitle").text(title)
    $pop.find(".popoverTooltipBody").text(body)
    $("body").append($pop)
    $current = $pop

    const POP_W = 210
    let r = (anchor instanceof $) ? anchor[0].getBoundingClientRect() : anchor.getBoundingClientRect()
    let anchorCx = r.left + r.width / 2
    let left = Math.min(Math.max(anchorCx - 22, 8), window.innerWidth - POP_W - 8)

    $pop.css({
      top: r.bottom + window.scrollY + 8,
      left: left + window.scrollX,
      width: POP_W,
    })

    // shift arrow tip to point at the anchor center regardless of clamping
    let arrowLeft = Math.min(Math.max(anchorCx - left, 12), POP_W - 20)
    $pop[0].style.setProperty("--arrow-left", arrowLeft + "px")

    $(document).on("mousedown.popoverTooltip", (e) => {
      if (!$(e.target).closest(".popoverTooltip").length) dismiss()
    })
    $(document).on("keydown.popoverTooltip", (e) => {
      if (e.key === "Escape") dismiss()
    })
  }

  return { show, dismiss }
})()

export default PopoverTooltip
