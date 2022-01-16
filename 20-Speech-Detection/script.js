if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    const words = document.querySelector(".words");

    window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const myRecognition = new SpeechRecognition();
    myRecognition.lang = "es-US";
    myRecognition.interimResults = true;

    myRecognition.start();

    let p = document.createElement("p");
    words.appendChild(p);

    myRecognition.addEventListener("end", myRecognition.start);

    myRecognition.addEventListener("result", function (e) {
        const transcript = Array.from(e.results)
            .map((result) => result[0].transcript)
            .join("");
        console.log(e.results);

        words.lastElementChild.textContent = transcript;

        if (e.results[0].isFinal) {
            // myRecognition.abort();
            p = document.createElement("p");
            words.appendChild(p);
        }
    });

    myRecognition.addEventListener("error", function (e) {
        console.error("Error", e);
    });
} else {
    console.log("speech recognition is not supported");
}
