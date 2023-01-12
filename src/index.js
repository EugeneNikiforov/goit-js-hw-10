import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const startForm = document.querySelector(`input#search-box`);
const countryFlag = document.querySelector(`.country-info`);


startForm.addEventListener(`input`, debounce(() => {
    const name = startForm.value.trim();
    if (name === ``) {
        return countryFlag.innerHTML = ``;
    };
    fetchCountries(name).then(succesCountry).catch(failCountry);
}, DEBOUNCE_DELAY));


function failCountry(error) {
    console.log(error)
    return countryFlag.innerHTML = ``;
};
function sufficientSample(array) {
    return array.map(({ flags, name }) => {
        return `<p class="country-name">
        <img src="${flags.svg}" alt="" width="20px" height="20px">${name.official}</p>`
    }).join("");
};
function succesCountry(array) {
    console.log(array)
    if (array.length > 10) {
    return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } if (array.length > 2) {    
        return countryFlag.innerHTML = sufficientSample(array);
    };
    return countryFlag.innerHTML = underSampling(array);
};
function underSampling(array) {
    return array.map(({ flags, name, capital, population, languages }) => {
        return `<h1 class="country-name">
        <img src="${flags.svg}" alt="" width="20px" height="20px">${name.official}</h1>
        <ul class="list">
        ${capital ? `<li class="country-info"><span>Capital:</span> ${capital}</li>` : ``}
        ${population ? `<li class="country-info"><span>Population:</span> ${population}</li>` : ``}
        ${Object.values(languages) ? `<li class="country-info"><span>Languages:</span> ${Object.values(languages)}</li>` : ``}
        </ul>`
    }).join("");
};
