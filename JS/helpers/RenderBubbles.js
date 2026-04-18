import { Bubble, bubbleManager } from "./Bubble.js";
import { rnd } from "./Math.js";

var canvas = document.querySelector( 'canvas' );
export var canvasWidth = canvas.width = window.innerWidth;
export var canvasHeight = canvas.height = window.innerHeight;
var ctx = canvas.getContext( '2d' );

var bg = window.getComputedStyle( document.body ).getPropertyValue( "--dark" );

const circleDensity = 0.05;


var windowResized = false;
var globalResizeTimer = null;

function calculateWindowSize() {
    canvasWidth = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
}

/**
 * Draws a circle with the given parameters.
 * @param {float} x - x position of center of circle.
 * @param {float} y  - y position of center of circle.
 * @param {float} radius - radius of circle.
 * @param {Color} color - color to fill circle.
 * @param {float} alpha - percent opacity.
 */
function drawCircle( ctx, circle ) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.globalAlpha = circle.alpha;
    ctx.fillStyle = circle.color;
    ctx.fill();
}

export function createBubbles() {
    var circleAmount = Number(localStorage.getItem("bubbleCount") || circleDensity * canvasWidth);
    bubbleManager.clear();

    // Randomly generate all circle parameters.
    for ( let i = 0; i < circleAmount; i++ ) {
        bubbleManager.add(canvasWidth, canvasHeight);
    }
}

/**
 * Renders random circles on the screen and floats them upwards.
 */
export function render() {
    // Delete all popped bubbles from manager
    bubbleManager.prune(b => {return b.alpha < 0.05});
    if (bubbleManager.count() > 0) {
        localStorage.setItem("bubbleCount", bubbleManager.count());
    }
    

    // Fill the background with the website's dark color.
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = bg;
    ctx.fillRect( 0, 0, canvasWidth, canvasHeight );
    ctx.lineWidth = 0;

    bubbleManager.simulateBubbles(b => {
        if (b.y < -100) {
            if ( rnd( 0, 10 * bubbleManager.secondaryChance - 1 ) == 0 ) {
                b.color = bubbleManager.secondary;
            }
            b.y = canvasHeight + 100;
        }
        b.y -= b.speed;

        if (b.radius < b.maxRadius) {
            b.radius += 3;
        }
    });

    bubbleManager.simulateBubbles(a => {
        if (a.y > canvasHeight + 100) {
            a.y = -100;
        }
        a.y += a.speed;

        if (a.radius < a.maxRadius) {
            a.radius += 2;
        }
    }, "anti");


    bubbleManager.simulateBubbles(b => {
        if (b.y < -100) {
            b.y = canvasHeight + 100;
        }
        b.y -= b.speed;

        if (b.alpha > 0) {
            b.radius += 2;
            b.alpha -= 0.1 * b.alpha;
            bubbleManager.add(canvasWidth, canvasHeight, b.color, "particle", b.x, b.y, rnd(0, 360));
        }
            
    }, "popping");

    bubbleManager.simulateBubbles(b => {
        b.y -= Math.sin(b.angle)*b.speed*5 + b.speed*5;
        b.x -= Math.cos(b.angle)*b.speed*5;

        if (b.alpha > 0) {
            b.alpha -= 0.1 * b.alpha;
            b.radius += 0.1;
        }
            
    }, "particle");

    bubbleManager.renderBubbles(ctx, drawCircle);

    if (windowResized) {
        windowResized = false;
        return;
    }
};

window.addEventListener('resize', async function(event) {
    if(globalResizeTimer != null) window.clearTimeout(globalResizeTimer);
    globalResizeTimer = window.setTimeout(function() {
        calculateWindowSize();
        windowResized = true;
        render();
    }, 200);
}, true);

document.body.appendChild( canvas );
render();