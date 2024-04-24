import { fromEvent } from 'rxjs';
import $ from 'jquery';
import { Observable } from 'rxjs';
import "./styles/styles.css"

//const jsonData = require('../data/cafe.json');

const showDataButton = document.getElementById('show-data-btn');
const deleteButton = document.getElementById('delete-btn');
const dataContainer = document.getElementById('data-container');

const displayData = (data) => {
    dataContainer.innerHTML = '';

    data.menu.forEach((menu_section) => {
        menu_section.positions.forEach((element, index) => {

            const section = document.createElement('div');

            if(index === 0) {
                const sectionHeader = document.createElement('h3');
                const headers = document.createElement('tr');
                headers.className = "headers";
                const name = document.createElement('th');
                name.textContent = "Name";
                const price = document.createElement('th');
                price.textContent = "Price";
                const description = document.createElement('th');
                description.textContent = "Description";
    
                sectionHeader.textContent = `${menu_section.section_name}`;

                headers.append(name);
                headers.append(price);
                headers.append(description);
    
                section.append(sectionHeader);
                section.append(headers);
            }

            const row = document.createElement('tr');
            const nameColumn = document.createElement("th");
            nameColumn.textContent = `${element.name}`;
            const priceColumn = document.createElement('th');
            priceColumn.textContent =  `${element.price}`;
            const descriptionColumn = document.createElement('th');
            descriptionColumn.textContent = ` ${element.description}`;

            row.append(nameColumn);
            row.append(priceColumn);
            row.append(descriptionColumn);

            section.append(row);

            dataContainer.append(section);

        });

    });
}

function deleteLastRow() {
    const rows = dataContainer.querySelectorAll('div');

    if(rows.length > 0) {
        const lastRow =  rows[rows.length - 1];
        lastRow.remove();
    }
};

const fetchData$ = new Observable(observer => {
    $.ajax({
        url: '/download',
        method: 'GET',
        dataType: 'json',
        success: response => {
            observer.next(response);
            observer.complete();
        },
        error: error => {
            observer.error(error);
        }
    });
});

fetchData$.subscribe(
    data => {
        fromEvent(showDataButton, 'click').subscribe(() => displayData(data));
    },
    error => {
        console.error('Error fetching data:', error);
    }
);

fromEvent(deleteButton, 'click').subscribe(() => deleteLastRow());
