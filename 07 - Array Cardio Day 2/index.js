// ## Array Cardio Day 2

const people = [
    { name: "Wes", year: 1988 },
    { name: "Kait", year: 1986 },
    { name: "Irv", year: 1970 },
    { name: "Lux", year: 2015 },
];

const comments = [
    { text: "Love this!", id: 523423 },
    { text: "Super good", id: 823423 },
    { text: "You are the best", id: 2039842 },
    { text: "Ramen is my fav food ever", id: 123523 },
    { text: "Nice Nice Nice!", id: 542328 },
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
// Array.prototype.every() // is everyone 19 or older?
const actualYear = new Date().getFullYear();

const isAtLeast = people.some((person) => actualYear - person.year >= 19);
const isEveryone = people.every((person) => actualYear - person.year >= 19);
console.log({ isAtLeast });
console.log({ isEveryone });

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423

const matchComment = comments.find((ele) => ele.id == 823423);
console.log({ matchComment });

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423

const commentIndex = comments.findIndex((ele) => ele.id == 823423);

// const deletedComment = comments.splice(commentIndex, 1)[0];
const deletedComment = comments.slice(commentIndex, commentIndex + 1)[0];

const newCommentsArray = [
    ...comments.slice(0, commentIndex),
    ...comments.slice(commentIndex + 1),
];

console.log("Find the comment index with of 823423: ", commentIndex);
console.log({ deletedComment });
console.log("");
console.log("Original comments array:");
console.table(comments);
console.log("");
console.log("New comments array:");
console.table(newCommentsArray);
