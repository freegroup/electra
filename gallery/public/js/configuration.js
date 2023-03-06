export default {
  application: "gallery",

  shapes: {
    jsonUrl:   "../shapes/index.json",
    backend: {
      user: {
        image: file => `../shapes/user/get?filePath=${file}`,
        file:  file => `../shapes/user/get?filePath=${file}`,
        save:          `../shapes/user/save`

      },
      global :{
        image: file => `../shapes/global/get?filePath=${file}`,
        file:  file => `../shapes/global/get?filePath=${file}`,
        save:          `../shapes/global/save`
      }
    }
  },
  sheets: {
    jsonUrl:   "../sheets/index.json",
    backend: {
      user: {
        image:  file => `../sheets/user/get?filePath=${file}`,
      },
  
      global:{
        image: file => `../sheets/global/get?filePath=${file}`,
      }
    },
  }
}
