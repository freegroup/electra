import AppFrame from "./ApplicationFrame"
import AuthorPage from "./AuthorPage"
import AppSwitch from "./AppSwitch"
import LngSwitch from "./LngSwitch"
import Userinfo from "./Userinfo"
import Files from "./FilesScreen"

export default class Application extends AppFrame{

    constructor(objectType) {
        super()
        this.currentFile = null
        this.hasUnsavedChanges = false
        this.objectType = objectType
    }

    init (permissions, conf) {
        super.init(permissions)
        this.hasUnsavedChanges = false

        this.userinfo = new Userinfo(permissions)
        this.appSwitch = new AppSwitch(permissions)
        this.lngSwitch = new LngSwitch(permissions)
        this.filePane = new Files(this, conf, permissions[this.objectType])
        this.readmePane = new AuthorPage("#readme", `readme/en/${conf.application}/README.sheet`)
        this.readmePane.render()


        // Show the user an alert if there are unsaved changes
        //
        window.onbeforeunload = () => {
            return this.hasUnsavedChanges ? t("common:message.changes_get_lost") : undefined;
        }

        // listen on the history object to load files
        //
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.id === 'editor') {
                this.load(event.state.file, event.state.scope)
            }
        })
    }

    hasModifyPermissionForCurrentFile () {
        let scope = this.currentFile?.scope
        return (
            this.currentFile !== null
            &&
            ((scope === "global" && (this.permissions[this.objectType].global.update || this.permissions[this.objectType].global.create))
          || (scope === "user"   && (this.permissions[this.objectType].update        || this.permissions[this.objectType].create))
            )
        )
    }


    stackChanged (event) {
        if (event.isPreChangeEvent()) {
            return // silently
        }
        
        if (event.getStack().canUndo()) {
            $("#editorFileSave div").addClass("highlight")
            this.hasUnsavedChanges = true
        }
    }
}