

export default function(text, delay=900){
  $("body").append($(`<div id="notificationToast">${text}</div>`))
  $("#notificationToast")
    .delay(delay)
    .animate({ top: "+=40" }, 500)
    .delay(1500)
    .animate({ top: "-=50" }, 300, ()=>{
      $("#notificationToast").remove()
    })
}
