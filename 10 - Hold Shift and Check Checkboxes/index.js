const inputList = Array.from(document.querySelectorAll(".inbox .item input"));
const checkedList = [];

window.addEventListener("click", (e) => {
    inputList.forEach((item, index) => {
        if (item.id == e.target.id) {
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

        for (
            let i = orderedCheckedList[0];
            i <= orderedCheckedList[orderedCheckedList.length - 1];
            i++
        ) {
            inputList[i].checked = e.target.checked;
        }
    }
});
