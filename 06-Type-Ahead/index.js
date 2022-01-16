const endpoint =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const citiesArr = [];

const searchBar = document.querySelector(".search");
const suggestionList = document.querySelector(".suggestions");

searchBar.addEventListener("input", searchInfo);

fetch(endpoint)
    .then((data) => data.json())
    .then((places) => citiesArr.push(...places));

/** Change the list with the cities finded */
function searchInfo() {
    const searchBarValue = this.value.toLowerCase();

    const placesFinded = citiesArr
        .filter((cityObj) => {
            const city_state = `${cityObj.city}, ${cityObj.state}`;

            return city_state.toLowerCase().includes(searchBarValue);
        })
        .map((filteredCity) => {
            const population = parseInt(
                filteredCity.population,
                10
            ).toLocaleString("en-US");

            const regex = new RegExp(searchBarValue, "ig");

            const result =
                `${filteredCity.city}, ${filteredCity.state}`.replace(
                    regex,
                    `<span class='hl'>${searchBarValue}</span>`
                );

            return `
            <li>
                <span class="name">${result}</span>
                <span class="population">${population}</span>
            </li>
            `;
        })
        .join("");

    suggestionList.innerHTML = placesFinded;
}
