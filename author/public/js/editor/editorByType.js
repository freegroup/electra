import MarkdownEditor from "./markdown/editor"
import BrainEditor from "./brain/editor"
import ClozeEditor from "./cloze/editor"
import ImageEditor from "./image/editor"
import FlashCardEditor from "./flashcard/editor"
import PlaceholderEditor from "./placeholder/editor"
import WysiwygEditor from "./wysiwyg/editor"
import UnknownEditor from "./editor"

let unknownEditor = new UnknownEditor()
let editors = [
  new MarkdownEditor(),
  new ClozeEditor(),
  new FlashCardEditor(),
  new BrainEditor(),
  new PlaceholderEditor(),
  new WysiwygEditor(),
  new ImageEditor()
]

export default function getByType(type) {
  return editors.find( editor => editor.type ===type) ?? unknownEditor
}
  
  
  