import MarkdownEditor from "./markdown/editor"
import BrainEditor from "./brain/editor"
import ClozeEditor from "./cloze/editor"
import ImageEditor from "./image/editor"
import FlipCardEditor from "./flipcard/editor"
import PlaceholderEditor from "./placeholder/editor"
import UnknownEditor from "./editor"

let unknownEditor = new UnknownEditor()
let editors = [
  new MarkdownEditor(),
  new ClozeEditor(),
  new FlipCardEditor(),
  new BrainEditor(),
  new PlaceholderEditor(),
  new ImageEditor()
]

export default function getByType(type) {
    return editors.find( editor => editor.type ===type) ?? unknownEditor
  }
  
  
  