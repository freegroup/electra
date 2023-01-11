export default class FileNew {

  /**
   * @constructor
   *
   */
  constructor() {
  }

  /**
   * @method
   *
   * Open the file picker and load the selected file.<br>
   *
   * @param {Function} successCallback callback method if the user select a file and the content is loaded
   * @param {Function} errorCallback method to call if any error happens
   *
   * @since 4.0.0
   */
  show() {
    $("#fileNewDialog .githubFileName").val("NewDocument")
    $('#fileNewDialog').on('shown.bs.modal', function () {
      $(this).find('input:first').focus()
    })
    $("#fileNewDialog").modal("show")

    $("#fileNewDialog .okButton").on("click", function () {
      var name = $("#fileNewDialog .githubFileName").val()
      $('#fileNewDialog').modal('hide')
      app.fileNew(undefined, name)
    })
  }
}
