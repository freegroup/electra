import FileFactSheet from "../storage/FileFactSheet"
import ReviewInfoDialog from "../ReviewInfoDialog"
import PopoverTooltip from "../PopoverTooltip"

// ReviewFactSheet — a FactSheet card for one review queue entry.
// Thumbnail top, title + workspace/author in body, score pill top-right,
// Open / Approve / Reject buttons pinned in the button bar at the bottom.
// Clicking the card body opens the review version (same as Open button).
export default class ReviewFactSheet extends FileFactSheet {

  overlayBadge() {
    let it = this.item
    return {
      cls: "factSheetOverlayReview",
      text: `${it.approvedScore} / ${it.requiredScore}`,
      popover: ($anchor) => PopoverTooltip.show({
        anchor: $anchor,
        title: t("pane.review.col_score"),
        body: t("pane.draft.review_points_explain", {
          have: it.approvedScore,
          need: it.requiredScore,
        }),
      }),
    }
  }

  badges() {
    let it = this.item
    let out = []
    if (it.isDeletion) {
      out.push({ cls: "reviewFactSheetBadgeDeletion", text: t("pane.review.deletion") })
    }
    return out
  }

  render() {
    let $sheet = super.render()
    let it = this.item
    $sheet.addClass("reviewFactSheet")

    // A reviewer who already voted has no actions (admins keep the Accept
    // override) — show a "voted" indicator instead of empty buttons.
    if (it.alreadyVoted && !it.isAdmin) {
      $sheet.find(".factSheetButtonBar")
        .removeClass("factSheetButtonBarEmpty")
        .append(`<span class="reviewVotedIndicator">✓ ${t("pane.review.voted")}</span>`)
    }

    // author line with globe icon — click shows the author's change comment
    let $author = $(`<div class="factSheetAuthor"></div>`)
    let $authorText = $(`<span class="reviewAuthorName"></span>`).text(it.author || "")
    let $icon = $(`<img class="reviewAuthorIcon" src="../common/images/status_comment.svg">`)
    $icon.on("click", (e) => {
      e.stopPropagation()
      ReviewInfoDialog.show({
        title: t("pane.review.change_comment_title"),
        intro: t("pane.review.change_comment_intro", { author: it.author, doc: it.title }),
        body: it.description || t("pane.review.no_change_comment"),
      })
    })
    $author.append($authorText).append($icon)
    $sheet.find(".factSheetWorkspace").after($author)
    return $sheet
  }

  actions() {
    let it = this.item
    let out = []
    // Admin of the scope: force-commit (Accept) overrides the vote threshold.
    // Reviewer: approve (a vote). Both may reject while they haven't voted yet.
    // Opening the document is via card click, not a button.
    if (it.isAdmin) {
      out.push({ label: t("pane.review.accept"), primary: true, onClick: (item) => this.opts.onAccept(item) })
    } else if (!it.alreadyVoted) {
      out.push({ label: t("pane.review.approve"), primary: true, onClick: (item) => this.opts.onApprove(item) })
    }
    if (!it.alreadyVoted) {
      out.push({ label: t("pane.review.reject"), onClick: (item) => this.opts.onReject(item) })
    }
    return out
  }
}
