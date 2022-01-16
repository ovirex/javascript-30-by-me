window.addEventListener("DOMContentLoaded", function () {
    const inputsElements = Array.from(
        document
            .getElementsByClassName("options-container")[0]
            .querySelectorAll("input")
    );

    const documentStyles = document.documentElement.style;

    inputsElements.forEach((input) => {
        input.addEventListener("input", updateCssVariables, false);
        input.addEventListener("change", updateCssVariables, false);
    });

    function updateCssVariables(e) {
        const inputValue = e.target.value;
        const inputId = e.target.id;

        if (e.target.type == "color") {
            documentStyles.setProperty("--base", `${inputValue}`);
        }
        if (e.target.type == "range") {
            documentStyles.setProperty(`--${inputId}`, `${inputValue}px`);
        }
    }
});
