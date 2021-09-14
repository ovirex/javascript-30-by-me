/**
 * Boton play/pause (done)
 * input de volumen (done)
 * input de velocidad (done)
 * botones para adelantar y atrazar por segundas (done)
 * actualizar barra de reproducción a medida que avanza el video (done)
 * mover barra de reproducción/progreso (done)
 *
 */

let isMouseDown = false;

window.addEventListener("DOMContentLoaded", function () {
    const playPauseButton = document.querySelector(".video-pause-play");
    const videoElement = document.querySelector(".video-player video");

    const volumeInput = document.querySelector("#vol-setter");
    const speedInput = document.querySelector("#speed-setter");

    const skip10Backwards = document.querySelector(
        ".video-skip[data-skip='-10']"
    );
    const skip25Forward = document.querySelector(".video-skip[data-skip='25']");

    const videoProgressBar = document.querySelector(".video-progress-bar");
    const videoProgressBarContainer = document.querySelector(
        ".video-progress-container"
    );

    playPauseButton.addEventListener("click", playPauseVideo(videoElement));
    videoElement.addEventListener("click", playPauseVideo(videoElement));

    volumeInput.addEventListener("input", inputSetters(videoElement));
    speedInput.addEventListener("input", inputSetters(videoElement));

    skip10Backwards.addEventListener("click", skipButton(videoElement));
    skip25Forward.addEventListener("click", skipButton(videoElement));

    videoElement.addEventListener(
        "timeupdate",
        updateProgressBar(videoElement)
    );

    videoProgressBarContainer.addEventListener("mousedown", moveProgressBar);
    videoProgressBarContainer.addEventListener(
        "mousemove",
        moveProgressBarWhileHoldingClick
    );
    window.addEventListener("mouseup", function () {
        isMouseDown = false;
    });

    videoElement.addEventListener(
        "mousemove",
        moveProgressBarWhileHoldingClick
    );
});

function playPauseVideo(elementToPlay) {
    return function () {
        if (elementToPlay.paused) {
            elementToPlay.play();
        } else {
            elementToPlay.pause();
        }
    };
}

function inputSetters(video) {
    return function () {
        const inputElement = this;

        if (inputElement.id == "vol-setter") {
            video.volume = inputElement.value;
        } else if (inputElement.id == "speed-setter") {
            video.playbackRate = inputElement.value;
        }
    };
}

function skipButton(video) {
    return function () {
        const skipBtn = this;
        const timeToSkip = parseInt(skipBtn.dataset.skip);

        video.currentTime += timeToSkip;
        updateProgressBar(video);
    };
}

function updateProgressBar(video) {
    return function () {
        const videoProgressBar = document.querySelector(".video-progress-bar");
        const videoProgressBarContainer = document.querySelector(
            ".video-progress-container"
        );

        videoProgressBar.style.width =
            (video.currentTime * videoProgressBarContainer.offsetWidth) /
                video.duration +
            "px";
    };
}

function moveProgressBar(e) {
    isMouseDown = true;
    const videoElement = document.querySelector(".video-player video");
    const videoProgressBar = document.querySelector(".video-progress-bar");
    const progressBarContainerWidth = document.querySelector(
        ".video-progress-container"
    ).clientWidth;
    const progressBarPosition = e.offsetX;

    const timeOfTheVideo =
        (progressBarPosition * videoElement.duration) /
        progressBarContainerWidth;

    videoElement.currentTime = timeOfTheVideo;
    videoProgressBar.style.width = progressBarPosition + "px";
}

function moveProgressBarWhileHoldingClick(e) {
    if (isMouseDown) {
        moveProgressBar(e);
    }
}
