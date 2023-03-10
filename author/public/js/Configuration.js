export default {
  fileSuffix: ".sheet",
  fileNew: "NewDocument",
  application: "author",


  backend: {
    shared: {
      get:   sha  => `../sheets/shared/get?sha=${sha}`
    },

    user: {
      list:   path  => `../sheets/user/list?path=${path}`,
      get:    file  => `../sheets/user/get?filePath=${file}`,
      share:           `../sheets/user/share`,
      image:  file  => `../common/images/files_markdown.svg`,
      delete:          `../sheets/user/delete`,
      rename:          `../sheets/user/rename`,
      save:            `../sheets/user/save`,
      folder:          `../sheets/user/folder`
    },

    global:{
      list:   path  => `../sheets/global/list?path=${path}`,
      get:    file  => `../sheets/global/get?filePath=${file}`,
      share:           `../sheets/global/share`,
      image:  file  => `../common/images/files_markdown.svg`,
      delete:          `../sheets/global/delete`,
      rename:          `../sheets/global/rename`,
      save:            `../sheets/global/save`,
      folder:          `../sheets/global/folder`
    }
  },

  shapes: {
    jsUrl:     "../shapes/index.js",
    jsonUrl:   "../shapes/index.json",
    user: {
      image:  file => `../shapes/user/get?filePath=${file}`,
    },
    global :{
      image:  file => `../shapes/global/get?filePath=${file}`,
    },
  },

  color: {
    high: "#C21B7A",
    low:  "#0078F2"
  }
}
