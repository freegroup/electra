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

    // A deletion carries a snapshot of the deleted document, so its thumbnail
    // renders like any other review. Older tombstones have no snapshot - fall
    // back to a delete placeholder icon if the preview image fails to load.
    if (it.isDeletion) {
      let $thumb = $sheet.find(".factSheetThumb")
      let $img = $thumb.find("img")
      let toPlaceholder = () => {
        $thumb.addClass("factSheetThumbDeletion")
        $img.replaceWith(`<img class="reviewDeletionIcon" src="../common/images/toolbar_delete.svg">`)
      }
      if (!it.thumbnailUrl) toPlaceholder()
      else $img.on("error", toPlaceholder)
    }

    // A reviewer who already voted has no actions (admins keep the Accept
    // override, the author keeps Withdraw) — show a "voted" indicator instead.
    if (it.alreadyVoted && !it.isAdmin && !it.isAuthor) {
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
    // The author's own request: they may always withdraw it, and (as admin)
    // commit it now. No self approve/reject — Withdraw is the take-back.
    if (it.isAuthor) {
      out.push({ label: t("pane.review.withdraw"), onClick: (item) => this.opts.onWithdraw(item) })
      if (it.isAdmin) {
        out.push({ label: t("pane.review.accept"), primary: true, onClick: (item) => this.opts.onAccept(item) })
      }
      return out
    }
    // Admin of the scope: force-commit (Accept) overrides the vote threshold.
    // Reviewer: approve (a vote). Opening the document is via card click.
    if (it.isAdmin) {
      out.push({ label: t("pane.review.accept"), primary: true, onClick: (item) => this.opts.onAccept(item) })
    } else if (!it.alreadyVoted) {
      out.push({ label: t("pane.review.approve"), primary: true, onClick: (item) => this.opts.onApprove(item) })
    }
    // Reject ends the request; an admin may reject even after having voted.
    if (!it.alreadyVoted || it.isAdmin) {
      out.push({ label: t("pane.review.reject"), onClick: (item) => this.opts.onReject(item) })
    }
    return out
  }
}
