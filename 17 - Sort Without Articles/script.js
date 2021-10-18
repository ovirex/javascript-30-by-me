/**Task
 * se debe ordenar alfabeticamente
 * se deben ignorar los "an", "the" y "a" iniciales al momento de ordenar
 *
 * Mostrar los elementos ordenados
 */
const bands = [
    "The Plot in You",
    "The Devil Wears Prada",
    "Pierce the Veil",
    "Norma Jean",
    "The Bled",
    "Say Anything",
    "The Midway State",
    "We Came as Romans",
    "Counterparts",
    "Oh, Sleeper",
    "A Skylit Drive",
    "Anywhere But Here",
    "An Old Dog",
];

/** Ordenar Array
 * usar .sort() function
 *  copiar el element
 *  identificar si hay un article ("an", "the" y "a") al inicio del string element a ordenar
 *      usar .match()
 *       ¿que hacer cuando match retorna 'null'?
 *  identificar si el article está al principio
 *
 *  realizar comparación con .localCompare() [leer más de localCompare]
 *
 */
console.log("Array: ");
console.table(bands);

bands.sort((bandA, bandB) => {
    const regex = /(An|The|A)\s/i;

    const foundA = deleteArticles(bandA, regex);
    const foundB = deleteArticles(bandB, regex);

    return foundA.localeCompare(foundB);
});

console.log("Alphabetically Sorted Array: ");
console.table(bands);

function deleteArticles(band, regex) {
    if (band.match(regex) !== null && band.match(regex).index === 0) {
        return band.replace(regex, "");
    }
    return band;
}

/** Mostrar Array
 * encerrar los elementos ordenados con li tags (usando map)
 * juntar los elementos del array con join("")
 * append el string dentro del UL
 */

const bandList = document.getElementById("bands");
const bandHtmlList = bands
    .map((band) => {
        return `<li>${band}</li>`;
    })
    .join("");
bandList.innerHTML = bandHtmlList;
