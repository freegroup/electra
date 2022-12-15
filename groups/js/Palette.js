import Hogan from "hogan.js"
import inputPrompt from "../common/js/InputPrompt"

import recordStore from "./Records"

export default class Palette {

  constructor(app, permissions) {
    $(document)
      .off("click", "#paletteElements .paletteItem")
      .on("click", "#paletteElements .paletteItem", (event) => {
        let element = $(event.target)
        let id = "" + element.data("id")
        recordStore.findById(id).then((record) => {
          $(".paletteItem").removeClass("selected")
          element.addClass("selected")
          app.view.setRecord(record)
        })
      })
      .off("click", "#joinGroupButton")
      .on("click", "#joinGroupButton", () => {
        inputPrompt.show("Join a group", "Enter the Join Code you received from the group owner", "", (value) => {
          recordStore.join(value).then(record => {
            this.update().then(() => {
              $(".paletteItem[data-id='" + record.id + "']").click()
            })
          })
        })
        $("#inputPromptDialog .okButton").html("Join")
      })
      .on("click", "#createGroupButton, #editorAdd:not(.disabled)", () => {
        app.view.setRecord({})
      })


    this.update()
  }

  update() {
    return recordStore.list().then((records) => {
      records = records.map(record => {
        return {...record, icon: record.role === "owner" ? "fa-university" : "fa-graduation-cap"}
      })
      let tmpl = Hogan.compile($("#recordsTemplate").html())
      let html = tmpl.render({records: records})
      $("#paletteElements").html(html)
    })
  }
}
