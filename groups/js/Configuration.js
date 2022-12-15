export default {
  appName: "Brainbox Groups",
  loginRedirect: "groups",


  sheet: {
      shared: {
        get:    file  => `../api/shared/sheet/get?filePath=${file}`,
        save:            `../api/shared/sheet/save`,
      },
      user: {
        list:  path => `../api/user/sheet/list?path=${path}`,
        get:   file => `../api/user/sheet/get?filePath=${file}`,
        image: file => `../common/images/files_markdown.svg`,
        folder:        `../api/user/sheet/folder`
      },

      global: {
        list:  path => `../api/global/sheet/list?path=${path}`,
        get:   file => `../api/global/sheet/get?filePath=${file}`,
        image: file => `../common/images/files_markdown.svg`,
        folder:        `../api/global/sheet/folder`
      }
  }
}
