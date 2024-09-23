let countriesData = [];

const loadCountry = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            countriesData = data.sort((a, b) => a.name.common.localeCompare(b.name.common)); // Sort alphabetically
            displayCountries(countriesData);
        })
        .catch(error => console.error('Error fetching countries:', error));
};

const displayCountries = (countries) => {
    const countriesDiv = document.getElementById('countries');
    countriesDiv.innerHTML = ''; // Clear previous results
    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country');

        countryDiv.innerHTML = `
            <h2 class="country-name">${country.name.common}</h2>
            <img src="${country.flags.svg}" alt="${country.name.common} flag" class="country-flag">
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        `;

        // Add event listeners to name and flag for full-screen view
        const countryName = countryDiv.querySelector('.country-name');
        const countryFlag = countryDiv.querySelector('.country-flag');

        countryName.addEventListener('click', () => showFullScreenInfo(country));
        countryFlag.addEventListener('click', () => showFullScreenInfo(country));

        countriesDiv.appendChild(countryDiv);
    });
};

const filterCountries = () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredCountries = countriesData.filter(country => 
        country.name.common.toLowerCase().includes(searchInput)
    );
    displayCountries(filteredCountries);
};

const showFullScreenInfo = (country) => {
    const modal = document.getElementById('countryModal');
    const modalInfo = document.getElementById('modalInfo');

    modalInfo.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(', ')}</p>
        <p><strong>Timezones:</strong> ${country.timezones.join(', ')}</p>
        <p><strong>Currencies:</strong> ${Object.values(country.currencies || {})
            .map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
    `;

    // Display the modal
    modal.style.display = 'flex';
};

// Close modal if clicked outside content
window.addEventListener('click', (e) => {
    const modal = document.getElementById('countryModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Show or hide back to top button
window.onscroll = () => {
    const backToTopButton = document.getElementById('backToTop');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
};

// Smooth scroll to top function
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll behavior
    });
};

loadCountry();
