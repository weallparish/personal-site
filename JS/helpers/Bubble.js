import { rnd } from "./Math.js";

export class Bubble {
    constructor(x = 0, y = 0, radius = 1, color = "blue", alpha = 0.1, speed = 0.1) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.alpha = alpha;
        this.speed = speed;
    }
    wasClicked(clickX, clickY) {
        let dx = clickX - this.x;
        let dy = clickY - this.y;
        let d = Math.sqrt(dx**2 + dy**2);
        return d <= this.radius;
    }
    renderBubble(ctx, renderer) {
        renderer(ctx, this);
    }
    simulateBubble(simulator) {
        simulator(this);
    }
}

class BubbleManager {
    constructor() {
        this.bubbles = [];
        this.minRadius = 1;
        this.maxRadius = 100;

        this.minOpacity = 5;
        this.maxOpacity = 50;

        this.minSpeed = 5;
        this.maxSpeed = 50;

        this.secondaryChance = 20;

        this.primary = window.getComputedStyle( document.body ).getPropertyValue( "--primary-main" );
        this.secondary = window.getComputedStyle( document.body ).getPropertyValue( "--secondary-main" );

    }
    clear() {
        this.bubbles = [];
    }
    add(width, height) {
        let b = new Bubble(rnd(0, width), rnd(0, height), rnd(this.minRadius, this.maxRadius), this.primary, rnd(this.minOpacity,this.maxOpacity) * 0.01, rnd(this.minSpeed,this.maxSpeed) * 0.01)
        this.bubbles.push(b)

        if (rnd(0, this.secondaryChance) == 0) {
            b.color = this.secondary;
        }
    }
    at(i) {
        return this.bubbles[i];
    }
    count() {
        return this.bubbles.length;
    }
    prune(condition) {
        let toDelete = [];
        this.bubbles.forEach(b => {
            if (condition(b)) toDelete.push(b);
        })
        toDelete.forEach(b => {
            this.bubbles.splice(this.bubbles.indexOf(b), 1);
        })
    }
    clickBubbles(clickX, clickY, clickEffect) {
        this.bubbles.forEach(b => {
            if (b.wasClicked(clickX, clickY)) {
                clickEffect(b);
            }
        })
    }
    renderBubbles(ctx, renderer) {
        this.bubbles.forEach(b => {
            b.renderBubble(ctx, renderer);
        })
    }
    simulateBubbles(simulator) {
        this.bubbles.forEach(b => {
            b.simulateBubble(simulator);
        })
    }
}

export const bubbleManager = new BubbleManager();