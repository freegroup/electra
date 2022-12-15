const path = require('path')
const Octokat = require('octokat')
const GitHub = require('github-api')

let octokat = null
let repo = null
let gh = null

const GITHUB_ORG = process.env.GITHUB_ORG || 'thindexed'
const GITHUB_REPO = process.env.GITHUB_REPO || 'shapes'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || null
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'
const TYPE = { BLOB: 'blob', TREE: 'tree' };

if(GITHUB_TOKEN === null) {
  console.log('Upload of Shapes to the Repo is not possible due of missing GITHUB_TOKEN environment variable.')
}
else {
  octokat = new Octokat({ token: GITHUB_TOKEN});
  repo = octokat.repos(GITHUB_ORG, GITHUB_REPO);
  gh = new GitHub({ token: GITHUB_TOKEN}).getRepo(GITHUB_ORG, GITHUB_REPO)

}

function fetchHead() {
  return repo.git.refs.heads(GITHUB_BRANCH).fetch();
}

function fetchTree() {
  return fetchHead().then(function(commit) {
    head = commit;
    return repo.git.trees(commit.object.sha).fetch();
  });
}

module.exports = {

  commit: function(files, message) {
    return Promise.all(files.map(function(file) {
      return repo.git.blobs.create({
        content: file.content,
        encoding: 'base64'
      });
    })).then(function(blobs) {
      return fetchTree().then(function(tree) {
        return repo.git.trees.create({
          tree: files.map(function(file, index) {
            return {
              path: file.path,
              mode: '100644',
              type: 'blob',
              sha: blobs[index].sha
            };
          }),
          base_tree: tree.sha
        });
      });
    }).then(function(tree) {
      return repo.git.commits.create({
        message: message,
        tree: tree.sha,
        parents: [ head.object.sha ]
      });
    }).then(function(commit) {
      return repo.git.refs.heads(GITHUB_BRANCH).update({
        sha: commit.sha
      });
    });
  },

  delete: function(files, message) {
    return fetchTree()
      .then(function(tree) {
        return repo.git.trees.create({
          tree: files.map(function(file) {
            return {
              path: file.path,
              mode: '100644',
              type: 'blob',
              sha: null
            };
          }),
          base_tree: tree.sha
        });
      })
      .then((tree) => {
        return repo.git.commits.create({
          message: message,
          tree: tree.sha,
          parents: [ head.object.sha ]
        });
      })
      .then((commit) => {
        return repo.git.refs.heads(GITHUB_BRANCH).update({
          sha: commit.sha
        });
      })
  },

  renameFiles: function(fromFiles, toFiles, message) {
    return Promise.all(fromFiles.map((file) => {
      return repo.contents(file).fetch()
    })).then(function(infos) {
      return fetchTree().then(function(tree) {
        return repo.git.trees.create({
          tree: toFiles.flatMap(function(file, index) {
            return [
              {
              path: toFiles[index],
              mode: '100644',
              type: TYPE.BLOB,
              sha: infos[index].sha
            },{
              path: fromFiles[index],
              mode: '100644',
              type: TYPE.BLOB,
              sha: null
            }]
          }),
          base_tree: tree.sha
        });
      });
    }).then(function(tree) {
      return repo.git.commits.create({
        message: message,
        tree: tree.sha,
        parents: [ head.object.sha ]
      });
    }).then(function(commit) {
      return repo.git.refs.heads(GITHUB_BRANCH).update({
        sha: commit.sha
      });
    });
  },

  renameDirectory: function(fromDir, toDir, message) {
    let parentDir = path.dirname(fromDir)
    let parentSha = null
    let dirSha = null
    return new Promise ((resolve, reject) => {
      fetchTree()
      .then( (tree) => {
        parentSha = tree.sha
        return repo.contents(parentDir).fetch()
      }).then((infos) => {
        let item = infos.items.find( item => item.path===fromDir )
        if(!item) {
          throw "not found"
        }
        dirSha = item.sha
        return repo.git.trees(dirSha).fetch({recursive:true});
      }).then(({tree}) => {
        // create the "tree" with "sha:null" to delete all files below the old directory
        //
        const newTree = tree.filter(({ type }) => type === TYPE.BLOB)
                                .map(({ path, mode, type }) => ( { path: `${fromDir}/${path}`, sha: null, mode, type }));
        // create a tree with the sha of the delete directory....inherits the content.
        //
        newTree.push( {
          path: toDir,
          mode: '040000',
          type: TYPE.TREE,
          sha: dirSha
        })
        // create the new folder and delte the files in the old folder.
        //
        return repo.git.trees.create({
          tree: newTree,
          base_tree: parentSha
        });
      }).then((tree) => {
        return repo.git.commits.create({
          message: message,
          tree: tree.sha,
          parents: [ head.object.sha ]
        });
      }).then((commit) => {
        return repo.git.refs.heads(GITHUB_BRANCH).update({
          sha: commit.sha
        });
      }).then(function() {
        resolve()
      })
    })
  },

  deleteDirectory: function(directory, message) {
    let parentDir = path.dirname(directory)
    let parentSha = null
    return fetchTree().then( (tree) => {
      parentSha = tree.sha
      return repo.contents(parentDir).fetch()
    }).then(function(infos) {
      let item = infos.items.find( item => item.path===directory )
      if(!item) {
        throw "not found"
      }
      return repo.git.trees(item.sha).fetch({recursive:true});
    }).then(function({tree}) {
      // delete the files in the folder. Empty folders are deleted by github.
      //
      return repo.git.trees.create({
        tree: tree.filter(({ type }) => type === TYPE.BLOB)
                  .map(({ path, mode, type }) => ( { path: `${directory}/${path}`, sha: null, mode, type })),
        base_tree: parentSha
      });
    }).then(function(tree) {
      return repo.git.commits.create({
        message: message,
        tree: tree.sha,
        parents: [ head.object.sha ]
      });
    }).then(function(commit) {
      return repo.git.refs.heads(GITHUB_BRANCH).update({
        sha: commit.sha
      });
    })
  }
}
