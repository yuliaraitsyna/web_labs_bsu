class THashStorage {
    constructor() {
        this.storage = {};
    }

    AddValue(key, value) {
        this.storage[key] = value;
    }
    
    DeleteValue(key) {
        if (this.storage.hasOwnProperty(key)) {
            delete this.storage[key];
            console.log('Deleted ' + key);
        }
        else {
            console.error("No item is found");
        }
    }
    
    GetValueInfo(key) {
        if (this.storage.hasOwnProperty(key)) {
            if (this.storage[key] === '') {
                console.error("No info");
                return;
            }
            console.log("Info: " + key + " is " + this.storage[key]);
        }
        else {
            console.error("No item is found");
        }
    }
    
    ListValues() {
        let string = '';
        for (let key in this.storage) {
            string += key + ': ' + this.storage[key] + '\n';
        }
        return string;
    }

    Reset() {
        this.storage = {};
    }
}

let storage = new THashStorage();

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
