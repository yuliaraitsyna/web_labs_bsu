class TLocalStorage {
    constructor() {}

    AddValue(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    
    DeleteValue(key) {
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
            console.log('Deleted ' + key + ' from local storage.');
        } else {
            console.error("No item is found in local storage.");
        }
    }
    
    GetValueInfo(key) {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            console.log("Info for key '" + key + "': " + JSON.parse(storedValue));
        } else {
            console.error("No item is found in local storage.");
        }
    }
    
    ListValues() {
        let string = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));
            string += key + ': ' + value + '\n';
        }
        return string;
    }

    Reset() {
        localStorage.clear();
        console.log('Local storage cleared.');
    }
}

let storage = new TLocalStorage();

function Add() {
    let nameInput = window.prompt("Enter name of the menu position");
    let priceInput = window.prompt("Enter price");
    if (nameInput !== null && priceInput !== null) {
        storage.AddValue(nameInput, priceInput);
    } else {
        console.error("Input is empty");
    }
}

function Delete() {
    let input = window.prompt("Input deleting item's name");
    if (input !== null) {
        storage.DeleteValue(input.trim());
    }
    else {
        console.error("Input is empty");
    }
}

function Info() {
    let input = window.prompt("Input item's name");
    if (input !== null) {
        storage.GetValueInfo(input.trim());
    }
    else {
        console.error("Input is empty");
    }
}

function Menu() {
    console.log(storage.ListValues());
}
