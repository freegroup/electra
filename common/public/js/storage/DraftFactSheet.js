import FileFactSheet from "./FileFactSheet"
import PopoverTooltip from "../PopoverTooltip"

// DraftFactSheet — draft document card. Adds:
//   status icon — lock (private) or globe (personal copy), bottom-right of thumb
//   overlayBadge — "Reviewpunkte X/Y" pill top-right while approval is open
//   actions      — Revert / Delete / Promote as ghost buttons in the button bar
export default class DraftFactSheet extends FileFactSheet {

  overlayBadge() {
    let it = this.item
    if (!it.inReview) return null
    return {
      cls: "factSheetOverlayReview",
      text: `${it.reviewHave} / ${it.reviewNeed}`,
      popover: ($anchor) => PopoverTooltip.show({
        anchor: $anchor,
        title: t("pane.draft.review_points"),
        body: t("pane.draft.review_points_explain", {
          have: it.reviewHave,
          need: it.reviewNeed,
        }),
      }),
    }
  }

  badges() { return [] }

  render() {
    let $sheet = super.render()
    let it = this.item
    let $thumb = $sheet.find(".factSheetThumb")

    const makeIcon = (src, titleKey, bodyKey) => {
      let $icon = $(`<img class="factSheetStatusIcon" src="${src}">`)
      $icon.on("click", (e) => {
        e.stopPropagation()
        PopoverTooltip.show({
          anchor: $icon,
          title: t(titleKey),
          body: t(bodyKey),
        })
      })
      return $icon
    }

    if (it.isPersonal) {
      $thumb.append(makeIcon(
        "../common/images/status_draft_private.svg",
        "pane.draft.kind_personal",
        "pane.draft.kind_personal_explain"
      ))
    } else if (it.isPersonalCopy) {
      $thumb.append(makeIcon(
        "../common/images/status_draft_copy.svg",
        "pane.draft.kind_personal_copy",
        "pane.draft.kind_personal_copy_explain"
      ))
    }
    return $sheet
  }

  actions() {
    let it = this.item
    let out = []
    if (it.canRevert) {
      out.push({ label: t("button.revert"), onClick: (item) => this.opts.onRevert(item) })
    }
    if (it.canDelete) {
      out.push({ label: t("common:button.delete"), onClick: (item) => this.opts.onDelete(item) })
    }
    if (it.canPromote) {
      out.push({ label: t("button.promote"), primary: true, onClick: (item) => this.opts.onPromote(item) })
    }
    return out
  }
}
