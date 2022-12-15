import axios from 'axios'
import conf from "./Configuration"

class BackendStorage {

  /**
   * @constructor
   *
   */
  constructor() {
  }

  getFiles(path, type, scope) {
    return axios.get(conf[type][scope].list(path))
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
  }

}

let storage =  new BackendStorage()
export default storage
