import Page from "./page"

export default class Document {

  constructor(content) {
    this.pages = content ? content.pages.map((page => new Page(page))) : [new Page()]
  }

  get(index) {
    return this.pages[index]
  }

  index(page) {
    return this.pages.findIndex((obj => obj.id === page.id))
  }

  getPages() {
    return this.pages
  }

  setPages(pages) {
    this.pages = pages
    return this
  }

  getPage(id) {
    return this.pages.find((obj => obj.id === id))
  }

  removePage(page) {
    let index = this.pages.findIndex((obj => obj.id === page.id))
    return this.pages.splice(index, 1);
  }

  push(page) {
    this.pages.push(page)
    return this
  }

  toJSON() {
    return {pages: this.pages.map(page => page.clone().toJSON())}
  }

  clone() {
    return new Document(this.toJSON())
  }

  get length() {
    return this.pages.length
  }
}
