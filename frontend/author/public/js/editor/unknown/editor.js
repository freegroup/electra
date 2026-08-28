import GenericEditor from '../editor'
import { icon } from "../../../../common/js/icons"

// Fallback for a section whose type no longer exists - e.g. a legacy "flashcard"
// still sitting in a stored document. Instead of an empty cell it shows a plain
// placeholder; the cell keeps its normal delete button, so the user can remove it.
export default class Editor extends GenericEditor{

  constructor(type="unknown") {
    super(type)
  }

  /* public interface */
  render(section, mode){
    let type = section?.type ?? "?"
    return `
    <div class="placeholderContainer">
      <div class="placeholderText brokenBlock">
        <div class="brokenIcon">${icon("unplug")}</div>
        <h1 data-i18n="editor.unknown.header">${t("editor.unknown.header")}</h1>
        <h2 data-i18n="editor.unknown.description" data-i18n-options='${JSON.stringify({ type })}'>${t("editor.unknown.description", { type })}</h2>
      </div>
    </div>
    `
  }

  startEditAfterInsert(section){
    return false
  }

  // A dead legacy cell - no sheet steering, the user only deletes it.
  hasVisibilityControl(){
    return false
  }

  defaultContent(){
    return null
  }
}
