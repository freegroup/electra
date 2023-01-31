import MarkdownEditor from "./markdown/editor"
import BrainEditor from "./brain/editor"
import ClozeEditor from "./cloze/editor"
import ImageEditor from "./image/editor"
import UnknownEditor from "./editor"

let unknownEditor = new UnknownEditor()
let editors = {
  markdown: new MarkdownEditor(),
  cloze: new ClozeEditor(),
  brain: new BrainEditor(),
  image: new ImageEditor()
}

export default function getByType(type) {
    return editors[type] ?? unknownEditor
  }
  
  
  