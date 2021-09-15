/** Initialize mousedown validator */
let isMouseDown = false;

/** Get elements */
const playPauseButton = document.querySelector(".video-pause-play");
const videoElement = document.querySelector(".video-player video");
const rangeInputs = document.querySelectorAll(
    ".video-controls input[type='range'"
);
const skipButtons = document.querySelectorAll(".video-skip");
const videoProgressBar = document.querySelector(".video-progress-bar");
const videoProgressBarContainer = document.querySelector(
    ".video-progress-container"
);

/**Add events listeners */

playPauseButton.addEventListener("click", playPauseVideo);
videoElement.addEventListener("click", playPauseVideo);
window.addEventListener("keydown", function (e) {
    if (e.key === " ") {
        playPauseVideo();
    }
});

rangeInputs.forEach((range) => range.addEventListener("input", inputSetters));

skipButtons.forEach((skipBtn) => skipBtn.addEventListener("click", skipButton));

videoElement.addEventListener("timeupdate", updateProgressBar);

videoProgressBarContainer.addEventListener("mousedown", userMoveProgressBar);
videoProgressBarContainer.addEventListener(
    "mousemove",
    userMoveProgressBarWhileHoldingClick
);
videoElement.addEventListener(
    "mousemove",
    userMoveProgressBarWhileHoldingClick
);
window.addEventListener("mouseup", function () {
    isMouseDown = false;
});

/** Functions */
function playPauseVideo() {
    if (videoElement.paused) {
        playPauseButton.textContent = "❚ ❚";
        videoElement.play();
    } else {
        playPauseButton.textContent = "►";
        videoElement.pause();
    }
}

function inputSetters() {
    const propertyToChange = this.name;
    videoElement[propertyToChange] = this.value;
}

function skipButton() {
    const timeToSkip = parseInt(this.dataset.skip);
    videoElement.currentTime += timeToSkip;
}

function updateProgressBar() {
    videoProgressBar.style.width =
        (videoElement.currentTime * videoProgressBarContainer.offsetWidth) /
            videoElement.duration +
        "px";
}

function userMoveProgressBar(e) {
    isMouseDown = true;
    const progressBarClickedPosition = e.offsetX;

    const timeOfTheVideo =
        (progressBarClickedPosition * videoElement.duration) /
        videoProgressBarContainer.clientWidth;

    videoElement.currentTime = timeOfTheVideo;
}

function userMoveProgressBarWhileHoldingClick(e) {
    if (isMouseDown) {
        userMoveProgressBar(e);
    }
}
