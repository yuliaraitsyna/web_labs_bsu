const menu = [
    {
        name: "Menu",
        submenu: [
            { name: "Starters", url: "" },
            {
                name: "Main",
                url: "",
                submenu: [
                    { name: "Meat", url: "" },
                    { name: "Fish", url: "" },
                    { name: "Pasta", url: "" },
                    { name: "Pizza", url: ""}
                ]
            },
            { name: "Desserts", url: "" }
        ]
    },
    { name: "About", url: "" },
    {
        name: "Services",
        submenu: [
            { name: "Reservation", url: "" },
            { name: "Gastrofest", url: "" }
        ]
    }
];

const parentElem = document.getElementById("menu");

function showMenu(menuItems, parent) {
    menuItems.forEach(item => {
        const menuItem = document.createElement("li");
        const menuItemLink = document.createElement("a");
        menuItemLink.textContent = item.name;
        menuItemLink.setAttribute("href", item.url || "#");
        menuItem.appendChild(menuItemLink);

        if (item.submenu && item.submenu.length > 0) {
            const submenu = document.createElement("ul");
            submenu.classList.add("submenu");
            showMenu(item.submenu, submenu); // Рекурсивно строим подменю
            menuItem.appendChild(submenu);

            // Добавляем обработчики событий для открытия и закрытия подменю
            menuItem.addEventListener("mouseenter", () => displaySubmenu(submenu));
            menuItem.addEventListener("mouseleave", () => hideSubmenu(submenu));
        }

        parent.appendChild(menuItem);
    });
}

function displaySubmenu(submenu) {
    submenu.style.display = "block";
}

function hideSubmenu(submenu) {
    submenu.style.display = "none";
}

showMenu(menu, parentElem);

