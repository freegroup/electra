import toast from "../common/js/toast"

import recordStore from "./Records"

export default class Toolbar {

  constructor(app, permissions) {

    $(document)
      .on("click", "#editorSave:not(.disabled)", (event) => {
        $("small.error").removeClass("error")
        let record = {}
        $("#editor .content input[data-id], #editor .content select[data-id]").each((i, e) => {
          let element = $(e)
          let field = element.data("id")
          record[field] = element.val()
        })
        recordStore.save(record)
          .then((updatedRecord) => {
            toast("Saved")
            app.palette.update().then(()=>{
              $(".paletteItem[data-id='" + updatedRecord.id + "']").click()
            })
          })
          .catch((error) => {
            let status = error.response.status
            if (status === 400) {
              let field = error.response.data
              $("#" + field + "Help").html("required").addClass("error")
            }
          })
      })
      .on("click", "#editorDelete:not(.disabled)", (event) => {
        let id = $("#editor .content input[data-id='id']").val()
        recordStore.findById(id).then(record => {
          recordStore.delete(record).then(() => {
            toast("Deleted")
            app.view.setRecord({})
            app.palette.update()
          })
        })

      })
  }
}
