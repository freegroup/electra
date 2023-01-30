
export default class Editor {

    constructor() {
        this.section = null
    }
  
    /* public interface */
    inject(section) {
      this.section = section
      return this
    }
  
    /* public interface */
    commit() {
      return new Promise((resolve, reject) => {
        resolve(this.section)
      })
    }
  
    /* public interface */
    cancel() {
      return new Promise((resolve, reject) => {
        resolve(this.section)
      })
    }
  
    /* public interface */
    render(whereToAppend, section){
    }
  
    defaultContent(){
      return null
    }
  
  }
  