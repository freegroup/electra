
class Dialog {

  constructor() {
  }

  show() {
      $('#progressDialog').modal('show')
      this.text = $("#progressDialog .modal-body")
      this.bar = $('#progressDialog .progress-bar')
  }

  hide() {
    $('#progressDialog').modal('hide')
  }

  update(total, current, objectType){    
    this.text.html(`loading ${objectType} ${current}/${total}`)
    this.bar.attr("style", "width:" + ((100/total) * current).toString() + "%");
  }
}


let dialog = new Dialog()
export default dialog
