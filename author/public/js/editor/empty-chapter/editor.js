import GenericEditor from '../editor'

export default class Editor extends GenericEditor{

  constructor(type="empty-chapter") {
    super(type)
  }

  /* public interface */
  render(section, mode){
    return `
    <div class="placeholderContainer">
      <div class="placeholderText">  
        <img src="../common/images/pencil.svg">
        <h1 data-i18n="editor.empty.header">${t("editor.empty.header")}</h1>
        <h2 data-i18n="editor.empty.description">${t("editor.empty.description")}</h2>
      </div>
      <div class="placeholderButtons">
        <button data-i18n="button.add_text"      data-index="0" data-type="wysiwyg"   class='sectionMenuInsertSection electra-button' >${t("button.add_text")}</button>
        <button data-i18n="button.add_cloze"     data-index="0" data-type="cloze"     class='sectionMenuInsertSection electra-button' >${t("button.add_cloze")}</button>
        <button data-i18n="button.add_flashcard" data-index="0" data-type="flashcard" class='sectionMenuInsertSection electra-button' >${t("button.add_flashcard")}</button>
        <button data-i18n="button.add_timing"    data-index="0" data-type="timing"    class='sectionMenuInsertSection electra-button' >${t("button.add_timing")}</button>
        <button data-i18n="button.add_brain"     data-index="0" data-type="brain"     class='sectionMenuInsertSection electra-button' >${t("button.add_brain")}</button>
        <button data-i18n="button.add_image"     data-index="0" data-type="image"     class='sectionMenuInsertSection electra-button' >${t("button.add_image")}</button>
      </div>
    </div>
    `
  }

  defaultContent(){
    return null
  }
}
