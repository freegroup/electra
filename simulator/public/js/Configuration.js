//
export default {
  fileSuffix: ".brain",
  fileNew: "NewCircuit",
  application: "simulator",

  backend: {

    shared: {
      get:    file  => `../brains/shared/get?sha=${file}`
    },

    user: {
      list:   path => `../brains/user/list?path=${path}`,
      get:    file => `../brains/user/get?filePath=${file}`,
      image:  file => `../brains/user/image?filePath=${file}`,
      delete:         `../brains/user/delete`,
      rename:         `../brains/user/rename`,
      share:          `../brains/user/share`,
      save:           `../brains/user/save`,
      folder:         `../brains/user/folder`
    },

    global:{
      list:   path => `../brains/global/list?path=${path}`,
      get:    file => `../brains/global/get?filePath=${file}`,
      image:  file => `../brains/global/image?filePath=${file}`,
      delete:         `../brains/global/delete`,
      rename:         `../brains/global/rename`,
      share:          `../brains/global/share`,
      save:           `../brains/global/save`,
      folder:         `../brains/global/folder`
    }
  },

  shapes: {
    jsUrl:     "../shapes/index.js",
    jsonUrl:   "../shapes/index.json",
    user: {
      image: file => `../shapes/user/get?filePath=${file}`, // deprecated
      file:  file => `../shapes/user/get?filePath=${file}`
    },
    global :{
      image: file => `../shapes/global/get?filePath=${file}`, // deprecated
      file:  file => `../shapes/global/get?filePath=${file}`
    }
  }
};
