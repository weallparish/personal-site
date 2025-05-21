import { rnd } from "./helpers/Math.js";

const splashTextFilePath = './uploads/splashes.txt';
var splashText = document.getElementById( "terminal-text" );

var splashes = [];

const minWait = 10000;
const maxWait = 20000;

const typingSpeed = 100;
const backspaceSpeed = 50;

/**
 * Types a string into a textbox with a set typingSpeed.
 * @param {textbox} textbox - Textbox to type string into.
 * @param {string} text - String to type into textbox.
 */
async function typeText( textbox, text)  {
    for ( let i = 0; i < text.length; i++ ) {
        textbox.textContent += text[ i ];
        await new Promise( r => setTimeout( r, typingSpeed + rnd( 0, typingSpeed * 0.2 ) ) );
    }
}

/**
 * Deletes text from a textbox until the textbox is empty or matches a given string.
 * @param {textbox} textbox - Textbox to delete characters from.
 * @param {string} text - String to stop deleting text at.
 */
async function deleteText( textbox, text ) {
    for ( let i = textbox.textContent.length - 1; i >= 0; i-- ) {
        if ( i >= text.length || textbox.textContent[ i ] != text[ i ] ) {
            // Set current text to all of the current characters except the last one.
            textbox.textContent = textbox.textContent.slice(0,i);
            await new Promise(r => setTimeout(r, backspaceSpeed + rnd( 0, typingSpeed * 0.2 ) ) );
        }
    }
}

/**
 * Reads splash text from a file and starts displaying the text.
 * @param {string} filePath - File path to read splash text from.
 */
function readSplashText( filePath ) {
    var xhr = new XMLHttpRequest();

    // Define function to call when the file has been read. Once the file has been read, we'll start displaying splash text.
    xhr.onreadystatechange = function() {
        if ( xhr.readyState == 4 && xhr.status == 200 ) {
            splashes = xhr.responseText.split( /\r\n|\n/ );
            displaySplashes( splashText );
        }
    }

    // Get file.
    xhr.open( 'GET', filePath );
    xhr.send();
}

/**
 * Displays splash texts in a textbox and occasionally refreshes the current splash.
 * @param {textbox} splashText - Textbox to write splashes into.
 */
async function displaySplashes( splashText ) {
    let splashIndex = rnd( 0, splashes.length - 1 );

    while ( true ) {
        let prevNum = splashIndex;
        splashIndex = rnd( 0, splashes.length - 1 );

        if ( prevNum != splashIndex ) {
            await deleteText( splashText, "Website Status: Currently " );
            await typeText( splashText, splashes[ splashIndex ] );
        }

        await new Promise( r => setTimeout( r, rnd( minWait, maxWait ) ) );
    }
}

readSplashText( splashTextFilePath );
