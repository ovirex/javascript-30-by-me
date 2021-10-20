/**Task:
 * Mostrar las horas, minutos y segundos totales
 * de la suma de los tiempos de todos los videos
 */

const videosList = Array.from(document.querySelectorAll(".videos [data-time]"));

let total = videosList.reduce((acum, curr) => {
    let [minutes, seconds] = curr.dataset.time.split(":").map(parseFloat);

    // convert minutes to seconds
    minutes *= 60;

    return acum + minutes + seconds;
}, 0);

console.log(total);
const hours = Math.floor(total / 3600);
total -= hours * 3600;
const minutes = Math.floor(total / 60);
total -= minutes * 60;
const seconds = total;

console.log(hours, minutes, seconds);
