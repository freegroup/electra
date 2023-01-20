
class Dialog {

  constructor() {
  }

  show() {
      $('#progressDialog').modal('show')
  }

  hide() {
    $('#progressDialog').modal('hide')
  }

  update(total, current, objectType){    
    $("#progressDialog .modal-body").html(`loading ${objectType} ${current}/${total}`)
    $('#progressDialog .progress-bar').attr("style", "width:" + ((100/total) * current).toString() + "%");

  }
}


let dialog = new Dialog()
export default dialog
