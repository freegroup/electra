
export default function(){
    let md = require('markdown-it')()
    md.use(require("markdown-it-asciimath"))
    md.use(require('markdown-it-container'), "info")
    md.use(require('markdown-it-link-target'))

    return md
}