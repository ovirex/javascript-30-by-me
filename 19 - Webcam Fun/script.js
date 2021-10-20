/** Task
 * Reproducir video camara (.player)
 * Mostrar ese mismo video en el canvas (.photo)
 * Hacer posible aplicar efectos al canvas (modificar el color de la imagen)
 * Poder tomar fotos
 * Mostrar las fotos (appendChild en .strip)
 * Poder descargar las fotos
 */

const player = document.querySelector("video.player");

if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
            player.srcObject = mediaStream;
            player.onloadedmetadata = () => {
                player.play();
            };
            console.log("I see you...");
        })
        .catch((err) => {
            console.error("LET ME SEE YOU!!!", err);
        });
}
