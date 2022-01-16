const secondsHand = document.querySelector(".seconds-hand");
const minutesHand = document.querySelector(".minute-hand");
const hoursHand = document.querySelector(".hour-hand");

let secondsAnglesCount = 0;
let minutesAnglesCount = 0;
let hoursAnglesCount = 0;

let hora = 23;
let sec = 50;
let min = 59;
function updateClock() {
    sec++;
    const date = new Date(1995, 11, 17, hora, min, sec);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const transitionHand = Array.from(document.querySelectorAll(".hand"));
    // if (seconds == 0) {
    //     transitionHand.forEach((ele) => {
    //         ele.style.transition = "none";
    //     });
    // } else {
    //     transitionHand.forEach((ele) => {
    //         ele.style.transition = "transform 200ms";
    //         ele.style.transitionTimingFunction =
    //             "cubic-bezier(0.13, 1.51, 0.57, 0.9)";
    //     });
    // }

    console.log(`${hour}:${minutes}:${seconds}`);
    console.log(
        hoursAnglesCount,
        (hour / 12) * 360 + (minutes / 60) * 30,
        (hour / 12) * 360 + (minutes / 60) * 30
    );

    secondsAnglesCount +=
        secondsAnglesCount == 0
            ? (seconds / 60) * 360
            : (seconds / 60) * 360 - ((seconds - 1) / 60) * 360;

    minutesAnglesCount +=
        minutesAnglesCount == 0
            ? (minutes / 60) * 360 + (seconds / 60) * 6
            : (minutes / 60) * 360 +
              (seconds / 60) * 6 -
              ((minutes / 60) * 360 + ((seconds - 1) / 60) * 6);

    hoursAnglesCount +=
        hoursAnglesCount == 0
            ? (hour / 12) * 360 + (minutes / 60) * 30
            : (hour / 12) * 360 +
              (minutes / 60) * 30 -
              (hour / 12) * 360 +
              (minutes - 1 / 60) * 30;

    secondsHand.style.transform = `translate(-50%, -50%) rotate(${secondsAnglesCount}deg)`;

    minutesHand.style.transform = `translate(-50%, -50%) rotate(${minutesAnglesCount}deg)`;

    hoursHand.style.transform = `translate(-50%, -50%) rotate(${
        (hour / 12) * 360 + (minutes / 60) * 30
    }deg)`;
}

setInterval(updateClock, 1000);

updateClock();
