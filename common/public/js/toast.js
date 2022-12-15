

export default function(text){
  $("body").append($(`<div id="notificationToast">${text}</div>`))
  $("#notificationToast")
    .delay(900)
    .animate({ top: "+=20" }, 500)
    .delay(1500)
    .animate({ top: "-=20" }, 300, ()=>{
      $("#notificationToast").remove()
    })
}
