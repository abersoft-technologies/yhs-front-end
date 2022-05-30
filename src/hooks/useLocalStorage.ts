export const useLocalStorage = (option: "get" | "set" | "remove", storageType: "local" | "session", key: string, value?: string) => {
    if(storageType === "local") {
        if(option === "set" && value) {
            return localStorage.setItem(key, value)
        }
        if(option === "get") {
            const returnedItem = localStorage.getItem(key)
            if(!returnedItem) {
                return console.error("No Item in localStorage")
            }
            const parsedReturnedItem = JSON.parse(returnedItem)
            return parsedReturnedItem;
        }
    } else if(storageType === "session") {
        if(option === "set" && value) {
            return sessionStorage.setItem(key, value)
        }
        if(option === "get" && typeof window !== 'undefined') {
            const returnedItem = sessionStorage.getItem(key)
            if(!returnedItem) {
                return console.error("No Item in sessionStorage")
            }
            if(typeof returnedItem !== "string") {
                return JSON.parse(returnedItem)
            }
            return returnedItem;
        }
    } else if(option === "remove") {
        if(storageType === "local") localStorage.removeItem(key)
        else if(storageType === "session") sessionStorage.removeItem(key)
    }
}