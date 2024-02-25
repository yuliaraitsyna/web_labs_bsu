let menu = {}
menu['latte'] = '3$'
menu['raf'] = '3.5$'
menu['espresso'] = '1$'
menu['capucino'] = '2$'

function AddValue(key, value) {
    menu[key] = value
}

function DeleteValue(key) {
    if(menu.hasOwnProperty(key)) {
        delete menu[key];
        console.log('Deleted ' + key)
    }
    else {
        console.err("No item is found")
    }
}

function GetValueInfo(key) {
    if(menu.hasOwnProperty(key)) {
        if(menu[key] === '') {
            console.err("No info")
            return;
        }
        console.log("Info: " + key + " is " + menu[key]);
    }
    else {
        console.err("No item is found")
    }
}

function ListValues() {
    let string = ''
    for (let key in menu) {
        string += key + ': ' + menu[key] + '\n'
    }
    return string
}

function Add() {
    let nameInput = window.prompt("Enter name of the menu position")
    let priceInput = window.prompt("Enter price")
    if (nameInput !== null || priceInput !== null) {
        AddValue(nameInput, priceInput)
    } else {
        console.error("Input is empty")
    }
}


function Delete() {
    let input = window.prompt("Input deleting item's name")
    if(input != null) {
        DeleteValue(input.trim())
    }
    else {
        console.err("Input is empty")
    }
}

function Info() {
    let input = window.prompt("Input item's name")
    if(input != null) {
        GetValueInfo(input.trim())
    }
    else {
        console.err("Input is empty")
    }
}

function Menu() {
    console.log(ListValues())
}