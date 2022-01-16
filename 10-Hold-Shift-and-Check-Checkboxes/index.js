const checkboxesList = Array.from(
    document.querySelectorAll(".inbox .item input[type='checkbox']")
);

// store the 2 latest checkboxes checked
const checkedList = [];

function checkElements(e) {
    const clickedElement = this;

    // Find the index of the clicked element
    checkboxesList.forEach((checkbox, index) => {
        if (checkbox == clickedElement) {
            checkedList.push(index);
        }
    });

    if (checkedList.length > 2) {
        checkedList.shift();
    }

    if (e.shiftKey) {
        const orderedCheckedList = checkedList.sort((a, b) => {
            return a - b;
        });

        // check/uncheck the chekboxes between the 2 already selected
        for (
            let i = orderedCheckedList[0];
            i <= orderedCheckedList[orderedCheckedList.length - 1];
            i++
        ) {
            checkboxesList[i].checked = clickedElement.checked;
        }
    }
}

checkboxesList.forEach((inputs) => {
    inputs.addEventListener("click", checkElements);
});
