import textPrompt from "../common/js/TextPrompt"
import fileSelectDialog from "./FileSelectDialog"
import axios from "axios"

let recordStore = require("./Records").default

import Hogan from "hogan.js";

export default class View {

  constructor(app, permissions) {
    this.app = app
    this.permissions = permissions

    this.showWelcomeMessage()
  }

  setRecord(record) {
    // no record
    if (record === null) {
      $("#editorSave").addClass("disabled")
      $("#editorDelete").addClass("disabled")
      this.showWelcomeMessage()
    }
    // existing record
    else if (record.id) {

      $("#editorSave").removeClass("disabled")
      $("#editorDelete").removeClass("disabled")

      let tmpl = Hogan.compile(record.role === "owner" ? $("#recordOwnerTemplate").html() : $("#recordMemberTemplate").html());
      let html = tmpl.render({record: record})
      $("#editor .content").html(html)

      $(".showJoinToken").off("click").on("click", () => {
        textPrompt.show(record.joinToken)
      })

      $("#editor .inviteGroupMember").off("click").on("click", () => {
        this.generateEMailInvitation(record)
      })

      $("#editor .deleteGroupAssignment").off("click").on("click", (item) => {
        let id = $(item.target).data("id")
        recordStore.delAssignment(record, id).then(() => {
          $(`#paletteElements .paletteItem[data-id='${record.id}']`).click()
        })
      })

      $("#editor .addGroupAssignment").off("click").on("click", () => {
        fileSelectDialog.show("sheet", (scope, filename) => {
          // Read the document
          axios.get(conf.sheet[scope].get(filename))
            .then((response) => {
              let doc = response.data
              return axios.post(conf.sheet.shared.save, {content: JSON.stringify(doc, undefined, 2)})
            })
            .then((response) => {
              let data = {
                scope: scope,
                type: "sheet",
                shared: response.data.filePath,
                name: filename
              }
              return recordStore.addAssignment(record, data)
            })
            .then(() => {
              $(`#paletteElements .paletteItem[data-id='${record.id}']`).click()
            })
        })
      })
    }
    // new record
    else {
      $("#editorSave").removeClass("disabled")
      $("#editorDelete").removeClass("disabled")

      let tmpl = Hogan.compile($("#recordCreateTemplate").html());
      let html = tmpl.render({record: record})
      $("#editor .content").html(html)
    }
  }

  showWelcomeMessage() {
    let tmpl = $("#welcomeTemplate").html()
    $("#editor .content").html(tmpl)
  }

  generateEMailInvitation(group){
    let currentUrl = window.location.href.split('?')[0]
    let segments =  currentUrl.split("/")
    segments.pop()
    if(currentUrl.endsWith("/")){
      segments.pop()
    }
    let url = segments.join("/") +"/groups"
    let subject = encodeURIComponent('Group join code for BrainBox')
    let emailBody = encodeURIComponent(
      `Hello, 


This is an invitation to join a working group '${group.name}' on BrainBox. Click the link to go
to brainbox to join.

URL:    ${url}
Code:   ${group.joinToken}

First log in with your existing user account. Then click on 'join group' and enter the code 
you received. Afterwards you can see which work tasks have been saved for you. 

Everyone can follow this link to join this group. Share this link only with people who should 
really belong to the working group. 

Thanks 


Your Brainbox Administrator
`)
    window.open("mailto:?subject="+subject+"&body="+emailBody)

  }
}


