let md = require('markdown-it')()
md.use(require('./question_plugin'))

import MarkdownEditor from '../markdown/editor'

export default class Editor extends MarkdownEditor {

  constructor(type="cloze") {
    super(type)
    this.md = md
  }


  defaultContent() {
    return  `### Lückentext
Erstellen Sie weitere [[Lücken]] mit Hilfe von doppelten eckigen 
Klammern (*Mac:* \`Alt + 5\` und \`6\`. *Windows:* \`AltGr + 7\` und \`8\`). 

Texte der Lücken werden nur auf dem Lösungsblatt angezeigt.`
  }
}
