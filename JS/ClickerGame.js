import {bubbleManager} from "./helpers/Bubble.js"
import { canvasWidth, canvasHeight } from "./helpers/RenderBubbles.js";
import { ClickerShop } from "./helpers/ClickerShop.js";

function handleClick(event) {
    const x = event.clientX;
    const y = event.clientY;
    bubbleManager.clickBubbles(x, y, b => {
        b.type = "popping";
        bubbleManager.bubbleCounts["normal"]--;
        updateBubblesPopped(bubblesPerClick)
    });
    bubbleManager.clickBubbles(x, y, b => {
        b.type = "popping";
        bubbleManager.bubbleCounts["anti"]--;
        updateBubblesPopped(bubblesPerClick)
    }, "anti");
}

export function updateBubblesPopped(amt = 0) {
    bubblesPopped = Number(localStorage.getItem("bubblesPopped") || 0)
    bubblesPopped += amt;
    localStorage.setItem("bubblesPopped", bubblesPopped);

    if (bubblesPopped > 0) {
        showHiddenElements();
    }

    pointDisplay.textContent = bubblesPopped != 1 ? formatBigNumber(bubblesPopped) + " Bubbles Popped" : bubblesPopped + " Bubble Popped";
}

function formatBigNumber(num) {
    if (num > 999_999_999) {
        return (num/1_000_000_000).toFixed(2) + "B";
    }
    else if (num > 999_999) {
        return (num/1_000_000).toFixed(2) + "M";
    }
    else if (num > 999) {
        return (num/1_000).toFixed(2) + "K";
    }
    else {
        return num;
    }
}

function showHiddenElements() {
    hiddenClickerElements.forEach(e => {
    e.style.display = "";
})
}

function shopPurchase(shopText, shopItem) {

    if (bubblesPopped >= shopItem.getCost()) {
        updateBubblesPopped(-1 * shopItem.getCost());
        shopItem.setCost(shopItem.getCost() * 1.15);
        shopText.textContent = shopItem.shopName + " - " + formatBigNumber(shopItem.getCost()) + " Bubbles";

        switch(shopItem.shopType) {
            case "bubbleGenerator":
                addBubbleGenerator();
                break;
            case "bubbleDestroyer":
                addBubbleDestroyer();
                break;
            case "bubblesPerClick":
                addBubblePerClick();
                break;
        }
    }
    statElements.forEach(e => {
        updateStat(e);
    })
}

function updateStat(statText) {
    const statName = statText.getAttribute("data-name");
    const statDescription = statText.getAttribute("data-name-readable");
    statText.textContent = statDescription + ": " + (localStorage.getItem(statName) || 0);
}

function addBubbleGenerator() {
    bubbleGenerators++;
    localStorage.setItem("bubbleGenerators", bubbleGenerators);
}

function addBubbleDestroyer() {
    bubbleDestroyers++;
    localStorage.setItem("bubbleDestroyers", bubbleDestroyers);
}

function addBubblePerClick() {
    bubblesPerClick++;
    localStorage.setItem("bubblesPerClick", bubblesPerClick);
    bubbleManager.bubblesOnPop++;
}

async function gameLoop() {
    while(true) {
        date = new Date();
        let currTime = date.getTime();

        // Logic that should only occur every 10 seconds.
        if (currTime - time > 10000) {
            for (let i = 0; i < bubbleGenerators; i++) {
                bubbleManager.add({
                    y: canvasHeight + 100,
                    width: canvasWidth, 
                    height: canvasHeight});
            }
            
            for (let i = 0; i < bubbleDestroyers; i++) {
                bubbleManager.add({
                    y: -100,
                    width: canvasWidth, 
                    height: canvasHeight, 
                    color: window.getComputedStyle( document.body ).getPropertyValue( "--primary-light" ), 
                    type: "anti"});
            }

            time = currTime;
        }


        // Logic that should occur every tick.
        bubbleManager.simulateBubbles(a => {
            bubbleManager.clickBubbles(a.x, a.y, b => {
            a.type = "popping"; 
            b.type = "popping"; 
            bubbleManager.bubbleCounts["normal"]--;
            bubbleManager.bubbleCounts["anti"]--;
            updateBubblesPopped(bubblesPerClick * 2)});
        }, "anti");
        
        
        await new Promise (r => setTimeout(r, 10));
        
    }
}

// Set up game logic
var date = new Date();
var time = date.getTime();
var bubblesPopped = Number(localStorage.getItem("bubblesPopped") || 0);
var bubbleGenerators = Number(localStorage.getItem("bubbleGenerators") || 0);
var bubbleDestroyers = Number(localStorage.getItem("bubbleDestroyers") || 0);
var bubblesPerClick = Number(localStorage.getItem("bubblesPerClick") || 1);
bubbleManager.bubblesOnPop = Number(localStorage.getItem("bubblesPerClick") - 1|| 0);

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
    e.textContent = shop.shopName + " - " + formatBigNumber(shop.getCost()) + " Bubbles";
    e.addEventListener("click", () => 
        {shopPurchase(e, shop);});
});

var statElements = document.querySelectorAll(".stat-element");
statElements.forEach(e => {
    updateStat(e);
})

var resetDataButton = document.getElementById("clicker-bottom");
resetDataButton.addEventListener("click", () => {
    localStorage.removeItem("bubblesPopped");
    localStorage.removeItem("bubbleCount");
    localStorage.removeItem("bubbleGenerators");
    localStorage.removeItem("bubbleDestroyers");
    localStorage.removeItem("bubblesPerClick");

    shopElements.forEach(e => {
        localStorage.removeItem(e.getAttribute("data-name") + "Cost");
    });

    location.reload();
});

if (bubblesPopped > 0) {
    updateBubblesPopped();
    showHiddenElements();
}

gameLoop();