
export default class Editor {

    constructor(type) {
        this.section = null
        this.type = type 
    }
  
    getType() {
        return this.type
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
  