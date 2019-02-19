let countryHolder;
const localKey = 'travel-planner'

const hasItem = key => {
    
}; //true false
const addItem = key => {}; // void / (true || false)?
const removeItem = key => {}; // void / (true || false)?
//const allItems = key => {};
const countItems = () => {}; //integer -> 0 ...... 250



const addListenersToCountries = function(classSelector)  {
    const countries = document.querySelector(classSelector);
    for(const country of countries){
        country.addEventListener('click', function(){
            console.log('You clicked me', this)
        });
    }
};


const showCountries = data => {
    console.log(data);
    // #1 loop the data
    let countries = '';

    for (const c of data) {
        // #2 build an HTML-string for each country
        countries += `
                <article>
                    <input id="${c.cioc}-${c.alpha2Code}" class="o-hide c-country-input" type="checkbox">
                    <label for="${c.cioc}-${c.alpha2Code}" class="c-country js-country">
                        <div class="c-country-header">
                            <h2 class="c-country-header__name">${c.name}</h2>
                            <img class="c-country-header__flag" src="${c.flag}" alt="The flag of ${c.name}.">
                        </div>
                        <p class="c-country__native-name">${c.nativeName}</p>
                    </label>
                </article>
        `;
    }

   countryHolder.innerHTML = countries;
   //HTML is loaded
   addListenersToCountries('.js-country');


};


const fetchCountries = (region) => {

    let api =  + region

    fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    .then(r => r.json())
    .then(data => showCountries(data))
    .catch(err => console.error(`An error occured, ${err}`));

};

const enableListeners = () => {
    // #1 Get some buttons
    const regionButtons = document.querySelectorAll('.js-region-select')
    // #2 Listen to the clicks
    for (const button of regionButtons) {
        button.addEventListener('click', function(){
            // #2.1 look up the data property
            const region = this.getAttribute("data-region");

            // #2.2 Get data from the API
            fetchCountries(region);
        });
    }
 
    countryHolder =  document.querySelector('.js-country-holder');
    //always start with Europe
    fetchCountries('europe');

};

const init = () => {
    console.log('Init (dus de DOM is geladen)....');
    enableListeners();
};

document.addEventListener('DOMContentLoaded', init);
