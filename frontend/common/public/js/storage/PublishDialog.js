// Publish — an anonymous public link for a SPECIFIC version. Publishing is a
// per-version act: each version gets its own publicId, and unpublish makes that
// link return 410 Gone. Shows the current publish state and offers publish /
// copy-link / unpublish for the selected version.
//
// show(id, version?) -> Promise<{ url } | { ok:true }>
export default class PublishDialog {

  constructor(storage, conf) {
    this.storage = storage
    this.conf = conf

    $("body").append(`
      <div id="storagePublishDialog" class="modal fade genericDialog" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="media-heading" data-i18n="dialog.publish">${t("dialog.publish")}</h4>
            </div>
            <div class="modal-body">
              <p class="text-muted" data-i18n="dialog.publish_explain">${t("dialog.publish_explain")}</p>
              <div class="publishLinkRow" style="display:none">
                <input type="text" class="publishLink electra-input" readonly>
                <button class="electra-button copyLinkButton" data-i18n="button.copy">${t("button.copy")}</button>
              </div>
            </div>
            <div class="modal-footer">
              <button class="electra-button" data-dismiss="modal" data-i18n="common:button.close">${t("common:button.close")}</button>
              <button class="electra-button unpublishButton" style="display:none" data-i18n="button.unpublish">${t("button.unpublish")}</button>
              <button class="electra-button electra-primary publishButton" data-i18n="button.publish">${t("button.publish")}</button>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  _showLink(url) {
    let full = new URL(url, window.location.href).href
    $("#storagePublishDialog .publishLink").val(full)
    $("#storagePublishDialog .publishLinkRow").show()
    $("#storagePublishDialog .unpublishButton").show()
    $("#storagePublishDialog .publishButton").hide()
  }

  _showUnpublished() {
    $("#storagePublishDialog .publishLinkRow").hide()
    $("#storagePublishDialog .unpublishButton").hide()
    $("#storagePublishDialog .publishButton").show()
  }

  show(id, version) {
    return new Promise((resolve, reject) => {
      Mousetrap.pause()
      this._showUnpublished()
      $("#storagePublishDialog").modal("show")
      $("#storagePublishDialog").one("hide.bs.modal", () => Mousetrap.unpause())

      $("#storagePublishDialog .publishButton").off("click").on("click", () => {
        this.storage.publish(id, version).then((res) => {
          this._showLink(res.url)
          resolve(res)
        }, (err) => reject(err))
      })

      $("#storagePublishDialog .unpublishButton").off("click").on("click", () => {
        this.storage.unpublish(id, version).then((res) => {
          this._showUnpublished()
          resolve(res)
        }, (err) => reject(err))
      })

      $("#storagePublishDialog .copyLinkButton").off("click").on("click", () => {
        let el = $("#storagePublishDialog .publishLink")[0]
        el.select()
        try { document.execCommand("copy") } catch (e) { /* ignore */ }
      })
    })
  }
}
