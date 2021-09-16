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
const videoPlayer = document.querySelector(".video-player");
const fullScreenBtn = document.querySelector(".fullscreen-btn");
/**Add events listeners */

playPauseButton.addEventListener("click", playPauseVideo);
videoElement.addEventListener("click", playPauseVideo);
window.addEventListener("keydown", function (e) {
    if (e.key === " ") {
        playPauseVideo();
    }
});

videoElement.addEventListener("play", changePlayPauseBtn);
videoElement.addEventListener("pause", changePlayPauseBtn);

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

fullScreenBtn.addEventListener("click", goFullScreen);
window.addEventListener("keydown", function (e) {
    if (e.key.toLowerCase() === "f") {
        goFullScreen();
    }
});
document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
        videoElement.classList.add("fullscreen-video");
    } else {
        videoElement.classList.remove("fullscreen-video");
    }
});

/** Functions */
function playPauseVideo() {
    if (videoElement.paused) {
        videoElement.play();
    } else {
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

function changePlayPauseBtn() {
    if (videoElement.paused) {
        playPauseButton.textContent = "►";
    } else {
        playPauseButton.textContent = "❚ ❚";
    }
}

function goFullScreen() {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen();
        videoElement.classList.add("fullscreen-video");
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        videoElement.classList.remove("fullscreen-video");
    }
}
