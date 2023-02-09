const PDFDocument = require('pdf-lib').PDFDocument
const die = require("../utils/die")
const PORT_INGRESS = process.env.PORT_INGRESS || die("missing env variable PORT_INGRESS");
const AUTHOR_URL =  `http://localhost:${PORT_INGRESS}/author`

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

module.exports = {
    init: function (app) {

        app.get('/sheets/pdf', nocache, (req, res) => {
            let sha = req.query.sha      
            let mode = req.query.mode ?? "worksheet"     
            let all = false
            let header = mode==="solution"?"Solution Pages":""
            
            let {render} = require("../converter/pdf")
            // if "all" are requested, we start with the "worksheet" and append the "solution" later on
            //
            if(mode==="all"){
                mode = "worksheet"
                all = true
                header = mode==="solution"?"Solution Pages":"Worksheet Pages"
            }

            render(`${AUTHOR_URL}/page.html?sha=${sha}&mode=${mode}`, header).then(pdf => {
                if (all){
                    return render(`${AUTHOR_URL}/page.html?sha=${sha}&mode=solution`, "Solution Pages").then(async pdf2 => {
                        var pdfsToMerge = [pdf, pdf2]
                        const mergedPdf = await PDFDocument.create(); 
                        for (const pdfBytes of pdfsToMerge) { 
                            const pdf = await PDFDocument.load(pdfBytes); 
                            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                            copiedPages.forEach((page) => {
                                mergedPdf.addPage(page); 
                            }); 
                        } 
                        return Buffer.from(await mergedPdf.save()); 
                    })      
                }
                return pdf
            })
            .then( pdf =>{
              res.set({'Content-Type': 'application/pdf', 'Content-Length': pdf.length})
              res.send(pdf)
            })
        })
    }
}
