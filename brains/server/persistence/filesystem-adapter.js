const mv = require('mv');
const fs = require('fs-extra')
const glob = require("glob")
const path = require('path')
const makeDir = require('make-dir');
const sanitize = require("../utils/sanitize-filepath");
const fsPromises = require('fs').promises;
const { Readable } = require('stream');
const PersistenceInterface = require('./persistence-interface');

class FileSystemError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Helper to convert object/string/buffer to stream
function toStream(data) {
    if (typeof data === 'object' && !(data instanceof Buffer)) {
        return Readable.from(JSON.stringify(data));
    }
    return Readable.from(data);
}

class FileSystemAdapter extends PersistenceInterface {

  /**
   * @param {Object} config - Configuration object
   * @param {function} config.globalDataDir - Function returning absolute path to global data dir
   * @param {function} config.sharedDataDir - Function returning absolute path to shared data dir
   * @param {function} config.userDataDir - Function accepting request-like object (or hash) and returning absolute path to user data dir
   */
  constructor(config) {
      super();
      this.config = config;
  }

  getName() {
      return "FileSystemAdapter";
  }

  // Resolve tenant to absolute path
  _resolveTenantPath(tenant) {
      if (tenant === 'global') {
          return this.config.globalDataDir();
      }
      if (tenant === 'shared') {
          return this.config.sharedDataDir();
      }
      if (tenant.startsWith('user:')) {
          // Mock a request object because configuration.js expects req.get("x-hash")
          const hash = tenant.split(':')[1];
          return this.config.userDataDir({ get: () => hash });
      }
      throw new FileSystemError(`Unknown tenant: ${tenant}`, 400);
  }

  listFiles(tenant, subDir) {
    return new Promise((resolve, reject)=>{
      let baseDir;
      try {
        baseDir = this._resolveTenantPath(tenant);
      } catch (e) {
        return reject(e);
      }

      let listDir = path.join(baseDir, subDir)

      if (listDir !== sanitize(listDir)) {
        return reject(new FileSystemError(`'sanitize' directory name (${listDir}) is different from original directory name`, 403))
      }
  
      // a directory must always end with a trailing "/"
      if(!listDir.endsWith(path.sep))
        listDir = listDir+path.sep
  
      // a directory must always end with a trailing "/"
      if(!subDir.endsWith(path.sep))
        subDir = subDir+path.sep
  
      // check that the normalize path is the same as the concatenated.
      if (listDir !== path.normalize(listDir)) {
        return reject(new FileSystemError(`'${listDir}' path with dots`, 403))
      }

      if(!listDir.startsWith(baseDir)){
        return reject(new FileSystemError(`'${listDir}' path is not below base dir`, 403))
      }
  
      glob(listDir + "*", {}, (error, files) => {
        if(error) {
          reject(error)
        }
        else {
          const result = {
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
          }
          resolve(toStream(result))
        }
      })
    })
  }

  getJSONFile(tenant, subDir) {
    return new Promise((resolve, reject) => {
      let baseDir;
      try {
        baseDir = this._resolveTenantPath(tenant);
      } catch (e) {
        return reject(e);
      }
      let file = path.join(baseDir, subDir)
    
      if (file !== sanitize(file)) {
        return reject(new FileSystemError(`'sanitize' filepath (${file}) is different from the original`, 403))
      }
  
      if (file !== path.normalize(file)) {
        return reject(new FileSystemError(`'${file}' path with dots`, 403))
      }
  
      if(!file.startsWith(baseDir)){
        return reject(new FileSystemError(`'${file}' path is not below base dir`, 403))
      }
  
      if (!fs.existsSync(file)) {
        return reject(new FileSystemError(`'${file}' not found`, 404))
      }
  
      try {
        let readStream = fs.createReadStream(file)
        return resolve(readStream)
      } catch (exc) {
        return reject(exc)
      }
    })
  }

  getBinaryFile(tenant, subDir) {
    return new Promise((resolve, reject)=>{
      let baseDir;
      try {
        baseDir = this._resolveTenantPath(tenant);
      } catch (e) {
        return reject(e);
      }
      let file = path.join(baseDir, subDir)

      if (file !== sanitize(file)) {
        return reject(new FileSystemError(`sanitized file path '${file}' is different thant original file path`, 403))
      }
  
      if (file !== path.normalize(file)) {
        return reject(new FileSystemError(`normalized path of '${file}' is different than original`, 403))
      }
  
      if(!file.startsWith(baseDir)){
        return reject(new FileSystemError(`'${file}' isn't below base directory`, 403))
      }
  
      if (!fs.existsSync(file)) {
        return reject(new FileSystemError(`'${file}' not found`, 404))
      }

      let pngFile = file.replace(".shape",".png").replace(".brain",".png")
      if(fs.existsSync(pngFile)) {
        return resolve(fs.createReadStream(pngFile))
      }
      fs.readFile(file)
      .then( data => {
        let json = JSON.parse(data)
        if (!json.image) {
          return reject(new FileSystemError(`'${file}' not found`, 404))
        }
        
        let base64data = json.image.replace(/^data:image\/png;base64,/, '')
        let img = Buffer.from(base64data, 'base64')
        return resolve(toStream(img))
      }).catch( err => {
        return reject(new FileSystemError(err.message, 404))
      })
    })
  }


  rename(tenant, fromRelativePath, toRelativePath) {
    return new Promise( (resolve, reject) => {
      let baseDir;
      try {
        baseDir = this._resolveTenantPath(tenant);
      } catch (e) {
        return reject(e);
      }
      console.log("Rename: ", baseDir, fromRelativePath, toRelativePath)
      try {
        toRelativePath = sanitize(toRelativePath)

        let fromAbsolutePath = path.join(baseDir, fromRelativePath)
        let toAbsolutePath = path.join(baseDir, toRelativePath)
        let fromAbsoluteDir = path.dirname(fromAbsolutePath)
        let toAbsoluteDir = path.dirname(toAbsolutePath)
    
        if (fromAbsolutePath !== sanitize(fromAbsolutePath)) {
          return reject(new FileSystemError(`sanitized from filepath '${fromAbsolutePath}' is different than the original file`, 403))
        }
    
        // "from" must be exists
        if (!fs.existsSync(fromAbsolutePath)) {
          return reject(new FileSystemError(`original file '${fromAbsolutePath}' not found`, 403))
        }
    
        // check that the normalize path is the same the concatenated. 
        if (fromAbsolutePath !== path.normalize(fromAbsolutePath)) {
          return reject(new FileSystemError(`normalized path of '${fromAbsolutePath}' is not equals to original filepath`, 403))
        }
    
        if (toAbsolutePath !== path.normalize(toAbsolutePath)) {
          return reject(new FileSystemError(`normalized path of '${toAbsolutePath}' is not equals to original filepath`, 403))
        }
    
        // "from" and "to" directory must have the same parent directory.
        if (fromAbsoluteDir !== toAbsoluteDir) {
          return reject(new FileSystemError("moving files out of parent directory is not allowed", 403))
        }
    
        if (fs.existsSync(toAbsolutePath)) {
          return reject(new FileSystemError(`Target file '${toAbsolutePath}' already exists`, 403))
        }
    
        mv(fromAbsolutePath, toAbsolutePath, err => {
          if (err) {
            reject(err)
          }
          else {
            let isDir = fs.lstatSync(toAbsolutePath).isDirectory()
            resolve(toStream({
              name: path.basename(toRelativePath),
              filePath: toRelativePath,
              folder:  path.dirname(toRelativePath),
              type: isDir ? "dir" : "file",
              dir: isDir,
              fromRelativePath, 
              toRelativePath
            }))
          }
        })
      }
      catch(error){
        return reject(error)
      }
    })
  }


  copy(fromTenant, fromFilePath, toTenant, toFilePath) {
    let fromDir, toDir;
    try {
        fromDir = this._resolveTenantPath(fromTenant);
        toDir = this._resolveTenantPath(toTenant);
    } catch (e) {
        return Promise.reject(e);
    }
    console.log("Copy: ",fromDir, fromFilePath, toDir, toFilePath)
    let fromAbsolutePath = path.join(fromDir, fromFilePath)
    let toAbsolutePath = path.join(toDir, toFilePath)

    if (fromAbsolutePath !== sanitize(fromAbsolutePath)) {
      return Promise.reject(new Error(`sanitized from filepath '${fromAbsolutePath}' is different than the original file`))
    }

    // "from" must be exists
    if (!fs.existsSync(fromAbsolutePath)) {
        return Promise.reject(new Error(`original file '${fromAbsolutePath}' not found`))
    }

    if (fromAbsolutePath !== path.normalize(fromAbsolutePath)) {
        return Promise.reject(new Error(`normalized path of '${fromAbsolutePath}' is not equals to original filepath`))
    }

    if (toAbsolutePath !== path.normalize(toAbsolutePath)) {
        return Promise.reject(new Error(`normalized path of '${toAbsolutePath}' is not equals to original filepath`))
    }

    if (fs.existsSync(toAbsolutePath)) {
        return Promise.reject(new Error(`Target file '${toAbsolutePath}' already exists`))
    }

    return fsPromises.copyFile(fromAbsolutePath, toAbsolutePath)
        .then(() => Promise.resolve(toStream({ filePath: toFilePath })))
  }


  delete(tenant, fileRelativePath) {
    return new Promise( (resolve, reject) => {
      let dataDirectory;
      try {
        dataDirectory = this._resolveTenantPath(tenant);
      } catch (e) {
        return reject(e);
      }
      fileRelativePath = sanitize(fileRelativePath).replace(/^\//,"") // remove starting "/"
      let fileAbsolutePath = path.join(dataDirectory, fileRelativePath)
  
      if (fileAbsolutePath !== sanitize(fileAbsolutePath)) {
        return reject(new FileSystemError(`sanitized filepath '${fileAbsolutePath}' is different than the original file`, 403))
      }
  
      if (fileAbsolutePath !== path.normalize(fileAbsolutePath)) {
        return reject(new FileSystemError(`normalized path of '${fileAbsolutePath}' is not equals to original filepath`, 403))
      }
  
      fileAbsolutePath = path.normalize(fileAbsolutePath)
      if(!fileAbsolutePath.startsWith(dataDirectory)){
        return reject(new FileSystemError(`'${fileAbsolutePath}' isn't below data directory`, 403))
      }
  
      fs.unlink(fileAbsolutePath, err => {
        if (err) {
          // maybe a directory
          try {
            fs.removeSync(fileAbsolutePath)
          } catch(e) {
             return reject(e)
          }
        }
        resolve(toStream("true"))
      })
    })
  }


  createFolder(tenant, subDir) {
    return new Promise((resolve, reject) => {
      let baseDir;
      try {
        baseDir = this._resolveTenantPath(tenant);
      } catch (e) {
        return reject(e);
      }
      subDir = sanitize(subDir).replace(/\/. /g,"") // remove every "/". Do not create directory paths
      console.log(subDir)
      let directoryAbsolutePath = path.join(baseDir, subDir)

      if (directoryAbsolutePath !== sanitize(directoryAbsolutePath)) {
        return reject(new FileSystemError(`sanitized filepath '${directoryAbsolutePath}' is different than the original file`, 403))
      }
 
      if (directoryAbsolutePath !== path.normalize(directoryAbsolutePath)) {
        return reject(new FileSystemError(`normalized path of '${directoryAbsolutePath}' is not equals to original filepath`, 403))
      }
  
      directoryAbsolutePath = path.normalize(directoryAbsolutePath)
      if(!directoryAbsolutePath.startsWith(baseDir)){
        return reject(new FileSystemError(`'${directoryAbsolutePath}' isn't below data directory`, 403))
      }

      console.log("Create directory: ", directoryAbsolutePath)
      makeDir(directoryAbsolutePath)
        .then(() => {
          resolve(toStream({
            name: path.basename(subDir),
            filePath: subDir,
            folder:  path.dirname(subDir),
            type: "dir",
            dir: true
          }))
        })
        .catch(( error) => {
          reject(new FileSystemError(error.message, 403))
        })
    })
  }


  async writeFile(tenant, fileRelativePath, content) {
    return new Promise(async(resolve, reject) => {
      let baseDir;
      try {
        baseDir = this._resolveTenantPath(tenant);
      } catch (e) {
        return reject(e);
      }
      fileRelativePath =  sanitize(fileRelativePath)

      let fileAbsolutePath = path.join(baseDir, fileRelativePath)
      let fileDirectory = path.dirname(fileAbsolutePath)+path.sep
  
      if (fileAbsolutePath !== path.normalize(fileAbsolutePath)) {
        return reject(new FileSystemError(`normalized path of '${fileAbsolutePath}' is not equals to original filepath`, 403))
      }
  
      if (fileDirectory !== path.normalize(fileDirectory)) {
        return reject(new FileSystemError(`normalized path of '${fileDirectory}' is not equals to original filepath`, 403))
      }
  
      // normalize path must be below the parent directory
      if(!fileDirectory.startsWith(baseDir)){
        return reject(new FileSystemError(`'${fileDirectory}' isn't below data directory`, 403))
      }
  
      if (!fs.existsSync(fileDirectory)) {
        await makeDir(fileDirectory)
      }
  
      console.log("Write File: ", fileAbsolutePath)
      return fs.writeFile(fileAbsolutePath, content)
      .then( () => {
        console.log("file written")
        return resolve(toStream({
            name: path.basename(fileRelativePath),
            filePath: fileRelativePath,
            folder:  path.dirname(fileRelativePath),
            type: "file",
            dir: false
          }))
      })
      .catch( err => {
        return reject(new FileSystemError(err.message, 403))
      })
    })
  }
}

// Export the class, not instance
module.exports = FileSystemAdapter;
