/**
 * declarar:
 *  - input text
 *  - form
 *  - ul.plates
 *
 * 1. Al hacer click en el boton (submit), tomar valor del input
 * 2. Agregar valor a la lista (plates)
 */

/**
 *
 * una función debe guardar los datos ingresados
 * otra función debe agregar (renderizar) los datos en el array items
 *
 * BONUS: ~~1. agregar un botón de remove para elimininar cada elemento uno por uno~~
 * ~~2. agregar 3 botones: uno que elimine todos los elementos, uno que haga check
 * a todos los elementos y otro que uncheck a todos los elementos~~
 *
 */

const inputItemName = document.querySelector(".add-items input[type='text']");
const form = document.querySelector("form.add-items");
const platesList = document.querySelector(".plates");

const template = document.querySelector("template#plates-item-template");

const items = JSON.parse(localStorage.getItem("itemList")) || [];

// Save in localStorage the items added to plateList
function saveItem(event) {
    event.preventDefault();

    items.push({ text: inputItemName.value, done: false });

    // clean input
    form.reset();

    //Save items in localStorage
    updateLocalStorage();

    // render the new addition to the items array
    renderItems();
}

// handle the form's buttons delete, check and uncheck
function buttonHandlers(event) {
    // return if none of the button has been clicked
    if (!event.target.dataset.action) {
        return;
    }

    const buttonAction = event.target.dataset.action;

    if (buttonAction === "delete") {
        items.splice(0);
    } else if (buttonAction === "check") {
        items.map((elem) => {
            elem.done = true;
            return elem;
        });
    } else if (buttonAction === "uncheck") {
        items.map((elem) => {
            elem.done = false;
            return elem;
        });
    }

    updateLocalStorage();
    renderItems();
}

// delete an invidual item
function deleteOneItem(event) {
    if (event.target.dataset.action !== "delete-one") {
        return;
    }

    const liAncestor = event.target.closest("li");
    const itemPosition = liAncestor.querySelector("input").dataset.index;

    items.splice(itemPosition, 1);

    updateLocalStorage();
    renderItems();
}

// Render the items saved in the items array
function renderItems() {
    platesList.innerHTML = "";

    items.forEach((elem, index) => {
        //clone the template
        const clone = template.content.cloneNode(true);
        const cloneInput = clone.querySelector("input");
        const cloneLabel = clone.querySelector("label");

        //modify the template according with the data in the items array
        cloneInput.dataset.index = index;
        cloneInput.id = `item${index}`;
        cloneInput.checked = elem.done;
        cloneLabel.setAttribute("for", `item${index}`);
        cloneLabel.innerHTML = elem.text;

        //add clone to the plates list
        platesList.appendChild(clone);
    });
}

function inputCheckedHandler(event) {
    if (event.target.tagName !== "INPUT") {
        return;
    }

    const liInputElement = event.target;
    items[liInputElement.dataset.index].done = liInputElement.checked;

    updateLocalStorage();
    renderItems();
}

// update the localStorage with the data in the items array
function updateLocalStorage() {
    localStorage.setItem("itemList", JSON.stringify(items));
}

form.addEventListener("submit", saveItem);
form.addEventListener("click", buttonHandlers);
platesList.addEventListener("click", inputCheckedHandler);
platesList.addEventListener("click", deleteOneItem);

// Load the items saved in localStorage
window.addEventListener("load", renderItems);
