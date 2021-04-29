window.addEventListener("DOMContentLoaded", function () {
    const inputsElements = Array.from(
        document
            .getElementsByClassName("options-container")[0]
            .querySelectorAll("input")
    );
    const documentStyles = getComputedStyle(document.documentElement);
    const blur = documentStyles.getPropertyValue("--blur");
    const spacing = documentStyles.getPropertyValue("--spacing");
    const base = documentStyles.getPropertyValue("--base");
});
