var formA = [
    {label:'ФИО', elemtype:'input', type:'text', name:'full-name', max: '200', restriction:'required'},
    {label:'Номер телефона', elemtype:'input', type:'tel', name:'phone-number', min:'13', max:'13', restriction:'required'},
    {label:'Email', elemtype:'input',type:'email', name:'email', restriction:''},
    {label:'Количество гостей', elemtype: 'input', type:'number', name:'guests-number', min:'1', max:'20', restriction:'required'},
    {label:'Дата брони', elemtype:'input', type:'date', name:'date-info', restriction:'required'},
    {label:'Отправить', elemtype:'button', type:'submit',name:'submit'}
]

function createForm(data) {
    const form = document.getElementById("form");
    data.forEach(element => {
        if (element.elemtype === "button") {
            const button = document.createElement(element.elemtype);
            button.classList.add(element.name);
            button.setAttribute('type', element.type);
            button.setAttribute('name', element.name);
            button.textContent = element.label;
            form.appendChild(button);
        } else {
            const label = document.createElement('label');
            label.textContent = element.label;
            const input = document.createElement(element.elemtype);
            input.classList.add(element.name);
            input.setAttribute('type', element.type || 'text');
            input.setAttribute('name', element.name);
            if (element.restriction === 'required') {
                input.required = true;
            }
            if (element.min) {
                input.setAttribute('min', element.min);
            }
            if (element.max) {
                input.setAttribute('max', element.max);
            }
            if (element.pattern) {
                input.setAttribute('pattern', element.pattern);
            }
            form.appendChild(label);
            form.appendChild(input);
        }
    });
}

const validationRules = {
    'full-name': /^[A-Za-zА-Яа-яЁё\s]+$/,
    'phone-number': /^\+\d{12}$/,
};

const form = document.getElementById('form')

form.addEventListener('input', function(event) {
    const input = event.target;
    const fieldName = input.name;
    const value = input.value;

    if (validationRules[fieldName] && !validationRules[fieldName].test(value)) {
        showErrorMessage(input, 'Неверный формат');
    } else {
        hideErrorMessage(input);
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        const fieldName = input.name;
        const value = input.value;

        if (validationRules[fieldName] && !validationRules[fieldName].test(value)) {
            showErrorMessage(input, 'Неверный формат');
        } else {
            hideErrorMessage(input);
        }
    });
});

function showErrorMessage(input, message) {
    let error = input.nextElementSibling; 
    if (!error || !error.classList.contains('error-message')) { 
        error = document.createElement('span');
        error.classList.add('error-message');
        input.parentNode.insertBefore(error, input.nextSibling); 
    }
    error.textContent = message;
}

function hideErrorMessage(input) {
    const error = input.nextElementSibling; 
    if (error && error.classList.contains('error-message')) { // Check if it's an error message
        error.textContent = ''; 
    }
}

createForm(formA);
