export default class Filter {

  constructor(name) {
    this.NAME = name
    this.colorPicker = null
    this.cssScope = this.NAME.replace(/[.]/g, "_")
    this.containerId= this.cssScope+"_container"
  }


  apply(figure, attributes) {
  }

  onInstall(figure) {
  }

  insertPane(figure, $parent) {

  }

  removePane() {
  }

  getPersistentAttributes(relatedFigure) {
    var memento = {}
    memento.name = this.NAME

    return memento
  }

  setPersistentAttributes(relatedFigure, memento) {
  }
}




