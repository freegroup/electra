export default class UpdateSuccessDialog {

  constructor() {
  }

  show(version) {
    $('#updateSuccessDialog').modal('show')
    $("#updateSuccessDialog .reloadBtn").off("click").on("click", () => {
      $('#updateSuccessDialog').modal('hide')
      location.reload()
    })
  }
}
