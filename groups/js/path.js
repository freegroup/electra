
// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;


function posixSplitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
}

function dirname(path) {
    var result = posixSplitPath(path),
        root = result[0],
        dir = result[1];
  
    if (!root && !dir) {
      // No dirname whatsoever
      return '.';
    }
  
    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }
  
    return root + dir;
  };

export default { 
    dirname: dirname 
}