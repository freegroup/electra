export default class Application {

    constructor(objectType) {
        this.currentFile = null
        this.hasUnsavedChanges = false
        this.permissions = null
        this.objectType = objectType
    }

    init (permissions) {
        this.permissions = permissions
        this.hasUnsavedChanges = false
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
                || (scope === "user" && (this.permissions[this.objectType].update || this.permissions[this.objectType].create))
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

    getParam (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]")
        let regexS = "[\\?&]" + name + "=([^&#]*)"
        let regex = new RegExp(regexS)
        let results = regex.exec(window.location.href)
        // the param isn't part of the normal URL pattern...
        //
        if (results === null) {
            // maybe it is part in the hash.
            //
            regexS = "[\\#]" + name + "=([^&#]*)"
            regex = new RegExp(regexS)
            results = regex.exec(window.location.hash)
            if (results === null) {
                return null
            }
        }
        return results[1]
    }
}