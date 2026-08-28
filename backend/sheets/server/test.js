const github = require("./utils/github")


github.hash("data/global/lessons/deutsch/digitaltechnik/Grundlagen/Digitaltechnik-Aufgaben-Logik.sheet")
.then(result => {
    console.log(result)
    github.getBlob(result.sha)
    .then( file => {
        console.log(Buffer.from(file.content, 'base64').toString("utf-8"))
    })
})