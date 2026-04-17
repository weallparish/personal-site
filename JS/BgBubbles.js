import { createBubbles, render } from "./helpers/RenderBubbles.js";

async function renderLoop() {
    while (true) {
        render();
        await new Promise( r => setTimeout( r, 10 ) );
    }
}

createBubbles();
renderLoop();