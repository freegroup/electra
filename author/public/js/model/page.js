const shortid = require('short-uuid')
import editorByType from "../editor/editorByType"

export default class Page {

  /**
   * @constructor
   *
   */
  constructor( json) {
    this.sections = json?.sections ?? []
    this.name = json?.name ?? "First Page"
    this.id = json?.id ?? shortid.generate()
  }

  get(id){
    let section = this.sections.find( value => value.id===id)
    if(section){
      return section
    }
    // the searched section could be a children of a top level section. This could happen e.g. in FlipCard
    //
    let childSections = this.sections.flatMap( value => value.content?.front ? [value.content.front, value.content.back]:[])

    return  childSections.find( value => value.id===id)
  }

  parent(section){
    return this.sections.find( value => value.content?.front?.id===section.id || value.content?.back?.id===section.id)
  }

  set(section){
    let index = this.sections.findIndex((obj => obj.id === section.id))
    if(index>=0){
      this.sections[index] = section
    }
    else{
      console.log("record not found", section)
    }
  }

  get length(){
    return this.sections.length
  }

  index(id){
    return this.sections.findIndex((obj => obj.id === id))
  }

  remove(id){
    let index = this.sections.findIndex((obj => obj.id === id))
    return this.sections.splice(index, 1);
  }

  add(section, index){
    if(typeof index === "number"){
      this.sections.splice(index,0,section)
    }
    else {
      this.sections.push(section)
    }
  }

  move(fromIndex, toIndex){
    this.sections.splice(toIndex, 0, this.sections.splice(fromIndex, 1)[0]);
  };

  hasLearningContent(){
    return this.sections.some( section => editorByType(section.type).hasLearningContent() )
  }

  forEach(callback){
    return this.sections.forEach(callback)
  }

  toJSON(){
    return {
      id: this.id,
      name:this.name,
      sections: this.sections
    }
  }

  clone(){
    return new Page(JSON.parse(JSON.stringify(this.toJSON())))
  }
}
