import { rnd } from "./helpers/Math.js";

var canvas = document.querySelector( 'canvas' );
var canvasWidth = canvas.width = window.innerWidth;
var canvasHeight = canvas.height = window.innerHeight;
var ctx = canvas.getContext( '2d' );

var bg = window.getComputedStyle( document.body ).getPropertyValue( "--dark" );
var primary = window.getComputedStyle( document.body ).getPropertyValue( "--primary-main" );
var secondary = window.getComputedStyle( document.body ).getPropertyValue( "--secondary-main" );

const circleDensity = 0.05;

const minRadius = 1;
const maxRadius = 100;

const minOpacity = 5;
const maxOpacity = 50;

const minSpeed = 5;
const maxSpeed = 50;

const secondaryChance = 20;

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
function drawCircle( x, y, radius, color, alpha ) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fill();
}

/**
 * Renders random circles on the screen and floats them upwards.
 */
async function render() {
    let circleInfo = [];
    var circleAmount = circleDensity * canvasWidth;

    // Randomly generate all circle parameters.
    for ( let i = 0; i < circleAmount; i++ ) {
        circleInfo[i] = [ rnd( 0, canvasWidth ), rnd( 0, canvasHeight ), rnd( minRadius, maxRadius ), primary, rnd( minOpacity, maxOpacity ) * 0.01, rnd( minSpeed, maxSpeed ) * 0.01 ];
        
        // Set 1 in secondaryChance of the circles to the website's accent color.
        if ( rnd( 0, secondaryChance - 1 ) == 0 ) {
            circleInfo[ i ][ 3 ] = secondary;
        }
    }

    while ( true ) {
        // Fill the background with the website's dark color.
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = bg;
        ctx.fillRect( 0, 0, canvasWidth, canvasHeight );
        ctx.lineWidth = 0;

        // Render each circle.
        for ( let i = 0; i < circleAmount; i++ ) {
            // Move circle back to bottom of the screen if it has floated out of view.
            if ( circleInfo[ i ][ 1 ] < -100 ) {
                // circles have a very small chance to change to the secondary color when floating past the top.
                if ( rnd( 0, 10 * secondaryChance - 1 ) == 0 ) {
                    circleInfo[ i ][ 3 ] = secondary;
                }

                circleInfo[ i ][ 1 ] = canvasHeight + 100;
            }

            // Float the circle upwards.
            circleInfo[ i ][ 1 ] -= circleInfo[ i ][ 5 ];
            
            drawCircle( circleInfo[ i ][ 0 ], circleInfo[ i ] [ 1 ], circleInfo[ i ][ 2 ], circleInfo[ i ][ 3 ], circleInfo[ i ][ 4 ] );
        }

        await new Promise( r => setTimeout( r, 10 ) );

        if (windowResized) {
            windowResized = false;
            return;
        }
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