// The distribute dialog: pick one or more scopes and deliver the current draft
// into each (horizontal share). Mirrors PromoteDialog's contract — resolves with
// { targets: [scopeRef…], description } on Distribute, rejects with false when
// dismissed. The candidate scopes are decided server-side (personal workspaces
// and the doc's own scope are already excluded); this dialog just presents them.
// An optional note travels to the reviewers of any target that needs approval.
class Dialog {

  constructor() {
    $("body").append(`
      <div id="distributeDialog" class="modal fade genericDialog" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="media-heading">${t("button.distribute")}</h4>
            </div>
            <div class="modal-body">
              <p class="distributeExplain"></p>
              <div class="controlWithHeader">
                <label>${t("dialog.distribute_targets_label")}</label>
                <div class="distributeTargets"></div>
                <p class="distributeEmpty" style="display:none">${t("dialog.distribute_empty")}</p>
              </div>
              <div class="controlWithHeader distributeNote">
                <label>${t("dialog.distribute_description_label")}</label>
                <textarea class="distributeDescription" rows="3" maxlength="2000"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button class="electra-button" data-dismiss="modal">${t("common:button.cancel")}</button>
              <button class="electra-button electra-primary okButton">${t("button.distribute")}</button>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  // { scopes, explain } — scopes = [{ scopeRef, name, label, path }], already
  // filtered to valid distribute targets by the server.
  show({ scopes, explain }) {
    return new Promise((resolve, reject) => {
      let handled = false
      let $dlg = $("#distributeDialog")
      let targets = scopes || []

      $dlg.find(".distributeExplain").text(explain || "")
      $dlg.find(".distributeDescription").val("")

      let $list = $dlg.find(".distributeTargets").empty()
      let $ok = $dlg.find(".okButton")

      if (targets.length === 0) {
        $dlg.find(".distributeEmpty").show()
        $dlg.find(".distributeNote").hide()
        $ok.hide()
      } else {
        $dlg.find(".distributeEmpty").hide()
        $dlg.find(".distributeNote").show()
        $ok.show()
        for (let s of targets) {
          let $row = $(`
            <label class="distributeTarget">
              <input type="checkbox" value="${s.scopeRef}">
              <span class="distributeTargetLabel"></span>
              <span class="distributeTargetPath"></span>
            </label>
          `)
          $row.find(".distributeTargetLabel").text(s.label || s.name || String(s.scopeRef))
          $row.find(".distributeTargetPath").text(s.path || "")
          $list.append($row)
        }
      }

      const selected = () =>
        $list.find("input:checked").map((_i, el) => el.value).get()

      const syncOk = () => $ok.prop("disabled", selected().length === 0)
      syncOk()
      $list.off("change").on("change", "input", syncOk)

      $dlg.off("hide.bs.modal").on("hide.bs.modal", () => {
        // fires for OK, cancel and ESC alike — only reject when not resolved.
        if (!handled) { handled = true; reject(false) }
      })

      $ok.off("click").on("click", () => {
        let picked = selected()
        if (picked.length === 0) return
        handled = true
        resolve({ targets: picked, description: $dlg.find(".distributeDescription").val().trim() })
        $dlg.modal("hide")
      })

      $dlg.modal("show")
    })
  }
}

let dialog = new Dialog()
export default dialog
