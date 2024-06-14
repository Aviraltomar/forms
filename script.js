document.getElementById('enrollmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const startDate = document.getElementById('startDate');
    const terms = document.getElementById('terms');

    let isValid = true;

    if (startDate.value !== '2021') {
        startDate.style.borderColor = 'red';
        isValid = false;
    } else {
        startDate.style.borderColor = 'green';
    }

    if (!terms.checked) {
        alert('You must agree to the terms and conditions.');
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
    }
});

document.getElementById('infoButton').addEventListener('click', function() {
    alert('Information about other courses:will we added soon ');
});

var config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
}


var countrySelect = document.querySelector('.country'),
    stateSelect = document.querySelector('.state'),
    citySelect = document.querySelector('.city')


function loadCountries() {

    let apiEndPoint = config.cUrl

    fetch(apiEndPoint, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(Response => Response.json())
    .then(data => {
     

        data.forEach(country => {
            const option = document.createElement('option')
            option.value = country.iso2
            option.textContent = country.name 
            countrySelect.appendChild(option)
        })
    })
    .catch(error => console.error('Error loading countries:', error))

    stateSelect.disabled = true
    citySelect.disabled = true
    stateSelect.style.pointerEvents = 'none'
    citySelect.style.pointerEvents = 'none'
}


function loadStates() {
    stateSelect.disabled = false
    citySelect.disabled = true
    stateSelect.style.pointerEvents = 'auto'
    citySelect.style.pointerEvents = 'none'

    const selectedCountryCode = countrySelect.value
 
    stateSelect.innerHTML = '<option value="">Select State</option>' // for clearing the existing states
    citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

    fetch(`${config.cUrl}/${selectedCountryCode}/states`, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(response => response.json())
    .then(data => {


        data.forEach(state => {
            const option = document.createElement('option')
            option.value = state.iso2
            option.textContent = state.name 
            stateSelect.appendChild(option)
        })
    })
    .catch(error => console.error('Error loading countries:', error))
}


function loadCities() {
    citySelect.disabled = false
    citySelect.style.pointerEvents = 'auto'

    const selectedCountryCode = countrySelect.value
    const selectedStateCode = stateSelect.value
   

    citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

    fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(response => response.json())
    .then(data => {
  

        data.forEach(city => {
            const option = document.createElement('option')
            option.value = city.iso2
            option.textContent = city.name 
            citySelect.appendChild(option)
        })
    })
}

window.onload = loadCountries

function validateDate() {
    const inputDate = document.getElementById('input-date').value;
    const messageDiv = document.getElementById('message');
    const errorIcon = document.getElementById('error-icon');
    
    if (inputDate) {
        const enteredDate = new Date(inputDate);
        const currentDate = new Date();
        const yearDifference = currentDate.getFullYear() - enteredDate.getFullYear();
        const monthDifference = currentDate.getMonth() - enteredDate.getMonth();
        const dayDifference = currentDate.getDate() - enteredDate.getDate();
        
        let exactThreeYears = false;
        if (yearDifference === 3) {
            if (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)) {
                exactThreeYears = true;
            }
        } else if (yearDifference === 2) {
            if (monthDifference < 0 || (monthDifference === 0 && dayDifference <= 0)) {
                exactThreeYears = true;
            }
        }

        if (exactThreeYears) {
            messageDiv.textContent = "Date is accepted.";
            messageDiv.style.color = "green";
            errorIcon.style.display = "none";
        } else {
            messageDiv.textContent = "You are not accepted. you should be in  3 years.";
            messageDiv.style.color = "red";
            errorIcon.style.display = "inline-block";
        }
    } else {
        messageDiv.textContent = "Please enter a valid date.";
        messageDiv.style.color = "red";
        errorIcon.style.display = "inline-block";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const infoButtons = document.querySelectorAll('.infoButton');

    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const infoText = button.getAttribute('data-info');
            displayInfo(infoText);
        });
    });

    function displayInfo(info) {
        const messageDiv = document.getElementById('message2');
        messageDiv.innerText = info;
        messageDiv.style.display = 'block';
    }
});