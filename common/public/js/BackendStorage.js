import axios from 'axios'

class BackendStorage {

  constructor(conf) {
    this.conf = conf
  }

  getFiles(path, scope) {
    return axios.get(this.conf.backend[scope].list(path))
      .then((response) => {
        let files = response.data.files

        // sort the result
        // Directories are always on top
        //
        files.sort(function (a, b) {
          if (a.type === b.type) {
            if (a.name.toLowerCase() < b.name.toLowerCase())
              return -1
            if (a.name.toLowerCase() > b.name.toLowerCase())
              return 1
            return 0
          }
          if (a.type === "dir") {
            return -1
          }
          return 1
        })
        return files
      })
      .catch( exc => {
        console.log(exc)
        return []
      })
  }

  shareFile(fileName, scope) {
    return axios.get(this.conf.backend[scope].share(fileName))
  }

  saveFile(json, fileName, scope) {
    let data = {
      filePath: fileName,
      content: JSON.stringify(json, undefined, 2)
    }
    return axios.post(this.conf.backend[scope].save, data)
  }


  deleteFile(fileName, scope) {
    let data = {
      filePath: fileName
    }
    return axios.post(this.conf.backend[scope].delete, data)
  }


  createFolder(folderName, scope) {
    let data = {
      filePath: folderName
    }
    return axios.post(this.conf.backend[scope].folder, data)
  }

  loadUrl(url) {
    return axios.get(url)
      .then((response) => {
        return response.data
      })
  }

  sanitize(file) {
    let sanitize = require("sanitize-filename")
    file = sanitize(file)
    file = file.replace(this.conf.fileSuffix, "")
    // I don't like dots in the name to. Is not an security issue...but I don't like it
   return file.replace(RegExp("[.]", "g"), "")
  }
}

export default conf => new BackendStorage(conf)
