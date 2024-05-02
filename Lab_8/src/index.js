import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap} from 'rxjs';
import "./styles/styles.css"

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

function loadData () {
    const url = 'http://localhost:8080/download';

    ajax.getJSON(url).subscribe({
        next: data => {
            displayData(data);
        },
        error: error => console.log(error)
    });
}

fromEvent(showDataButton, 'click').subscribe(() => loadData());
fromEvent(deleteButton, 'click').subscribe(() => deleteLastRow());
