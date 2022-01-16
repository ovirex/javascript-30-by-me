const listener = document.querySelector(".hero");
const h1 = listener.querySelector("h1");
const walk = 500;

listener.addEventListener("mousemove", function (e) {
    const { offsetWidth: width, offsetHeight: height } = listener;
    let x = e.offsetX;
    let y = e.offsetY;

    if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    const xWalk = Math.round((x / width) * walk - walk / 2);
    const yWalk = Math.round((y / height) * walk - walk / 2);

    console.log(x, xWalk);
    h1.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(255, 0, 0, .8),
        ${xWalk * -1}px ${yWalk * -1}px 0 rgba(4, 0, 255, .8),
        ${yWalk}px ${xWalk * -1}px 0 rgba(251, 0, 255, .8),
        ${yWalk * -1}px ${xWalk}px 0 rgba(0, 255, 8, .8)
        `;
});
