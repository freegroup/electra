export default {
  appName: "Gallery",

  sheets: {
    user: {
      list:   path  => `../sheets/user/list?path=${path}`,
      get:    file  => `../sheets/user/get?filePath=${file}`,
      share:           `../sheets/user/share`,
      image:  file  => `../common/images/files_markdown.svg`
    },

    global:{
      list:   path  => `../sheets/global/list?path=${path}`,
      get:    file  => `../sheets/global/get?filePath=${file}`,
      share:           `../sheets/global/share`,
      image:  file  => `../common/images/files_markdown.svg`
    }
  },

  shapes: {
    jsonUrl:   "../shapes/index.json",
    user: {
      image:  file => `../shapes/user/get?filePath=${file}`,
      file:  file => `../shapes/user/get?filePath=${file}`

    },
    global :{
      image:  file => `../shapes/global/get?filePath=${file}`,
      file:  file => `../shapes/global/get?filePath=${file}`

    },
  }
}
