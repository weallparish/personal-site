import {bubbleManager} from "./helpers/Bubble.js"
import { canvasWidth, canvasHeight } from "./helpers/RenderBubbles.js";
import { ClickerShop } from "./helpers/ClickerShop.js";

function handleClick(event) {
    const x = event.clientX;
    const y = event.clientY;
    bubbleManager.clickBubbles(x, y, b => {b.radius = 0; updateCounter(1)});
}

function updateCounter(amt = 0) {
    bubblesPopped = Number(localStorage.getItem("bubblesPopped") || 0)
    bubblesPopped += amt;
    localStorage.setItem("bubblesPopped", bubblesPopped);

    pointDisplay.textContent = bubblesPopped > 1 ? bubblesPopped + " Bubbles Popped" : bubblesPopped + " Bubble Popped";

    if (bubblesPopped > 0) {
        showHiddenElements();
    }
}

function showHiddenElements() {
    hiddenClickerElements.forEach(e => {
    e.style.display = "";
})
}

function shopPurchase(shopText, shopItem) {

    if (bubblesPopped >= shopItem.getCost()) {
        updateCounter(-1 * shopItem.getCost());
        shopItem.setCost(shopItem.getCost() * 2);
        addBubbleGenerator(shopText, shopItem);
    }
}

function addBubbleGenerator(shopText, shopItem) {
    shopText.textContent = "Bubble Generator - " + shopItem.getCost() + " Bubbles";
    bubbleGenerators++;
    localStorage.setItem("bubbleGenerators", bubbleGenerators);
}

async function gameLoop() {
    while(true) {
        await new Promise( r => setTimeout( r, 10000) );

        for (let i = 0; i < bubbleGenerators; i++) {
            bubbleManager.add(canvasWidth, canvasHeight);
            await new Promise( r => setTimeout(r, 100));
        }
        
        
    }
}

// Set up game logic
var bubblesPopped = Number(localStorage.getItem("bubblesPopped") || 0);
var bubbleGenerators = Number(localStorage.getItem("bubbleGenerators") || 0);

var canvas = document.querySelector( 'canvas' );
canvas.addEventListener("click", handleClick);

var pointDisplay = document.getElementById("point-display");
pointDisplay.addEventListener("click", () => {
    window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth"
    })
});

var hiddenClickerElements = document.querySelectorAll(".clicker-hidden");
hiddenClickerElements.forEach(e => {
    e.style.display = "none";
});

var shopElements = document.querySelectorAll(".shop-element");
var shopItems = [];
shopElements.forEach(e => {
    const shop = new ClickerShop(e);
    shopItems.push(shop);
    e.textContent = "Bubble Generator - " + shop.getCost() + " Bubbles";
    e.addEventListener("click", () => 
        {shopPurchase(e, shop);});
});

var resetDataButton = document.getElementById("clicker-bottom");
resetDataButton.addEventListener("click", () => {
    localStorage.removeItem("bubblesPopped");
    localStorage.removeItem("bubbleCount");
    localStorage.removeItem("bubbleGenerators");

    shopElements.forEach(e => {
        localStorage.removeItem(e.getAttribute("data-name") + "Cost");
    });

    location.reload();
});

if (bubblesPopped > 0) {
    updateCounter();
    showHiddenElements();
}

gameLoop();