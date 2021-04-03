window.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown", playBeat);

    const audioElements = Array.from(document.getElementsByTagName("audio"));

    audioElements.forEach((ele) => {
        const keyBox = document.querySelector(
            `li[data-key=${ele.dataset.key}]`
        );

        ele.addEventListener("play", function () {
            keyBox.className = "playing";
        });
        ele.addEventListener("ended", function () {
            keyBox.className = "key";
        });
    });
    
    function playBeat(e) {
        const abc = "abcdefghijklmnopqrstuvwxyz";
        const keyValue = e.key.toLowerCase();
        if (abc.indexOf(keyValue) == -1) {
            return;
        }

        const key = document.querySelector(`li[data-key=${keyValue}]`);
        if (!key) {
            return;
        }

        const audioToPlay = document.querySelector(
            `audio[data-key=${keyValue}]`
        );
        audioToPlay.currentTime = 0;
        audioToPlay.play();
    }
});
