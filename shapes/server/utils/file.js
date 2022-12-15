const mv = require('mv');
const fs = require('fs-extra')
const glob = require("glob")
const path = require('path')
const makeDir = require('make-dir');
const sanitize = require("./sanitize-filepath");

// Generic file operations for "brains" and "shapes"
//
module.exports = {

  listFiles: function (baseDir, subDir, res=null) {
    return new Promise((resolve, reject)=>{
      let listDir = path.join(baseDir, subDir)

      if (listDir !== sanitize(listDir)) {
        res?.status(403).send('Unable to read image')
        return reject(`'sanitize' directory name (${listDir}) is different from original directory name`)
      }
  
      // a directory must always end with a trailing "/"
      if(!listDir.endsWith(path.sep))
        listDir = listDir+path.sep
  
      // a directory must always end with a trailing "/"
      if(!subDir.endsWith(path.sep))
        subDir = subDir+path.sep
  
      // check that the normalize path is the same as the concatenated. It is possible that these are not the same
      // if the "subDir" contains dots like "/dir1/dir2/../../". It is a file path attack via API calls
      if (listDir !== path.normalize(listDir)) {
        res?.status(403).send('Unable to list file')
        return reject(`'${listDir}' path with dots`)
      }
  
      glob(listDir + "*", {}, (error, files) => {
        if(error) {
          reject(error)
        }
        else {
          res?.setHeader('Content-Type', 'application/json')
          res?.send(JSON.stringify({
            files: files.map(function (f) {
              let isDir = fs.lstatSync(f).isDirectory()
              return {
                name: path.basename(f),
                filePath: f.replace(baseDir, ""),
                folder: subDir,
                type: isDir ? "dir" : "file",
                dir: isDir
              }
            })
          }))
          resolve()
        }
      })
    })
  },


  getBinary: function (baseDir, subDir, res=null) {
    return new Promise((resolve, reject)=>{
      let file = path.join(baseDir, subDir)

      if (file !== sanitize(file)) {
        res?.status(403).send('Unable to read image')
        return reject(`sanitized file path '${file}' is different thant original file path`)
      }
  
      if (file !== path.normalize(file)) {
        res?.status(403).send('Unable to read image')
        return reject(`normalized path of '${file}' is different than original`)
      }
  
      if(!file.startsWith(baseDir)){
        res?.status(403).send('Unable to read image')
        return reject(`'${file}' isn't below base directory`)
      }
  
      if (!fs.existsSync(file)) {
        res?.status(404).send('Not found')
        return reject(`'${file}' not found`)
      }

      res?.sendFile(file)
      return resolve()
    })
  },


  /**
   * Rename a file or directory.
   *
   * @param baseDir
   * @param fromRelativePath
   * @param toRelativePath
   * @param res
   */
  rename: function (baseDir, fromRelativePath, toRelativePath, res=null) {
    return new Promise( (resolve, reject) => {
      try {
        toRelativePath = sanitize(toRelativePath)

        let fromAbsolutePath = path.join(baseDir, fromRelativePath)
        let toAbsolutePath = path.join(baseDir, toRelativePath)
        let fromAbsoluteDir = path.dirname(fromAbsolutePath)
        let toAbsoluteDir = path.dirname(toAbsolutePath)
    
        if (fromAbsolutePath !== sanitize(fromAbsolutePath)) {
          res?.status(403).send('Unable to rename image')
          return reject(`sanitized filepath '${fromAbsolutePath}' is different than the original file`)

        }
    
        // "from" must be exists
        if (!fs.existsSync(fromAbsolutePath)) {
          res?.status(403).send('Unable to rename file')
          return reject(`'${fromAbsolutePath}' not found`)
        }
    
        // check that the normalize path is the same the concatenated. It is possible the these are not the same
        // if the "from" contains dots like "/dir1/dir2/../../". It is a file path attack via API calls
        if (fromAbsolutePath !== path.normalize(fromAbsolutePath)) {
          res?.status(403).send('Unable to rename file')
          return reject(`normalized path of '${fromAbsolutePath}' is not equals to original filepath`)
        }
    
        if (toAbsolutePath !== path.normalize(toAbsolutePath)) {
          res?.status(403).send('Unable to rename file')
          return reject(`normalized path of '${toAbsolutePath}' is not equals to original filepath`)
        }
    
        // "from" and "to" directory must have the same parent directory. It is not allowed to move a directory out
        // of the tree with a rename operation
        if (fromAbsoluteDir !== toAbsoluteDir) {
          res?.status(403).send('Unable to rename file')
          return reject("moving files out of parent directory is not allowed")
        }
    
        if (fs.existsSync(toAbsolutePath)) {
          res?.status(403).send('Unable to rename file')
          return reject(`'${toAbsolutePath}' not found`)
        }
    
        mv(fromAbsolutePath, toAbsolutePath, err => {
          if (err) {
            reject(err)
          }
          else {
            let isDir = fs.lstatSync(toAbsolutePath).isDirectory()
            res?.send({
              name: path.basename(toRelativePath),
              filePath: toRelativePath,
              folder:  path.dirname(toRelativePath),
              type: isDir ? "dir" : "file",
              dir: isDir
            })
            resolve({fromRelativePath, toRelativePath, isDir})
          }
        })
      }
      catch(error){
        return reject(error)
      }
    })
  },


  /**
   * Delete a file or directory
   *
   * @param dataDirectory
   * @param fileRelativePath
   * @param res
   */
  delete: function (dataDirectory, fileRelativePath, res=null) {
    return new Promise( (resolve, reject) => {
      fileRelativePath = sanitize(fileRelativePath).replace(/^\//,"") // remove starting "/"
      let fileAbsolutePath = path.join(dataDirectory, fileRelativePath)
      // check that the normalize path is the same as the concatenated. It is possible that these are not the same
      // if the "subDir" contains dots like "/dir1/dir2/../../". It is a file path attack via API calls
  
      if (fileAbsolutePath !== sanitize(fileAbsolutePath)) {
        res?.status(403).send('Unable to delete file')
        reject(`sanitized filepath '${fileAbsolutePath}' is different than the original file`)
        return
      }
  
      if (fileAbsolutePath !== path.normalize(fileAbsolutePath)) {
        res?.status(403).send('Unable to delete file')
        reject(`normalized path of '${fileAbsolutePath}' is not equals to original filepath`)
        return
      }
  
      fileAbsolutePath = path.normalize(fileAbsolutePath)
      if(!fileAbsolutePath.startsWith(dataDirectory)){
        res?.status(403).send('Unable to delete image')
        reject(`'${fileAbsolutePath}' isn't below data directory`)
        return
      }
  
      fs.unlink(fileAbsolutePath, err => {
        if (err) {
          // maybe a directory
          fs.removeSync(fileAbsolutePath)
        }
        resolve(fileRelativePath)
        res?.send('true')
      })
    })
  },



  createFolder: function (baseDir, subDir, res=null) {
    return new Promise((resolve, reject) => {
      subDir = sanitize(subDir).replace(/\/. /g,"") // remove every "/". Do not create directory paths
      console.log(subDir)
      let directoryAbsolutePath = path.join(baseDir, subDir)

      if (directoryAbsolutePath !== sanitize(directoryAbsolutePath)) {
        res?.status(403).send('Unable to create folder')
        reject(`sanitized filepath '${directoryAbsolutePath}' is different than the original file`)
        return
      }
 
      // check that the normalize path is the same as the concatenated. It is possible that these are not the same
      // if the "subDir" contains dots like "/dir1/dir2/../../". It is a file path attack via API calls
      if (directoryAbsolutePath !== path.normalize(directoryAbsolutePath)) {
        res?.status(403).send('Unable to create folder')
        reject(`normalized path of '${directoryAbsolutePath}' is not equals to original filepath`)
        return
      }
  
      directoryAbsolutePath = path.normalize(directoryAbsolutePath)
      if(!directoryAbsolutePath.startsWith(baseDir)){
        res?.status(403).send('Unable to delete image')
        reject(`'${directoryAbsolutePath}' isn't below data directory`)
        return
      }

      console.log("Create directory: ", directoryAbsolutePath)
      makeDir(directoryAbsolutePath)
        .then(() => {
          res?.send({
            name: path.basename(subDir),
            filePath: subDir,
            folder:  path.dirname(subDir),
            type: "dir",
            dir: true
          })
          resolve(subDir)
        })
        .catch(( error) => {
          res?.status(403).send('Unable to create directory')
          reject(error)
        })
    })
  },


  writeFile: async function (baseDir, fileRelativePath, content, res=null) {
    return new Promise(async(resolve, reject) => {
      fileRelativePath =  sanitize(fileRelativePath)

      let fileAbsolutePath = path.join(baseDir, fileRelativePath)
      let fileDirectory = path.dirname(fileAbsolutePath)+path.sep
  
      // check that the normalize path is the same as the concatenated. It is possible that these are not the same
      // if the "subDir" contains dots like "/dir1/dir2/../../". It is a file path attack via API calls
      if (fileAbsolutePath !== path.normalize(fileAbsolutePath)) {
        res?.status(403).send('Unable to write file')
        return reject(`normalized path of '${fileAbsolutePath}' is not equals to original filepath`)
      }
  
      if (fileDirectory !== path.normalize(fileDirectory)) {
        res?.status(403).send('Unable to write file')
        reject(`normalized path of '${fileDirectory}' is not equals to original filepath`)
        return
      }
  
      // normalize path must be below the parent directory
      //
      if(!fileDirectory.startsWith(baseDir)){
        res?.status(403).send('Unable to write file')
        return reject(`'${fileDirectory}' isn't below data directory`)
      }
  
      if (!fs.existsSync(fileDirectory)) {
        await makeDir(fileDirectory)
      }
  
      console.log("Write File: ", fileAbsolutePath)
      fs.writeFile(fileAbsolutePath, content, err => {
        if (err)  {
          reject(err)
          res?.status(403).send('Unable to write file')
        }
        else {
          resolve(fileRelativePath)
          res?.setHeader('Content-Type', 'application/json')
          res?.send({
            name: path.basename(fileRelativePath),
            filePath: fileRelativePath,
            folder:  path.dirname(fileRelativePath),
            type: "file",
            dir: false
          })
        }
      })
    })
  }
}

