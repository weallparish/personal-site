import {bubbleManager} from "./helpers/Bubble.js"

var canvas = document.querySelector( 'canvas' );
canvas.addEventListener("click", handleClick);

var pointDisplay = document.getElementById("point-display");
pointDisplay.addEventListener("click", () => {
    window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth"
    })
})

var hiddenClickerElements = document.querySelectorAll(".clicker-hidden");
hiddenClickerElements.forEach(e => {
    e.style.display = "none";
})

var bubblesPopped = Number(localStorage.getItem("bubblesPopped") || 0);
if (bubblesPopped > 0) {
    updateCounter();
    showHiddenElements();
}

function handleClick(event) {
    const x = event.clientX;
    const y = event.clientY;
    bubbleManager.bubbles.forEach(b => {
        if (b.wasClicked(x, y)) {
            b.radius = 0;
            
            updateCounter(1);
            showHiddenElements();
        }
    })
}

function updateCounter(amt = 0) {
    bubblesPopped = Number(localStorage.getItem("bubblesPopped") || 0)
    bubblesPopped += amt;
    localStorage.setItem("bubblesPopped", bubblesPopped);

    pointDisplay.textContent = bubblesPopped > 1 ? bubblesPopped + " Bubbles Popped" : bubblesPopped + " Bubble Popped";
}

function showHiddenElements() {
    hiddenClickerElements.forEach(e => {
    e.style.display = "";
})
}