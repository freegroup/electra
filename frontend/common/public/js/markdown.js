
export default function(){
    let md = require('markdown-it')()
    // vendored copy - see the header there for why it is not an npm dependency
    md.use(require("./markdown-it-asciimath"))
    md.use(require('markdown-it-container'), "info")
    md.use(require('markdown-it-link-target'))

    return md
}