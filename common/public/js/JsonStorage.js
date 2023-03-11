
class JsonLocalStorage{

    constructor( ) {
    }

    setItem(key, value) {
        console.log(arguments)
        return localStorage.setItem(key, JSON.stringify(value))
    }
    
    getItem(key) {
        return JSON.parse(localStorage.getItem(key))
    }

    removeItem(key) {
        return localStorage.removeItem(key)
    }

    key(index) {
        return localStorage.key(index)
    }
    
    clear() {
        return localStorage.clear()
    }

    get() {
        return localStorage.length
    }
}

let store = new JsonLocalStorage()
export default store
