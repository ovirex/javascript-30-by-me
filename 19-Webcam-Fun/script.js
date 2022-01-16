/** Tasks:
 * 1. Reproducir video camara (.player)
 * 2. Mostrar ese mismo video en el canvas (.photo)
 * 3. Hacer posible aplicar efectos al canvas (modificar el color de la imagen)
 * 4. Poder tomar fotos/screenshots
 * 5. Mostrar las fotos (appendChild en .strip)
 * 6. Poder descargar las fotos
 */

// 1. Reproducir video camara (.player)
const player = document.querySelector("video.player");
const canvas = document.querySelector("canvas.photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

// Access the webcam and show the webcam video in .player element
if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
            player.srcObject = mediaStream;

            player.addEventListener("loadedmetadata", () => {
                player.play();

                // set canvas size proportionally to video size
                canvas.width = player.videoWidth;
                canvas.height = player.videoHeight;
            });
            console.log("I see you...");
        })
        .catch((err) => {
            console.error("I CAN'T SEE YOU!!!", err);
        });
}

// 2. Mostrar ese mismo video en el canvas (.photo)

player.addEventListener("play", () => {
    updateVideo();
    // requestAnimationFrame(updateVideo);
});

function updateVideo() {
    ctx.drawImage(player, 0, 0);

    effectHandler();
    requestAnimationFrame(updateVideo);
}

// 3. Hacer posible aplicar efectos al canvas (modificar el color de la imagen)

// set up filter
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200;
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll(".rgb input").forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (
            red >= levels.rmin &&
            green >= levels.gmin &&
            blue >= levels.bmin &&
            red <= levels.rmax &&
            green <= levels.gmax &&
            blue <= levels.bmax
        ) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

// 4. Poder tomar fotos/screenshots
// 5. Mostrar las fotos
// 6. Poder descargar las fotos
function takePhoto() {
    // Make snap sound to play
    snapSound();

    // Capture the image from the canvas and add it to the strip html element
    const photoURL = canvas.toDataURL("image/jpeg");
    const ele = document.createElement("a");
    ele.href = photoURL;
    ele.setAttribute("download", "Atractivo-Tipazo");
    ele.innerHTML = `<img src="${photoURL}" />`;
    strip.insertBefore(ele, strip.firstChild);
}

function snapSound() {
    snap.currentTime = 0;
    snap.play();
}

/**
 * hacer posible cambiar el efecto en vivo
 */
// Change effect
const controls = document.querySelector(".controls");

controls.addEventListener("click", controlsHandler);

function controlsHandler(e) {
    if (!e.target.dataset.effect) return;

    const controlsNode = this;

    // Change the effect to apply into the canvas
    const effect = e.target.dataset.effect;
    chosenEffect = chosenEffect === effect ? "" : effect;

    // Change the .selected-effect class on the effects buttons
    Array.from(controlsNode.children).forEach((button) => {
        if (!e.target.dataset.effect) return;

        button.classList.remove("selected-effect");
    });

    if (chosenEffect === "") {
        e.target.classList.remove("selected-effect");
    } else {
        e.target.classList.add("selected-effect");
    }
}

let chosenEffect;
function effectHandler() {
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // mess with them
    switch (chosenEffect) {
        case "redEffect":
            pixels = redEffect(pixels);
            break;
        case "rgbSplit":
            pixels = rgbSplit(pixels);
            break;
        case "greenScreen":
            pixels = greenScreen(pixels);
            break;
    }

    // put them back
    ctx.putImageData(pixels, 0, 0);
}
