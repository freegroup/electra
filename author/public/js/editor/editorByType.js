import MarkdownEditor from "./markdown/editor"
import BrainEditor from "./brain/editor"
import ClozeEditor from "./cloze/editor"
import ImageEditor from "./image/editor"
import WysiwygEditor from "./wysiwyg/editor"
import TimingEditor from "./timing/editor"
import EmptyChapterEditor from "./empty-chapter/editor"
import UnknownEditor from "./unknown/editor"

let unknownEditor = new UnknownEditor()
let editors = [
  new MarkdownEditor(),
  new ClozeEditor(),
  new BrainEditor(),
  new WysiwygEditor(),
  new TimingEditor(),
  new EmptyChapterEditor(),
  new ImageEditor()
]

export default function getByType(type) {
  return editors.find( editor => editor.type ===type) ?? unknownEditor
}
  
  
  