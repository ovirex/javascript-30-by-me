const targets = document.querySelectorAll("img.slide-in");

function slide(target) {
    const interObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } else {
                    entry.target.classList.remove("active");
                }
            });
        },
        { threshold: 0.25 }
    );
    interObserver.observe(target);
}

targets.forEach(slide);
