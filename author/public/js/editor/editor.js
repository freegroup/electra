
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
      $(".sections .activeSection").addClass("editMode")
      this.section = section
      return this
    }
  
    /* public interface */
    commit() {
      $(".sections .activeSection").removeClass("editMode")
      return new Promise((resolve, reject) => {
        resolve(this.section)
      })
    }
  
    /* public interface */
    cancel() {
      $(".sections .activeSection").removeClass("editMode")
      return new Promise((resolve, reject) => {
        resolve(this.section)
      })
    }
  
    /* public interface */
    render(section, mode){
      return ""
    }
  
    startEditAfterInsert(section){
      // start editing if the user insert a new section
      return true;
    }

    /**
     * Called if the user selects the section and the editor is responsible to handle this content
     * 
     * @param {Object} section 
     */
    onSelect(section){
      //console.log("Select", this.type, section)
    }

    onUnselect(section){
      //console.log("unselect", this.type, section)
    }

    getMenu(section){
      return ""
    }

    hasLearningContent(){
      return false
    }

    defaultContent(){
      return null
    }
  
  }
  