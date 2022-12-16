

export default class State{

  constructor(app){
    // the data BEFORE any changes happens
    this.documentBefore = app.getDocument().clone()
    this.documentAfter = null
    this.pageIndex = this.documentBefore.index(app.view.getPage())
    this.app = app
  }

  undo(){
    this.documentAfter = this.app.getDocument().clone()
    this.app.setDocument(this.documentBefore,this.pageIndex)
  }

  redo(){
    this.app.setDocument(this.documentAfter, this.pageIndex)
  }
}
