const LocalStorage = {
    get: key => {
        return JSON.parse(localStorage.getItem(key));
    },

    save: (key, value) => {
        return localStorage.setItem(key, JSON.stringify(value));
    },

    delete: key => {
        return localStorage.removeItem(key);
    },
};

export default LocalStorage;