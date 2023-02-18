class Dialog {


  constructor() {
    $("body").append(`
            <div id="exportModeDialog" class="modal fade genericDialog" tabindex="-1">
            <div class="modal-dialog ">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="section">
                    <div class="sectionContent" data-type="markdown">
                      <h1 class="media-heading">Export Mode</h1>
                    </div>
                    The document contains learning sections, which are indicated by an 🎓 icon. When exporting the document as PDF, you can choose 
                    between the different document outputs you can have.
                  </div> 
                  <br>
                  <br>
                  <div class="button-container">
                    <button data-mode="worksheet" class="electra-button  exportPdfMode">As Worksheet<img src="../common/images/export_mode_worksheet.svg"></button>
                    <button data-mode="solution"  class="electra-button  exportPdfMode">As Solution<img src="../common/images/export_mode_solution.svg"></button>
                    <button data-mode="all"       class="electra-button  exportPdfMode">Worksheet + Solution<img src="../common/images/export_mode_all.svg"></button>
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="electra-button" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
    `)
  }

  /**
   */
  show() {
    return new Promise (( resolve, reject) => {
      $("#exportModeDialog").modal("show")

      $("#exportModeDialog .exportPdfMode").off('click').on("click", (event) => {
        let mode = $(event.target).data("mode")
        $('#exportModeDialog').modal('hide')
        resolve(mode)
      })
    })
  }
}


let dialog = new Dialog()
export default dialog
