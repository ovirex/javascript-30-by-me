if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    const words = document.querySelector(".words");

    window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const myRecognition = new SpeechRecognition();
    myRecognition.lang = "es-US";
    myRecognition.continuous = true;
    myRecognition.interimResults = true;

    myRecognition.start();

    myRecognition.addEventListener("start", function (e) {
        console.log("Empezó servicio de reconocimiento", e);
    });

    myRecognition.addEventListener("audiostart", function (e) {
        console.log("Navegador ha empezado a capturar audio", e);
    });
    myRecognition.addEventListener("soundstart", function (e) {
        console.log("Sonido detectado", e);
    });
    myRecognition.addEventListener("speechstart", function (e) {
        console.log("Sonido detectado y reconocido", e);
    });

    myRecognition.addEventListener("error", function (e) {
        console.error("Error", e);
    });

    myRecognition.addEventListener("result", function (e) {
        console.log(
            "Resultados del reconocimiento",
            e.results[0][0].transcript
        );
    });

    // myRecognition.addEventListener("error", function (e) {
    //     console.log(e);
    // });
    console.log(myRecognition);
} else {
    console.log("speech recognition is not available");
}
