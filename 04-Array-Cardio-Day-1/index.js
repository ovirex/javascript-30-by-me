// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with

const inventors = [
    { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
    { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
    { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
    { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
    { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
    { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
    { first: "Max", last: "Planck", year: 1858, passed: 1947 },
    { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
    { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
    { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
    { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
    { first: "Hanna", last: "Hammarström", year: 1829, passed: 1909 },
];

const people = [
    "Bernhard, Sandra",
    "Bethea, Erin",
    "Becker, Carl",
    "Bentsen, Lloyd",
    "Beckett, Samuel",
    "Blake, William",
    "Berger, Ric",
    "Beddoes, Mick",
    "Beethoven, Ludwig",
    "Belloc, Hilaire",
    "Begin, Menachem",
    "Bellow, Saul",
    "Benchley, Robert",
    "Blair, Robert",
    "Benenson, Peter",
    "Benjamin, Walter",
    "Berlin, Irving",
    "Benn, Tony",
    "Benson, Leana",
    "Bent, Silas",
    "Berle, Milton",
    "Berry, Halle",
    "Biko, Steve",
    "Beck, Glenn",
    "Bergman, Ingmar",
    "Black, Elk",
    "Berio, Luciano",
    "Berne, Eric",
    "Berra, Yogi",
    "Berry, Wendell",
    "Bevan, Aneurin",
    "Ben-Gurion, David",
    "Bevel, Ken",
    "Biden, Joseph",
    "Bennington, Chester",
    "Bierce, Ambrose",
    "Billings, Josh",
    "Birrell, Augustine",
    "Blair, Tony",
    "Beecher, Henry",
    "Biondo, Frank",
];

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const bornIn1500 = inventors.filter((inventor) => {
    if (inventor.year < 1600 && inventor.year > 1500) {
        return inventor;
    }
});
console.log("1) Inventors born in the 1500's: ", bornIn1500);

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
const inventorsFullName = inventors.map((inventors) => {
    return `${inventors.first} ${inventors.last}`;
});
console.log("2) Inventors full name: ", inventorsFullName);

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const orderedInventors = inventors.slice().sort((a, b) => {
    return a.year - b.year;
});
console.log("3) Inventors sorted by birthdate (oldest to youngest): ");
console.table(orderedInventors);

// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
const allInventorsYears = inventors.reduce((acum, curr) => {
    return acum + (curr.passed - curr.year);
}, 0);
console.log(
    "4) Years of the inventors summed all together: ",
    allInventorsYears
);

// 5. Sort the inventors by years lived
const livedYearsOrdered = inventors.slice().sort((a, b) => {
    return a.passed - a.year - (b.passed - b.year);
});
console.log("5) Inventors sorted by years lived: ");
console.table(livedYearsOrdered);

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
const categoriesWrapper = Array.from(
    document.querySelectorAll(".mw-category .mw-category-group ul li a")
);

categoriesWrapper
    .map((text) => text.textContent)
    .filter((de) => de.includes("de"));

// 7. sort Exercise
// Sort the people alphabetically by last name
const organizedPeople = people.sort((a, b) => {
    const [aLast, aName] = a.split(", ");
    const [bLast, bName] = b.split(", ");

    return aLast > bLast ? 1 : -1;
});
console.log("7) Sorted people", organizedPeople);

// 8. Reduce Exercise
// Sum up the instances of each of these
const data = [
    "car",
    "car",
    "truck",
    "truck",
    "bike",
    "walk",
    "car",
    "van",
    "bike",
    "walk",
    "car",
    "van",
    "car",
    "truck",
];

const sumInstances = data.reduce((acum, item) => {
    acum[item] = (acum[item] || 0) + 1;
    return acum;
}, {});
console.log(sumInstances);
