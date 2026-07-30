export default {
  fileSuffix: ".sheet",
  fileNew: "NewDocument",
  application: "author",

  // Generic Finder API served by the app's own backend (sheets). The frontend
  // never talks to /database — sheets is the intelligent layer. Presence of
  // this block switches the app onto StorageScreen + StorageClient.
  database: {
    base: "../sheets",
    fileSuffix: ".sheet"
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
