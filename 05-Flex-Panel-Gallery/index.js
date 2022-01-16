window.addEventListener("DOMContentLoaded", function () {
    const panels = Array.from(document.querySelectorAll(".panels .panel"));
    panels.forEach((panel) => {
        panel.addEventListener("click", clickOnPanel);
        panel.addEventListener("transitionend", upDownText);
    });

    function clickOnPanel() {
        const targetPanel = this;
        targetPanel.classList.toggle("open");
    }

    function upDownText(event) {
        if (event.propertyName == "flex-grow") {
            this.classList.toggle("open-active");
        }
    }
});
