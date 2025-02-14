// Activity 1
const steps = ["one", "two", "three"];
const listTemplate = (step) => `<li>${step}</li>`;
const stepsHtml = steps.map(listTemplate);
document.querySelector("#myList").innerHTML = stepsHtml.join();

// Activity 2
const grades = ["A", "B", "A"];

function convertGradeToPoints(grade) {
    if (grade === "A") return 4;
    if (grade === "B") return 3;
    return 0;
}

const gpaPoints = grades.map(convertGradeToPoints);


document.querySelector("#gpaPoints").innerHTML = `GPA Points: ${gpaPoints.join(", ")}`;
// activity 3
const pointsTotal = gpaPoints.reduce((total, item) => total + item, 0);
const gpa = gpaPoints.length > 0 ? pointsTotal / gpaPoints.length : 0;

document.querySelector("#finalGpa").innerHTML = `Final GPA: ${gpa.toFixed(2)}`;

// activity 4
const words = ["watermelon", "peach", "apple", "tomato", "grape"];

const shortWords = words.filter(word => word.length < 6);
document.querySelector("#filteredWords").innerHTML = `Short words: ${shortWords.join(", ")}`;

// activity 5
const myArray = [12, 34, 21, 54];
const luckyNumber = 21;

const luckyIndex = myArray.indexOf(luckyNumber);
document.querySelector("#luckyNumberIndex").innerHTML = `Lucky Number Index: ${luckyIndex}`;